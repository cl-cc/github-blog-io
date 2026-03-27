<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2025-02-11 14:04:02
 * @LastEditors: 程
 * @LastEditTime: 2025-04-22 13:33:41
-->
<template>
  <div class="app-container">
    <!-- 左侧拖拽布局 -->
    <GridLayout :layout="layout" :col-num="12" :row-height="100" :is-draggable="true" :is-resizable="true" :margin="[10, 10]" :use-css-transforms="true" @layout-updated="onLayoutUpdated" style="flex: 1; background: #f8f8f8">
      <GridItem v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" @click="selectItem(item.i)">
        <div :class="['chart-box', selectedId === item.i && 'active']">
          <ChartBox :options="item.options" />
        </div>
      </GridItem>
    </GridLayout>

    <!-- 右侧实时信息展示 -->
    <div class="info-panel">
      <h3>当前图表信息</h3>
      <div v-if="selectedItem">
        <p><strong>ID:</strong> {{ selectedItem.i }}</p>
        <p><strong>X:</strong> {{ selectedItem.x }}</p>
        <p><strong>Y:</strong> {{ selectedItem.y }}</p>
        <p><strong>W:</strong> {{ selectedItem.w }}</p>
        <p><strong>H:</strong> {{ selectedItem.h }}</p>
      </div>
      <div v-else>
        <p>请点击图表查看信息</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { GridLayout, GridItem } from 'vue3-grid-layout';
import ChartBox from './ChartBox.vue';

const layout = ref([
  {
    i: '1',
    x: 0,
    y: 0,
    w: 3,
    h: 3,
    options: {
      title: { text: '柱状图' },
      xAxis: { type: 'category', data: ['A', 'B', 'C'] },
      yAxis: { type: 'value' },
      series: [{ type: 'bar', data: [10, 20, 30] }],
    },
  },
  {
    i: '2',
    x: 6,
    y: 0,
    w: 3,
    h: 3,
    options: {
      title: { text: '折线图' },
      xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar'] },
      yAxis: { type: 'value' },
      series: [{ type: 'line', data: [50, 60, 80], smooth: true }],
    },
  },
]);

const selectedId = ref(null);

const selectedItem = computed(() => layout.value.find(item => item.i === selectedId.value));

const selectItem = id => {
  selectedId.value = id;
};

const onLayoutUpdated = newLayout => {
  newLayout.forEach(item => {
    const target = layout.value.find(i => i.i === item.i);
    if (target) {
      target.x = item.x;
      target.y = item.y;
      target.w = item.w;
      target.h = item.h;
    }
  });
};
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
}
.chart-box {
  height: 100%;
  width: 100%;
  border: 2px solid transparent;
}
.chart-box.active {
  border-color: #1890ff;
  box-shadow: 0 0 4px #1890ff;
}
.info-panel {
  width: 260px;
  padding: 20px;
  background-color: #fff;
  border-left: 1px solid #eee;
  font-size: 14px;
}
</style>
