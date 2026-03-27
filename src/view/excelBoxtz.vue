<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
// 1. 状态与配置
const gridBoardRef = ref(null); // 引用网格DOM元素
// 基础布局配置
const config = ref({
  rows: 8, // 行数
  cols: 10, // 列数 (J)
  cellWidth: 60, // 单元格宽
  cellHeight: 60, // 单元格高
  gap: 4, // 所有的间距 (行列间距)
});
// 用户输入
const inputText = ref('');
// 存储用户生成的“框”
const zones = ref([]);
// 拖拽状态
const drag = ref({
  isDragging: false,
  startCol: 0, // 拖拽起始列索引 (1-based)
  startRow: 0, // 拖拽起始行索引 (1-based)
  endCol: 0, // 拖拽结束列索引
  endRow: 0,
});
// 2. 核心逻辑：坐标转换
// 字母转数字: A->1, B->2, ..., Z->26, AA->27, AB->28, ...
// 支持多字母列名，如 AA, AB, BA 等
const charToNum = char => {
  if (!char) return 0;
  const upperChar = char.toUpperCase();
  let result = 0;
  for (let i = 0; i < upperChar.length; i++) {
    result = result * 26 + (upperChar.charCodeAt(i) - 64);
  }
  return result;
};
// 数字转字母: 1->A, 2->B, ..., 26->Z, 27->AA, 28->AB, ...
// 类似 Excel 的列名生成：A-Z, AA-AZ, BA-BZ, ...
const numToColLabel = num => {
  let result = '';
  let n = num;
  while (n > 0) {
    n--; // 因为 A=1, 不是 A=0，所以先减1
    result = String.fromCharCode(65 + (n % 26)) + result;
    n = Math.floor(n / 26);
  }
  return result;
};
// 生成字母表头: 0->A, 1->B, ..., 25->Z, 26->AA, 27->AB, ...
const getColLabel = index => numToColLabel(index + 1);
// 删除区域
const removeZone = id => {
  zones.value = zones.value.filter(z => z.id !== id);
};
// 3. 拖拽事件处理
/**
 * 将鼠标屏幕坐标 (clientX, clientY) 转换为 (列索引, 行索引)
 * @param {number} x - 鼠标X坐标（相对于视口）
 * @param {number} y - 鼠标Y坐标（相对于视口）
 * @returns {{col: number, row: number}} - 基于1的列和行索引
 */
