<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-11-09 11:16:17
 * @LastEditors: 程
 * @LastEditTime: 2022-11-18 16:44:57
-->
<template>
  <div class="main">
    <div class="left">
      <div class="head-img"></div>
      <h2 class="name">{{ $t('resume.name') }}</h2>
      <p class="introduction">{{ $t('resume.introduction') }}</p>
      <div class="nav">
        <div class="nav-item" v-for="nav in navList" :key="nav.id" @click="tab(nav)">
          <div class="items" :class="[nav.id === navActive ? 'active' : '']">{{ $t(`nav.${nav.text}`) }}</div>
        </div>
      </div>
      <div class="copyright">{{ $t('resume.copyright') }}</div>
    </div>
    <div class="right" :style="{ background: color }">
      <div class="header">
        <div class="toggle" @click.stop="toggleDark()">
          <el-icon v-show="!isDark" :size="30"><Moon /></el-icon>
          <el-icon v-show="isDark" :size="30"><Sunny /></el-icon>
        </div>
        <div class="screenfull-lang" @click="change_Lang">
          <img v-show="!isDark" src="@/assets/v2/drck-en.png" alt="" />
          <img v-show="isDark" src="@/assets/v2/drck-zh.png" alt="" />
        </div>
      </div>
      <Home v-show="navActive === 1" @go="go" />
      <About v-show="navActive === 2" :color="color" />
      <WorkItem v-show="navActive === 3" />
      <Project v-show="navActive === 4" />
      <Advantage v-show="navActive === 5" :color="color" />
      <Education v-show="navActive === 7" />
    </div>
    <div class="colorItems" v-if="typeColor()">
      <div class="text">白色太亮眼? 改个主题色吧 🤩</div>
      <el-color-picker v-model="color" show-alpha @active-change="colorClick" :predefine="predefineColors" />
    </div>
  </div>
</template>
<script setup lang="ts">
import Home from './home.vue';
import About from './about.vue';
import Project from './project.vue';
import WorkItem from './work.vue';
import Advantage from './Advantage.vue';
import Education from './education.vue';

import { useI18n } from 'vue-i18n';
import { useDark, useToggle } from '@vueuse/core';
const langT = ref(false);
const { locale } = useI18n();
const isDark = useDark();
const toggleDark = useToggle(isDark);
interface Inav {
  id: number;
  text: string;
}

const navActive = ref<number>(1);

const navList = ref<Inav[]>([
  { id: 1, text: 'HOME' },
  { id: 2, text: 'ABOUT' },
  { id: 3, text: 'WORK' },
  { id: 4, text: 'PROJECT' },
  { id: 5, text: 'ADVANTAGE' },
  { id: 6, text: 'EDUCATION' },
  { id: 7, text: 'CONTACT' },
]);

function tab({ id }: Inav) {
  navActive.value = id;
}

function go(e: number) {
  navActive.value = e;
}

change_Lang();
//语言切换
function change_Lang() {
  let lang = langT.value ? 'en' : 'zh';
  langT.value = !langT.value;
  locale.value = lang;
  localStorage.setItem('lang', lang);
}

//颜色
const color = ref('rgba(255, 255, 255, 0.68)');
const predefineColors = ref(['#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585', 'rgba(255, 69, 0, 0.68)', 'rgb(255, 120, 0)', 'hsv(51, 100, 98)', 'hsva(120, 40, 94, 0.5)', 'hsl(181, 100%, 37%)', 'hsla(209, 100%, 56%, 0.73)', '#c7158577']);
function colorClick(e: string) {
  color.value = e;
}
const typeColor = () => {
  if (navActive.value != 3 && navActive.value != 4) {
    return true;
  }
};
</script>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 0.8fr 3fr;
  position: relative;
  .colorItems {
    position: absolute;
    right: 3%;
    bottom: 5%;
    display: flex;
    align-items: center;
    .text {
      font-size: 20px;
      margin-right: 10px;
      font-family: 'Hiragino Sans GB';
    }
  }
  .right {
    position: relative;
    .toggle {
      cursor: pointer;
      margin-right: 40px;
    }
    .screenfull-lang {
      cursor: pointer;

      img {
        width: 30px;
        height: 30px;
      }
    }
    .header {
      position: absolute;
      top: 20px;
      right: 50px;
      align-items: center;
      z-index: 999;
      display: flex;
    }
  }
  .left {
    width: 100%;
    background: var(--home-home-color, rgba(240, 242, 245, 1));
    display: flex;
    flex-direction: column;
    align-items: center;
    .copyright {
      width: 82%;
      color: #ae9d9d;
      line-height: 30px;
      text-align: center;
    }
    .nav {
      font-size: 18px;
      margin-top: 15%;
      &-item {
        width: 100%;
        text-align: center;
        height: 60px;
        .items {
          width: auto;
          border-bottom: 3px solid var(--home-home-color, #f0f2f5);
          padding-bottom: 10px;
          cursor: pointer;
        }
        .active {
          border-bottom: 3px solid #409eff;
          color: #409eff;
        }
        .items:hover {
          border-bottom: 3px solid #409eff;
          color: #409eff;
        }
      }
    }
    .head-img {
      width: 150px;
      height: 150px;
      border-radius: 100%;
      background: #ccc;
      margin-top: 15%;
      background: url('@/assets/v2/header.jpeg');
      background-size: cover;
    }
    .name {
      font-size: 30px;
      font-weight: bold;
      margin-top: 10%;
    }
    .introduction {
      margin-top: 5%;
      font-size: 16px;
      color: #937f7f;
    }
  }
}
</style>
