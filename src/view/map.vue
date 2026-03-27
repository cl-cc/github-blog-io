<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2025-07-11 17:18:59
 * @LastEditors: 程
 * @LastEditTime: 2025-07-11 17:52:15
-->
<script setup lang="ts">
import home from './home.vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import { createVNode, render } from 'vue';
// 示例坐标，可以用接口返回的经纬度替换

const markerList = [
  {
    name: '设备A',
    position: [108.95163841709325, 34.25397640118222], // 假设是北京天安门
    content: '这是设备A',
  },
  {
    name: '设备B',
    position: [108.94198509788043, 34.255438501103754], // 假设是东边一点
    content: '这是设备B',
  },
];

onMounted(() => {
  AMapLoader.load({
    key: 'f2aafd65a3273a2167fa3adf631ca919', // 必填！需要去高德开放平台注册
    version: '2.0',
    plugins: ['AMap.Marker', 'AMap.InfoWindow'],
  })
    .then(AMap => {
      const map = new AMap.Map('mapContainer', {
        zoom: 14.5,
        center: [108.94704000000002, 34.259430000000016],
        // blue
        mapStyle: 'amap://styles/darkblue',
        viewMode: '3D', // 💥 开启 3D 模式，必需！
        pitch: 50, // 💥 倾斜角度（0~83）
        rotation: 0,
      });

      // 添加标点 & 点击事件
      markerList.forEach(item => {
        const marker = new AMap.Marker({
          position: item.position,
          title: item.name,
          map,
          // icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        });

        // const infoWindow = new AMap.InfoWindow({
        //   content: `<strong>${item.name}</strong><br/>${item.content}`,
        //   offset: new AMap.Pixel(0, -30),
        // });

        marker.on('click', () => {
          const vnode = createVNode(home);
          const div = document.createElement('div');
          render(vnode, div);
          const infoWindow = new AMap.InfoWindow({
            content: div,
            offset: new AMap.Pixel(0, -30),
          });
          infoWindow.open(map, marker.getPosition());
          // map.openWindow(marker.getPosition(), div);
          // infoWindow.open(map, marker.getPosition());
        });
      });
    })
    .catch(e => {
      console.error('高德地图加载失败', e);
    });
});
</script>
<template>
  <div>
    <div id="mapContainer" style="width: 100%; height: 100vh"></div>
  </div>
</template>
<style lang="less" scoped></style>