const getCellIndexFromMouse = (x, y) => {
  const boardEl = gridBoardRef.value;
  if (!boardEl) return { col: 0, row: 0 };
  // 获取网格区域在屏幕上的位置（相对于视口）
  const rect = boardEl.getBoundingClientRect();
  // 鼠标相对于网格可见区域左上角的偏移量
  let offsetX = x - rect.left;
  let offsetY = y - rect.top;
  // 加上滚动偏移量，得到相对于整个内容区域左上角的坐标
  // 这是关键：当容器有滚动条时，需要加上 scrollLeft 和 scrollTop
  offsetX += boardEl.scrollLeft;
  offsetY += boardEl.scrollTop;
  // 减去表头和侧边栏的偏移量
  // 第一列是侧边栏(30px) + gap，第一行是表头(30px) + gap
  const headerWidth = 30 + config.value.gap; // 侧边栏宽度 + gap
  const headerHeight = 30 + config.value.gap; // 表头高度 + gap
  // 如果点击在表头或侧边栏区域，返回无效索引
  if (offsetX < headerWidth || offsetY < headerHeight) {
    return { col: 0, row: 0 };
  }
  // 减去表头和侧边栏的偏移，得到相对于数据区域的坐标
  offsetX -= headerWidth;
  offsetY -= headerHeight;
  // 计算列和行索引 (1-based)
  let colIndex = 0;
  let rowIndex = 0;
  //1. 计算列索引
  for (let c = 1; c <= config.value.cols; c++) {
    // 单元格的累积宽度 (c个单元格宽度 + c-1个间距)
    const cumulativeWidth = c * config.value.cellWidth + (c - 1) * config.value.gap;
    // 如果偏移量小于这个宽度，则落在当前单元格 c 上
    if (offsetX < cumulativeWidth) {
      // 检查是否落在单元格还是间隙上 (可选优化：忽略间隙点击)
      const lastCellEnd = (c - 1) * config.value.cellWidth + (c - 2) * config.value.gap;
      if (c > 1 && offsetX < lastCellEnd + config.value.gap) {
        // 落在间隙上，可能四舍五入到相邻的单元格
      }
      colIndex = c;
      break;
    }
  }
  // 2. 计算行索引
  for (let r = 1; r <= config.value.rows; r++) {
    const cumulativeHeight = r * config.value.cellHeight + (r - 1) * config.value.gap;
    if (offsetY < cumulativeHeight) {
      rowIndex = r;
      break;
    }
  }
  // 确保索引在有效范围内 [1, N]
  return {
    col: Math.max(1, Math.min(colIndex, config.value.cols)),
    row: Math.max(1, Math.min(rowIndex, config.value.rows)),
  };
};
// 鼠标按下：开始拖拽
const startDrag = event => {
  // 只响应左键
  if (event.button !== 0) return;
  // 忽略点击了已生成的框
  if (event.target.closest('.zone-box')) return;
  // 忽略点击了表头/侧边栏
  if (event.target.closest('.header-cell')) return;
  const { col, row } = getCellIndexFromMouse(event.clientX, event.clientY);
  if (col > 0 && row > 0) {
    drag.value.isDragging = true;
    drag.value.startCol = col;
    drag.value.startRow = row;
    // 结束点先设为起点
    drag.value.endCol = col;
    drag.value.endRow = row;
    // 阻止浏览器默认拖拽行为
    event.preventDefault();
  }
};
// 鼠标移动：正在拖拽
const handleDrag = event => {
  if (!drag.value.isDragging) return;
  const { col, row } = getCellIndexFromMouse(event.clientX, event.clientY);
  // 更新拖拽的结束点
  drag.value.endCol = col;
  drag.value.endRow = row;
};
// 鼠标抬起：结束拖拽，生成区域
const stopDrag = () => {
  if (!drag.value.isDragging) return;
  drag.value.isDragging = false;
  const { startCol, startRow, endCol, endRow } = drag.value;
  // 确保起点和终点有效
  if (startCol > 0 && startRow > 0) {
    // 计算最终的最小/最大坐标
    const c1 = Math.min(startCol, endCol);
    const r1 = Math.min(startRow, endRow);
    const c2 = Math.max(startCol, endCol);
    const r2 = Math.max(startRow, endRow);
    // 生成新区域（包括单个单元格）
    zones.value.push({
      id: Date.now(),
      c1,
      r1,
      c2,
      r2,
      text: inputText.value || `${numToColLabel(c1)}${r1}:${numToColLabel(c2)}${r2}`,
    });
    // 可选：清除输入文字
    inputText.value = '';
  }
  // 重置拖拽状态
  drag.value.startCol = 0;
  drag.value.startRow = 0;
};
// 4. 样式计算
// 整个网格容器的样式
const gridContainerStyle = computed(() => {
  const { cols, rows, cellWidth, cellHeight, gap } = config.value;
  // 定义列：第一列是侧边栏(30px)，后面是数据列
  const columns = `30px repeat(${cols}, ${cellWidth}px)`;
  // 定义行：第一行是表头(30px)，后面是数据行
  const gridRows = `30px repeat(${rows}, ${cellHeight}px)`;
  return {
    display: 'grid',
    gridTemplateColumns: columns,
    gridTemplateRows: gridRows,
    gap: `${gap}px`, // 动态间距
    overflow: 'auto',
    position: 'relative', // 确保子元素定位正确
  };
});
// 拖拽指示器的样式
const dragIndicatorStyle = computed(() => {
  if (!drag.value.isDragging || !drag.value.startCol) {
    return { display: 'none' };
  }
  const { startCol, startRow, endCol, endRow } = drag.value;
  // 计算最终的最小/最大坐标 (CSS Grid line number)
  const c1 = Math.min(startCol, endCol) + 1; // +1 跳过侧边栏
  const r1 = Math.min(startRow, endRow) + 1; // +1 跳过表头
  const c2 = Math.max(startCol, endCol) + 2; // +2 跳过侧边栏 + 包含当前列
  const r2 = Math.max(startRow, endRow) + 2; // +2 跳过表头 + 包含当前行
  return {
    display: 'block',
    // 映射到网格线
    gridColumnStart: c1,
    gridColumnEnd: c2,
    gridRowStart: r1,
    gridRowEnd: r2,
  };
});
const handleGetSelectedBox = () => {
  console.log(JSON.stringify(zones.value));
  //c1表示列开始 c2也表示列结束 r1表示开始行 r2也表示行结束 text表示中间的文字
};
//模拟获取数据来初始化渲染 a1 b1
onMounted(async () => {
  await nextTick();
  // const axiosData = {
  //   status: 1,
  //   msg: '操作成功',
  //   data: [
  //     { c1: 1, c2: 3, r1: 1, r2: 2, range: 'A1:C2', stall_no: 'S001' },
  //     { c1: 5, c2: 6, r1: 3, r2: 4, range: 'E3:F4', stall_no: 'S002' },
  //     { c1: 5, c2: 6, r1: 6, r2: 7, range: 'E6:F7', stall_no: 'S004' },
  //     { c1: 2, c2: 5, r1: 11, r2: 14, range: 'B11:E14', stall_no: 's003' },
  //     { c1: 5, c2: 6, r1: 16, r2: 20, range: 'E16:F20', stall_no: 'S221' },
  //     { c1: 5, c2: 5, r1: 21, r2: 25, range: 'E21:E25', stall_no: 'S222' },
  //     { c1: 6, c2: 6, r1: 21, r2: 23, range: 'F21:F23', stall_no: 'S223' },
  //     { c1: 6, c2: 6, r1: 24, r2: 25, range: 'F24:F25', stall_no: 'S224' },
  //   ],
  // };
  // axiosData.data.forEach(item => {
  //   zones.value.push({
  //     id: Date.now(),
  //     c1: item.c1,
  //     r1: item.r1,
  //     c2: item.c2,
  //     r2: item.r2,
  //     text: item.range,
  //     stall_no: item.stall_no,
  //   });
  // });

  // const axiosData = [
  //   { id: 1766453678734, c1: 1, r1: 1, c2: 1, r2: 1, text: 'A1:A1', stall_no: 'TCX001' },
  //   { id: 1766453679151, c1: 1, r1: 2, c2: 1, r2: 2, text: 'A2:A2' },
  //   { id: 1766453680092, c1: 3, r1: 1, c2: 4, r2: 1, text: 'C1:D1' },
  //   { id: 1766453680669, c1: 3, r1: 2, c2: 3, r2: 2, text: 'C2:C2' },
  //   { id: 1766453681051, c1: 4, r1: 2, c2: 4, r2: 2, text: 'D2:D2' },
  //   { id: 1766453681685, c1: 1, r1: 4, c2: 1, r2: 4, text: 'A4:A4' },
  //   { id: 1766453682060, c1: 1, r1: 5, c2: 1, r2: 5, text: 'A5:A5' },
  //   { id: 1766453682860, c1: 3, r1: 4, c2: 3, r2: 4, text: 'C4:C4' },
  //   { id: 1766453683392, c1: 4, r1: 4, c2: 4, r2: 4, text: 'D4:D4' },
  //   { id: 1766453684344, c1: 3, r1: 5, c2: 4, r2: 5, text: 'C5:D5' },
  //   { id: 1766453691788, c1: 2, r1: 1, c2: 2, r2: 5, text: '竖排道路' },
  //   { id: 1766453697118, c1: 1, r1: 3, c2: 10, r2: 3, text: '横排道路' },
  // ];
  // axiosData.forEach(item => {
  //   zones.value.push(item);
  // });
});
// 用户输入坐标的逻辑
const inputCmd = ref(''); // 默认值方便演示A1B2
// 解析坐标命令 (核心算法)
const parseCommand = () => {
  const cmd = inputCmd.value.trim();
  if (!cmd) return;
  // 正则：匹配 (字母)(数字) 后面可选跟 (字母)(数字)
  // 支持格式：A1 (单格) 或 A1B2 (区域)
  const regex = /^([a-z]+)(\d+)(?:([a-z]+)(\d+))?$/i;
  const match = cmd.match(regex);
  if (!match) {
    alert("格式错误！请使用 'A1' 或 'A1B2' 格式");
    return;
  }
  const [_, colChar1, row1Str, colChar2, row2Str] = match;
  // 起点坐标
  let c1 = charToNum(colChar1);
  let r1 = parseInt(row1Str);
  // 终点坐标 (如果只有A1，则终点等于起点)
  let c2 = colChar2 ? charToNum(colChar2) : c1;
  let r2 = row2Str ? parseInt(row2Str) : r1;
  // 确保坐标在网格范围内
  if (c1 > config.value.cols || c2 > config.value.cols || r1 > config.value.rows || r2 > config.value.rows) {
    alert('坐标超出当前表格范围');
    return;
  }
  // 计算最小和最大值（允许用户反着输，如 B2A1）
  const finalC1 = Math.min(c1, c2);
  const finalR1 = Math.min(r1, r2);
  const finalC2 = Math.max(c1, c2);
  const finalR2 = Math.max(r1, r2);
  // 添加到数组
  zones.value.push({
    id: Date.now(),
    c1: finalC1,
    r1: finalR1,
    c2: finalC2,
    r2: finalR2,
    text: inputText.value || '未命名',
  });
  // 清空输入
  inputCmd.value = '';
  inputText.value = '';
};
//点击块获取块详情
const toDetail = zone => {
  console.log(zone);
};
//测试高亮
const testHighlight = () => {
  zones.value[0].status = 5;
  zones.value[0].originalStatus = 1;
  // zones.value.forEach(zone => {
  //   zone.status = 5;
  //   zone.originalStatus = 1;
  // });
};
//根据文本判断是否高亮
const fnClassBlur = (status, originalStatus) => {
  switch (status) {
    case -1:
      return 'no-match';
    case 1:
      return 'z';
    //模糊 - 根据原始状态返回对应的模糊类
    case 5:
      switch (originalStatus) {
        case -1:
          return 'no-match-blur';
        case 1:
          return 'z-blur';
      }
    default:
      return 'z';
  }

  // return zone.text === '道路' ? 'z-blur' : '';
};

