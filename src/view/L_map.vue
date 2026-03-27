<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程垒 💻
 * @Date: 2024-09-20 14:29:38
 * @LastEditors: 程垒 💻
 * @LastEditTime: 2024-09-25 15:37:45
-->
<template>
  <el-button type="warning" @click="playMap('start')">播放</el-button>
  <el-button type="success" @click="playMap('end')">暂停</el-button>
  <div id="LMap"></div>
</template>

<script setup>
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-trackplayer';
import { mapList } from './mapData';
import { onMounted, ref } from 'vue';
//背景图遮盖地图的图片(市场图片)
function getImageUrl() {
  return new URL(`./map.png`, import.meta.url).href;
}
//trackplayern播放器
let track = null;
//测试的点位
const testList = ref([]);
//生命周期挂载
onMounted(() => {
  let bounds = [
    [34.255, 108.885], // 左上角的坐标(虚拟写死)
    [34.271, 108.918], // 右下角的坐标(虚拟写死)
  ];
  //创建地图对象
  let L_map = L.map('LMap', { attributionControl: false, zoomControl: true });
  //添加地图图层
  L.imageOverlay(getImageUrl(), bounds).addTo(L_map);
  //禁止缩放
  L_map.scrollWheelZoom.disable();
  //禁止拖拽
  L_map.dragging.disable();
  //路线id
  const pathId = [1, 4, 5, 6, 42, 50, 54, 74, 75, 76, 78, 79, 81];
  // const pathId = [1, 4, 5, 6, 42, 35, 36, 37, 40, 41, 21, 23, 24, 25, 26, 27, 49, 56, 74, 63, 77, 71, 80, 81];
  // const pathId = [4, 3, 8, 10, 11, 12, 13, 14, 15, 16, 19, 17, 18, 34, 41, 48, 56, 55, 62, 61, 60, 68, 73];
  //根据路线id取出对应的路线
  const newPath = pathId.flatMap(id => mapList.filter(item => item.id === id));
  //根据背景图片的坐标设置地图的显示范围
  L_map.fitBounds(bounds);
  //定义沿着轨迹移动的marker
  let markerIcon = L.icon({
    iconSize: [24, 54], // marker的大小
    iconUrl: new URL('/public/tool/arco.png', import.meta.url).href, // marker的图片
    iconAnchor: [11.5, 27], // marker的偏移
  });
  //创建播放器对象并添加至地图
  track = new L.TrackPlayer(newPath, { markerIcon, panTo: false, passedLineColor: 'rgba(0, 0, 0, 0.2)', speed: 3000, weight: 7 }).addTo(L_map);
  //地图设置到合适的缩放级别
  L_map.setZoom(16, { animate: true });
  //点击地图添加点位
  L_map.on('click', function (e) {
    testList.value.push(e.latlng); //获取的经纬度
    console.log(JSON.stringify(testList.value));
  });
});
//播放轨迹
const playMap = type => {
  type === 'start' ? track.start() : track.pause();
};
</script>
<style scoped>
#LMap {
  height: 100vh;
  width: 80%;
  zoom: 0.8;
  background: #ccc;
}
</style>
