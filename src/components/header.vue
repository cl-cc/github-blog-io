<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-12-01 11:33:15
 * @LastEditors: 程垒 💻
 * @LastEditTime: 2024-12-30 16:05:29
-->
<template>
  <div class="header">
    <!-- @click="goMain" -->
    <img class="logo" src="../assets/newLogo.png" alt="" />
    <!-- <div class="back" @click="back"></div> -->
    <div class="nav-items flex">
      <div @click="toPath(v)" v-for="v in navList">{{ v.name }}</div>
    </div>
    <div class="tip">
      <div class="screenfull-lang" @click="change_Lang">
        <img v-show="!isDark" src="@/assets/v2/drck-en.png" alt="" />
        <img v-show="isDark" src="@/assets/v2/drck-zh.png" alt="" />
      </div>
      <div class="toggle" ref="switchRef" @click.stop="toggleDark()">
        <el-icon v-show="!isDark" :size="30"><Moon /></el-icon>
        <el-icon v-show="isDark" :size="30"><Sunny /></el-icon>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useDark, useToggle } from '@vueuse/core';
const langT = ref(false);
const { locale } = useI18n();
const isDark = useDark();

const switchRef = ref<HTMLElement>();
const toggleDark = () => {
  // 若浏览器不支持 View Transitions
  if (!document.startViewTransition) {
    return true;
  }
  return new Promise(resolve => {
    const switchEl = switchRef.value as HTMLElement;
    const rect = switchEl.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(() => {
      resolve(true);
    });

    transition.ready.then(() => {
      const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`];
      document.documentElement.animate(
        {
          clipPath,
        },
        {
          duration: 400,
          easing: 'ease-in',
          pseudoElement: '::view-transition-new(root)',
        }
      );
      isDark.value = !isDark.value;
    });
  });
};
change_Lang();
//语言切换
function change_Lang() {
  let lang = langT.value ? 'en' : 'zh';
  langT.value = !langT.value;
  locale.value = lang;
  localStorage.setItem('lang', lang);
}
const router = useRouter();
function back() {
  router.go(-1);
}
function goMain() {
  const w = window.open('about:blank') as Window & { location: { href: string } };
  w.location.href = 'https://blog.csdn.net/weixin_44255044?spm=1011.2415.3001.5343';
}
//导航
const navList = ref([
  { name: '首页', path: '/' },
  { name: 'Github', path: 'https://github.com/cl-cc' },
  { name: 'Csdn', path: 'https://blog.csdn.net/weixin_44255044' },
  { name: '代码封装', path: 'http://47.96.82.137:4000/' },
]);
const toPath = (v: { path: string }) => {
  if (v.path.includes('http')) {
    window.open(v.path);
  } else {
    router.push(v.path);
  }
};
</script>

<style lang="scss" scoped>
.nav-items {
  div {
    width: 130px;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
    color: val(--home-tips-color, #333);
    font-weight: bold;
  }
  div:hover {
    color: #409eff;
  }
}
.header {
  width: 100%;
  height: 80px;
  box-shadow: 0 5px 8px 0 rgb(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  // display: grid;
  // place-content: center;
  position: fixed;
  top: 0;
  background: val(--home-top-color, #fff);
  background-image: radial-gradient(transparent 1px, var(--home-top-color, #fff));
  background-size: 4px 4px;
  -webkit-backdrop-filter: saturate(50%) blur(5px);
  backdrop-filter: blur(5px);
  z-index: 9999;
  border-bottom: 2px solid #409eff;

  .logo {
    position: absolute;
    left: 0;
    top: -75%;
    width: 200px;
    height: 200px;
    // cursor: pointer;
  }

  .back {
    position: absolute;
    top: 15px;
    left: 50px;
    cursor: pointer;

    img {
      width: 50px;
      height: 50px;
    }
  }

  .title {
    font-size: 24px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: var(--home-tips-color, #434343);
  }

  .tip {
    position: absolute;
    right: 0;
    top: -15px;

    .toggle {
      float: right;
      margin: 40px 40px 0 0;
      cursor: pointer;
    }

    .screenfull-lang {
      float: right;
      margin: 40px 40px 0 0;
      cursor: pointer;

      img {
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>