// 检测两个区域是否交叉
const isZonesIntersect = (zone1, zone2) => {
  // 检查列范围是否重叠
  const colOverlap = !(zone1.c2 < zone2.c1 || zone1.c1 > zone2.c2);
  // 检查行范围是否重叠
  const rowOverlap = !(zone1.r2 < zone2.r1 || zone1.r1 > zone2.r2);
  return colOverlap && rowOverlap;
};

// 获取道路区域的边框样式，避免交叉时重叠
// 策略：使用mask-image来隐藏交叉部分的虚线
const getRoadBorderStyle = zone => {
  if (zone.text !== '竖排道路' && zone.text !== '横排道路') {
    return {};
  }

  const isVertical = zone.text === '竖排道路';
  const isHorizontal = zone.text === '横排道路';

  // 查找所有与当前道路交叉的其他道路
  const intersectingRoads = zones.value.filter(otherZone => {
    if (otherZone.id === zone.id) return false;
    if (otherZone.text !== '竖排道路' && otherZone.text !== '横排道路') return false;
    return isZonesIntersect(zone, otherZone);
  });

  // 对于竖排道路：计算与横排道路交叉的行范围，生成mask
  if (isVertical) {
    const horizontalCrosses = intersectingRoads.filter(r => r.text === '横排道路');
    if (horizontalCrosses.length === 0) {
      // 没有交叉，正常显示左右边框
      return {};
    }
    // 计算所有交叉的行范围
    const crossRows = [];
    horizontalCrosses.forEach(hRoad => {
      const crossStart = Math.max(zone.r1, hRoad.r1);
      const crossEnd = Math.min(zone.r2, hRoad.r2);
      if (crossStart <= crossEnd) {
        crossRows.push({ start: crossStart, end: crossEnd });
      }
    });
    // 合并重叠的行范围
    const mergedRows = [];
    crossRows.sort((a, b) => a.start - b.start);
    crossRows.forEach(range => {
      if (mergedRows.length === 0) {
        mergedRows.push(range);
      } else {
        const last = mergedRows[mergedRows.length - 1];
        if (range.start <= last.end + 1) {
          last.end = Math.max(last.end, range.end);
        } else {
          mergedRows.push(range);
        }
      }
    });
    // 转换为相对于zone的行位置（百分比）
    const totalRows = zone.r2 - zone.r1 + 1;
    // 生成mask-image的linear-gradient来隐藏交叉的行
    // mask中：black表示显示，transparent表示隐藏
    const maskStops = [];
    let currentPos = 0;
    mergedRows.forEach((r, idx) => {
      const startPercent = ((r.start - zone.r1) / totalRows) * 100;
      const endPercent = ((r.end - zone.r1 + 1) / totalRows) * 100;
      // 添加交叉区域之前的可见区域（显示）
      if (startPercent > currentPos) {
        maskStops.push(`black ${currentPos}%`, `black ${startPercent}%`);
      }
      // 添加交叉区域的隐藏区域（隐藏）
      maskStops.push(`transparent ${startPercent}%`, `transparent ${endPercent}%`);
      currentPos = endPercent;
    });
    // 添加最后一个交叉区域之后的可见区域（显示）
    if (currentPos < 100) {
      maskStops.push(`black ${currentPos}%`, `black 100%`);
    }
    const maskValue = maskStops.length > 0 ? `linear-gradient(to bottom, ${maskStops.join(', ')})` : 'none';
    return {
      '--vertical-mask': maskValue,
    };
  }

  // 对于横排道路：计算与竖排道路交叉的列范围，生成mask
  if (isHorizontal) {
    const verticalCrosses = intersectingRoads.filter(r => r.text === '竖排道路');
    if (verticalCrosses.length === 0) {
      // 没有交叉，正常显示上下边框
      return {};
    }
    // 计算所有交叉的列范围
    const crossCols = [];
    verticalCrosses.forEach(vRoad => {
      const crossStart = Math.max(zone.c1, vRoad.c1);
      const crossEnd = Math.min(zone.c2, vRoad.c2);
      if (crossStart <= crossEnd) {
        crossCols.push({ start: crossStart, end: crossEnd });
      }
    });
    // 合并重叠的列范围
    const mergedCols = [];
    crossCols.sort((a, b) => a.start - b.start);
    crossCols.forEach(range => {
      if (mergedCols.length === 0) {
        mergedCols.push(range);
      } else {
        const last = mergedCols[mergedCols.length - 1];
        if (range.start <= last.end + 1) {
          last.end = Math.max(last.end, range.end);
        } else {
          mergedCols.push(range);
        }
      }
    });
    // 转换为相对于zone的列位置（百分比）
    const totalCols = zone.c2 - zone.c1 + 1;
    // 生成mask-image的linear-gradient来隐藏交叉的列
    // mask中：black表示显示，transparent表示隐藏
    const maskStops = [];
    let currentPos = 0;
    mergedCols.forEach((c, idx) => {
      const startPercent = ((c.start - zone.c1) / totalCols) * 100;
      const endPercent = ((c.end - zone.c1 + 1) / totalCols) * 100;
      // 添加交叉区域之前的可见区域（显示）
      if (startPercent > currentPos) {
        maskStops.push(`black ${currentPos}%`, `black ${startPercent}%`);
      }
      // 添加交叉区域的隐藏区域（隐藏）
      maskStops.push(`transparent ${startPercent}%`, `transparent ${endPercent}%`);
      currentPos = endPercent;
    });
    // 添加最后一个交叉区域之后的可见区域（显示）
    if (currentPos < 100) {
      maskStops.push(`black ${currentPos}%`, `black 100%`);
    }
    const maskValue = maskStops.length > 0 ? `linear-gradient(to right, ${maskStops.join(', ')})` : 'none';
    return {
      '--horizontal-mask': maskValue,
    };
  }

  return {};
};
const zoneFixedList = ref([
  { label: '竖排道路', value: '竖排道路' },
  { label: '横排道路', value: '横排道路' },
  { label: '电梯厅', value: '电梯厅' },
  { label: '疏散出口', value: '疏散出口' },
  { label: '前室', value: '前室' },
  { label: '地块出入口', value: '地块出入口' },
  { label: '垃圾房', value: '垃圾房' },
  { label: '三轮车维修', value: '三轮车维修' },
]);
const zoneFlag = zone => {
  return !zoneFixedList.value.some(item => item.value === zone.text);
};
//输出为大写
const handleInputCmd = () => {
  inputCmd.value = inputCmd.value.toUpperCase();
};
</script>

