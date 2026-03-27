<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-12-01 11:32:04
 * @LastEditors: 程
 * @LastEditTime: 2026-03-20 16:51:46
-->
<template>
  <div class="blogeir-background-wrapper">
    <div class="squares">
      <span class="square"></span>
      <span class="square"></span>
      <span class="square"></span>
      <span class="square"></span>
      <span class="square"></span>
    </div>
    <div class="circles">
      <span class="circle"></span>
      <span class="circle"></span>
      <span class="circle"></span>
      <span class="circle"></span>
      <span class="circle"></span>
    </div>
    <div class="triangles">
      <span class="triangle"></span>
      <span class="triangle"></span>
      <span class="triangle"></span>
      <span class="triangle"></span>
      <span class="triangle"></span>
    </div>
  </div>
  <div class="mainc">
    <div class="nav-mask">
      <div class="newtopbg">
        <div class="title">{{ $t('tool.title') }}</div>
        <input class="maxIpt" v-model="searchInput" @input="search" placeholder="请输入您要搜索的插件" @keyup.enter="search" />
      </div>
      <clheader />
      <div class="common">
        <Frame />
        <webUi />
        <mobileUi />
        <visualization />
        <plugin />
        <iconFont />
        <interview />
        <aiPage />
        <learningRoute />
        <!-- <website /> -->
      </div>
      <clfooter />
    </div>
  </div>
  <el-backtop :bottom="150" :right="100">
    <div class="top">UP</div>
  </el-backtop>
</template>
<script setup lang="ts">
import { showLoading, hideLoading } from '@/utils/loading';
import emitter from '@/utils/eventBus';
import dashboard from 'lodash';

//组件
import clheader from '@/components/header.vue';
import Frame from '@/view/pluginPage/frame.vue';
import webUi from '@/view/pluginPage/webUi.vue';
import mobileUi from '@/view/pluginPage/mobileUi.vue';
import aiPage from '@/view/pluginPage/ai.vue';
import plugin from '@/view/pluginPage/plugin.vue';
import iconFont from '@/view/pluginPage/iconFont.vue';
import interview from '@/view/pluginPage/interview.vue';
import visualization from '@/view/pluginPage/visualization.vue';
import clfooter from '@/components/footer.vue';
import learningRoute from './pluginPage/learningRoute.vue';
//禁止返回
// onMounted(() => {
//   window.history.pushState(null, '', window.location.href);
//   window.onpopstate = function () {
//     window.history.pushState(null, '', window.location.href);
//   };
// });
//搜索
const searchInput = ref('');
const search = dashboard.debounce(() => {
  showLoading();
  setTimeout(() => {
    //给所有全局子组件发送搜索内容
    emitter.emit('searchEvent', searchInput.value);
    hideLoading();
  }, 200);
}, 500);
</script>
<style lang="scss" scoped>
input {
  display: inline-block;
  max-width: 296px;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  padding: 10px 20px;
  border: 5px solid rgba(25, 137, 250, 1);
  -webkit-border-radius: 11px;
  border-radius: 11px;
  font: normal 19px / normal 'Courier New', Courier, monospace;
  color: #fff;
  -o-text-overflow: clip;
  text-overflow: clip;
  background: rgb(64, 158, 255, 0.1);
  box-shadow: 0 0 9px 4px rgba(0, 0, 0, 0.15), -1px 4px 8px -1px rgba(0, 0, 0, 0.49) inset;
  transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
  -webkit-transform: rotateX(-16.62deg) rotateY(-28.64788975654116deg);
  transform: rotateX(-16.62deg) rotateY(-28.64788975654116deg);
}

input:hover {
  -webkit-transform: rotateX(-15.62deg) rotateY(-0.65deg);
  transform: rotateX(-15.62deg) rotateY(-0.65deg);
}

.search__icon {
  height: 1.3em;
  width: 1.3em;
  fill: #b4b4b4;
}

input:focus {
  outline: none;
}

