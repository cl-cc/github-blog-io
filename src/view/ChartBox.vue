<template>
  <div ref="chartEl" style="width: 300px; height: 300px"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  options: Object,
});

const chartEl = ref(null);
let chartInstance = null;

const initChart = () => {
  chartInstance = echarts.init(chartEl.value);
  chartInstance.setOption(props.options);
};

onMounted(() => {
  initChart();
});

watch(
  () => props.options,
  newVal => {
    if (chartInstance) {
      chartInstance.setOption(newVal, true);
    }
  }
);
</script>