<template>
  <div class="page-container">
    <div class="control-panel">
      <div class="input-group">
        <h3>拖拽区域文字</h3>
        <div class="row">
          <el-input v-model="inputText" placeholder="拖拽后自动填入的文字" />
          <el-select v-model="inputText" filterable placeholder="固定场景">
            <el-option v-for="item in zoneFixedList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <p class="tip">在网格内按下鼠标左键并拖拽即可创建区域。</p>
      </div>
      <div class="input-group settings">
        <h3>布局配置</h3>
        <div class="row">
          <label>行数: <el-input type="number" v-model.number="config.rows" :min="1" /></label>
          <label>列数: <el-input type="number" v-model.number="config.cols" :min="1" /></label>
          <label>格宽: <el-input type="number" v-model.number="config.cellWidth" :min="1" /></label>
          <label>格高: <el-input type="number" v-model.number="config.cellHeight" :min="1" /></label>
          <label>间距: <el-input type="number" v-model.number="config.gap" :min="0" /></label>
          <el-button type="primary" @click="handleGetSelectedBox">获取选择框的坐标</el-button>
        </div>
      </div>
    </div>
    <div class="row mb-2">
      <input @input="handleInputCmd" v-model="inputCmd" placeholder="坐标: A1B2" @keyup.enter="parseCommand" />
      <el-button class="primary-btn" @click="parseCommand">生成框选</el-button>
    </div>
    <div class="row mb-2">
      <el-button class="primary-btn" type="primary" @click="testHighlight">测试高亮</el-button>
    </div>
    <div class="excel-wrapper">
      <div ref="gridBoardRef" :style="gridContainerStyle" class="grid-board" @mousedown="startDrag" @mousemove="handleDrag" @mouseup="stopDrag" @mouseleave="stopDrag">
        <div class="header-cell corner"></div>
        <div v-for="c in config.cols" :key="'header-' + c" class="header-cell top-header" :style="{ gridRow: 1, gridColumn: c + 1 }">{{ getColLabel(c - 1) }}</div>
        <div v-for="r in config.rows" :key="'sidebar-' + r" class="header-cell side-header" :style="{ gridColumn: 1, gridRow: r + 1 }">
          {{ r }}
        </div>
        <template v-for="r in config.rows" :key="'bg-row-' + r">
          <div style="background: #8d8d8d" v-for="c in config.cols" :key="'bg-' + r + '-' + c" class="grid-cell-empty" :style="{ gridRow: r + 1, gridColumn: c + 1 }"></div>
        </template>
        <div class="drag-indicator" :style="dragIndicatorStyle"></div>
        <div
          :class="fnClassBlur(zone.status, zone.originalStatus)"
          v-for="zone in zones"
          :key="zone.id"
          class="zone-box"
          @click="toDetail(zone)"
          :style="{
            // 映射到网格线
            gridColumnStart: zone.c1 + 1,
            gridColumnEnd: zone.c2 + 2,
            gridRowStart: zone.r1 + 1,
            gridRowEnd: zone.r2 + 2,
          }"
        >
          <div class="zone-text" v-if="zoneFlag(zone)">
            <div>{{ zone.text }}</div>
            <div>{{ zone.stall_no }}</div>
            <div>测试1</div>
          </div>
          <div class="zone-text zone-theway" data-road-type="vertical" :style="getRoadBorderStyle(zone)" v-if="zone.text === '竖排道路'">
            <div class="theway-1 text-justify">
              <div>竖</div>
              <div>排</div>
              <div>道</div>
              <div>路</div>
            </div>
          </div>
          <div class="zone-text zone-theway" data-road-type="horizontal" :style="getRoadBorderStyle(zone)" v-if="zone.text === '横排道路'">
            <div class="theway-2 text-justify">横排道路</div>
          </div>
          <div class="zone-text zone-1" v-if="zone.text === '电梯厅'">
            <div class="text-justify">电梯厅</div>
          </div>
          <div class="zone-text zone-1" v-if="zone.text === '疏散出口'">
            <div class="text-justify">疏散出口</div>
          </div>
          <div class="zone-text zone-1" v-if="zone.text === '前室'">
            <div class="text-justify">前室</div>
          </div>
          <div class="zone-text zone-1" v-if="zone.text === '地块出入口'">
            <div class="text-justify">地块出入口</div>
          </div>
          <div class="zone-text zone-1" v-if="zone.text === '垃圾房'">
            <div class="text-justify">垃圾房</div>
          </div>
          <div class="zone-text zone-1" v-if="zone.text === '三轮车维修'">
            <div class="text-justify">三轮车维修</div>
          </div>
          <button class="delete-btn" @click.stop="removeZone(zone.id)">×</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* 页面整体 */
