<script setup>
import { ref, computed } from 'vue';

// ==============================
// 1. 状态与配置
// ==============================

// 基础布局配置
const config = ref({
  rows: 8, // 行数
  cols: 10, // 列数 (J)
  cellWidth: 60, // 单元格宽
  cellHeight: 60, // 单元格高 (需求要求正方形)
  gap: 10, // 所有的间距 (行列间距)
});

// 用户输入
const inputCmd = ref('A1B2'); // 默认值方便演示
const inputText = ref('合并区域');

// 存储用户生成的“框”
const zones = ref([
  // 示例数据
  // { id: 1, c1: 1, r1: 1, c2: 2, r2: 2, text: '示例' }
]);

// ==============================
// 2. 核心逻辑：坐标转换
// ==============================

// 生成字母表头: 0->A, 1->B ... 26->AA (这里简化演示支持到Z，即26列内)
const getColLabel = index => String.fromCharCode(65 + index);

// 字母转数字: A->1, B->2
const charToNum = char => char.toUpperCase().charCodeAt(0) - 64;

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

// 删除区域
const removeZone = id => {
  zones.value = zones.value.filter(z => z.id !== id);
};

// ==============================
// 3. 样式计算
// ==============================

// 整个网格容器的样式
const gridContainerStyle = computed(() => {
  // 定义列：第一列是侧边栏(30px)，后面是数据列
  const columns = `30px repeat(${config.value.cols}, ${config.value.cellWidth}px)`;
  // 定义行：第一行是表头(30px)，后面是数据行
  const rows = `30px repeat(${config.value.rows}, ${config.value.cellHeight}px)`;

  return {
    display: 'grid',
    gridTemplateColumns: columns,
    gridTemplateRows: rows,
    gap: `${config.value.gap}px`, // 动态间距
    overflow: 'auto', // 内容过多可滚动
    padding: '20px',
    backgroundColor: '#f5f5f5', // 容器背景
    maxWidth: '100%',
    maxHeight: '80vh',
  };
});
</script>

<template>
  <div class="page-container">
    <div class="control-panel">
      <div class="input-group">
        <h3>生成区域</h3>
        <div class="row">
          <input v-model="inputCmd" placeholder="坐标: A1B2" @keyup.enter="parseCommand" />
          <input v-model="inputText" placeholder="文字内容" @keyup.enter="parseCommand" />
          <button class="primary-btn" @click="parseCommand">生成框选</button>
        </div>
      </div>

      <div class="input-group settings">
        <h3>布局配置</h3>
        <div class="row">
          <label>行数: <input type="number" v-model="config.rows" /></label>
          <label>列数: <input type="number" v-model="config.cols" /></label>
          <label>格宽: <input type="number" v-model="config.cellWidth" /></label>
          <label>间距(Gap): <input type="number" v-model="config.gap" /></label>
        </div>
      </div>
    </div>

    <div class="excel-wrapper">
      <div :style="gridContainerStyle">
        <div class="header-cell corner"></div>

        <div v-for="c in config.cols" :key="'header-' + c" class="header-cell top-header" :style="{ gridRow: 1, gridColumn: c + 1 }">
          {{ getColLabel(c - 1) }}
        </div>

        <div v-for="r in config.rows" :key="'sidebar-' + r" class="header-cell side-header" :style="{ gridColumn: 1, gridRow: r + 1 }">
          {{ r }}
        </div>

        <template v-for="r in config.rows" :key="'bg-row-' + r">
          <div
            v-for="c in config.cols"
            :key="'bg-' + r + '-' + c"
            class="grid-cell-empty"
            :style="{
              gridRow: r + 1,
              gridColumn: c + 1,
            }"
          ></div>
        </template>

        <div
          v-for="zone in zones"
          :key="zone.id"
          class="zone-box"
          :style="{
            // CSS Grid 核心：start / end (end 需要 +1 才能包含那一行/列)
            gridColumnStart: zone.c1 + 1, // +1 是因为要跳过侧边栏
            gridColumnEnd: zone.c2 + 2, // +2 是因为既要跳过侧边栏，又要包含当前列
            gridRowStart: zone.r1 + 1, // +1 跳过表头
            gridRowEnd: zone.r2 + 2,
          }"
        >
          <span class="zone-text">{{ zone.text }}</span>
          <button class="delete-btn" @click="removeZone(zone.id)">×</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  width: 80px;
}

.settings input {
  width: 50px;
}

.primary-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 7px 15px;
  border-radius: 4px;
  cursor: pointer;
}
.primary-btn:hover {
  background: #0056b3;
}

/* === 网格核心样式 === */

/* 表头通用样式 */
.header-cell {
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #555;
  font-size: 14px;
  user-select: none;
}

.corner {
  background: #ccc;
  z-index: 20;
}

/* 顶部表头 sticky 效果 (可选，防止滚动消失) */
.top-header {
  /* position: sticky; 
    top: 0; */
  /* 如果开启 sticky，需要处理 z-index，这里简单起见不做 sticky 以保证 gap 效果直观 */
}

/* 空白格子背景 */
.grid-cell-empty {
  background: #fff;
  border: 1px solid #ddd;
  /* 这个 box-shadow 可选，可以制造类似 Excel 的网格线效果 
      但因为我们有 gap，直接用白色背景块就很像网格生成器了
    */
}

/* 用户生成的合并区域 */
.zone-box {
  background-color: rgba(24, 144, 255, 0.15); /* 浅蓝背景 */
  border: 2px solid #1890ff; /* 蓝色边框 */
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
  border-radius: 4px;
  transition: all 0.2s;
}

.zone-box:hover {
  background-color: rgba(24, 144, 255, 0.25);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.zone-text {
  font-size: 14px;
  font-weight: bold;
  color: #1890ff;
  pointer-events: none; /* 防止文字阻挡点击 */
}

/* 删除按钮 */
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
  display: none; /* 默认隐藏 */
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1;
}

.zone-box:hover .delete-btn {
  display: flex; /* 悬停显示 */
}
</style>