.maxIpt {
  position: fixed;
  right: 1%;
  top: 20%;
  background: #fff;
  color: #000;
}
</style>
<style lang="scss" scoped>
.newtopbg {
  width: 100%;
  height: 200px;
  background: url(../../public/tool/gjtopbg.jpeg);
  background-size: cover;
  position: relative;
  z-index: 9999;
  margin-top: 80px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;

  .title {
    font-size: 24px;
    color: #fff;
    margin-left: 30px;
  }
}
.mainc {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  // background: var(--home-bg-color, #f5f6fb);
}
.top {
  width: 100%;
  height: 100%;
  display: grid;
  place-content: center;
  background-color: var(--el-bg-color-overlay);
  box-shadow: var(--el-box-shadow-lighter);
  text-align: center;
  color: #1989fa;
  border-radius: 10px;
}
.blogeir-background-wrapper {
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 1;
}

.blogeir-background-wrapper .squares,
.blogeir-background-wrapper .circles,
.blogeir-background-wrapper .triangles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}
.squares .square {
  position: absolute;
  width: 20px;
  height: 20px;
  opacity: 0.1;
  animation: animate 8s linear infinite;
  bottom: -100px;
  background: #e6a23c !important;
}
.circles .circle {
  position: absolute;
  width: 20px;
  height: 20px;
  opacity: 0.1;
  animation: animate 8s linear infinite;
  bottom: -100px;
  background: #f56c6c !important;
}
.triangles .triangle {
  position: absolute;
  width: 20px;
  height: 20px;
  opacity: 0.1;
  animation: animate 8s linear infinite;
  bottom: -100px;
  background: #409eff !important;
}
.circles .circle {
  border-radius: 100px !important;
}
.triangles .triangle {
  width: 0;
  height: 0;
  border-bottom-width: 42px;
  border-bottom-style: solid;
  border-left-width: 25px;
  border-left-style: solid;
  border-right-width: 25px;
  border-right-style: solid;
  border-radius: 10px !important;
}
.squares .square:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}
.circles .circle:nth-child(1) {
  left: 10%;
  width: 22px;
  height: 20px;
  animation-delay: 0s;
}
.triangles .triangle:nth-child(1) {
  left: 45%;
  border-right-width: 10px;
  border-left-width: 10px;
  border-bottom-width: 22px;
  animation-delay: 0s;
}
.squares .square:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}
.circles .circle:nth-child(2) {
  left: 45%;
  width: 84px;
  height: 80px;
  animation-delay: 12s;
}
.triangles .triangle:nth-child(2) {
  left: 25%;
  border-right-width: 15px;
  border-left-width: 15px;
  border-bottom-width: 28px;
  animation-delay: 12s;
}
.squares .square:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}
.circles .circle:nth-child(3) {
  left: 90%;
  width: 53px;
  height: 50px;
  animation-delay: 4s;
}
.triangles .triangle:nth-child(3) {
  left: 80%;
  border-right-width: 15px;
  border-left-width: 15px;
  border-bottom-width: 28px;
  animation-delay: 4s;
}
.squares .square:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}
.circles .circle:nth-child(4) {
  left: 60%;
  width: 53px;
  height: 50px;
  animation-delay: 18s;
}
.triangles .triangle:nth-child(4) {
  left: 30%;
  border-right-width: 20px;
  border-left-width: 20px;
  border-bottom-width: 38px;
  animation-delay: 18s;
}
.squares .square:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}
.circles .circle:nth-child(5) {
  left: 90%;
  width: 43px;
  height: 40px;
  animation-delay: 1s;
}
.triangles .triangle:nth-child(5) {
  left: 70%;
  border-right-width: 25px;
  border-left-width: 25px;
  border-bottom-width: 42px;
  animation-delay: 1s;
}
.squares .square:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}
.squares .square:nth-child(7) {
  left: 35%;
  width: 100px;
  height: 100px;
  animation-delay: 7s;
}
.squares .square:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}
.squares .square:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}
.squares .square:nth-child(10) {
  left: 85%;
  width: 100px;
  height: 100px;
  animation-delay: 0s;
  animation-duration: 11s;
}
@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  50% {
    transform: translateY(-500px) rotate(360deg);
    opacity: 0.5;
    border-radius: 30%;
  }
  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 60%;
  }
}
</style>