.page-container {
  font-family: 'Arial', sans-serif;
  padding: 20px;
  color: #333;
}

/* 控制面板样式 */
.control-panel {
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.input-group h3 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #666;
}

.row {
  display: flex;
  gap: 10px;
  align-items: center;
}

input {
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 150px;
}

.settings input {
  width: 50px;
}

.tip {
  font-size: 12px;
  color: #888;
  margin-top: 5px;
}

/* === 网格核心样式 === */
.grid-board {
  /* 确保指针样式为十字，提示用户可以拖拽 */
  cursor: crosshair;
  /* 限制最大尺寸，避免表格过大 */
  max-width: 100%;
  max-height: 100vh;
  border: 1px solid #fff;
  background: #fff; /* gap 的颜色 */
  user-select: none; /* 防止拖拽时选中文字 */
}
/* 表头通用样式 */
.header-cell {
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #555;
  font-size: 14px;
  border: 1px solid #ccc; /* 增加边框，更像 Excel */
  /* 确保表头和侧边栏不会被拖拽事件触发 */
  pointer-events: none;
}
.corner {
  background: #ccc;
  z-index: 20;
}
/* 空白格子背景 */
.grid-cell-empty {
  background: #fff;
  border: 1px solid #eee; /* 轻微边框 */
  /* 确保背景格子可以被拖拽事件穿透，让事件落在 .grid-board 上 */
  pointer-events: none;
  border-radius: 6px;
}

