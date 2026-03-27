<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2021-10-28 15:02:15
 * @LastEditors: 程
 * @LastEditTime: 2025-09-17 10:06:32
-->
<template>
  <div>
    <StarportCarrier>
      <router-view />
    </StarportCarrier>
  </div>
</template>

<script setup>
import { StarportCarrier } from 'vue-starport';
import { ref, onMounted } from 'vue';

// function getScreenScale(designWidth = 1920, designHeight = 1080) {
//   const { innerWidth, innerHeight } = window;
//   const scaleX = innerWidth / designWidth;
//   const scaleY = innerHeight / designHeight;
//   return Math.min(scaleX, scaleY);
// }

// const scale = ref(getScreenScale());
// const scaleStyle = ref({});

// onMounted(() => {
//   const updateScale = () => {
//     const s = getScreenScale(1920, 1080);
//     scale.value = s;
//     scaleStyle.value = {
//       transform: `scale(${s})`,
//       transformOrigin: 'left top',
//       width: '1920px',
//       height: '1080px',
//     };
//   };

//   updateScale();
//   window.addEventListener('resize', updateScale);
// });
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app {
  background: var(--home-bg-color, #fff);
  margin: 0;
  padding: 0;
  overflow: scroll;
  width: 100%;
  height: 100%;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  width: 100%;
  height: 100%;
}
#app::-webkit-scrollbar {
  display: none; /* Chrome Safari */
  width: 0 !important;
}
html,
body {
  width: 100%;
  height: 100%;
}
</style>