/* 拖拽指示器 - 实时跟随鼠标的蓝框 */
.drag-indicator {
  position: relative;
  background-color: rgba(24, 144, 255, 0.2); /* 半透明蓝色 */
  border: 2px dashed #1890ff; /* 虚线边框 */
  z-index: 5; /* 确保在背景格子之上，在 zone-box 之下 */
  pointer-events: none; /* 确保不影响鼠标事件 */
}

/* 用户生成的合并区域 */
.zone-box {
  background-color: #27ca87;
  border: 1px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
  border-radius: 6px;
  transition: all 0.2s;
  /* 允许点击区域时，不触发拖拽事件，而是让事件在 zone-box 上结束 */
  cursor: default;
}

.zone-text {
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  zoom: 0.9;
}

/* 删除按钮样式 (同上个版本) */
.delete-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ff4d4f;
  color: white;
  border: none;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1;
  z-index: 15; /* 确保在最顶层 */
}
.zone-box:hover .delete-btn {
  display: flex;
}
.text-justify {
  width: 100%;
  text-align: justify;
  text-align-last: justify;
}
.zone-1 {
  width: 100%;
  height: 100%;
  background: red !important;
  font-size: 18px;
  div {
    box-sizing: border-box;
    padding: 0 10%;
  }
}
.zone-theway {
  width: 100%;
  height: 100%;
  background: #fff;
  border: 1px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
  transition: all 0.2s;
  box-sizing: border-box;
  // 默认值
  --vertical-mask: none;
  --horizontal-mask: none;

  .theway-1 {
    width: 100%;
    height: 100%;
    color: red;
    font-size: 22px;
    box-sizing: border-box;
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .theway-2 {
    text-align: justify;
    text-align-last: justify;
    color: red;
    font-size: 22px;
    box-sizing: border-box;
    padding: 0 30px;
  }
}

// 竖排道路：使用伪元素绘制左右虚线边框
.zone-theway[data-road-type='vertical'] {
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 3px;
    background: repeating-linear-gradient(to bottom, #ccc 0, #ccc 8px, transparent 8px, transparent 16px);
    pointer-events: none;
    // 使用mask-image来隐藏交叉部分
    mask-image: var(--vertical-mask, none);
    -webkit-mask-image: var(--vertical-mask, none);
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
}

// 横排道路：使用伪元素绘制上下虚线边框
.zone-theway[data-road-type='horizontal'] {
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 3px;
    background: repeating-linear-gradient(to right, #ccc 0, #ccc 8px, transparent 8px, transparent 16px);
    pointer-events: none;
    // 使用mask-image来隐藏交叉部分
    mask-image: var(--horizontal-mask, none);
    -webkit-mask-image: var(--horizontal-mask, none);
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }
}
/* 模糊class */
.z-blur {
  background: #27ca87 !important;
  filter: blur(2px);
}
.z {
  background: #27ca87;
}
</style>
