<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程垒 💻
 * @Date: 2024-08-29 09:19:33
 * @LastEditors: 程
 * @LastEditTime: 2025-02-12 09:48:48
-->
<script setup lang="ts">
import { useRouter } from 'vue-router';
import Typed from 'typed.js';
import { onMounted, reactive, toRefs, ref, onBeforeMount } from 'vue';
import vocabularyData from '@/utils/vocabulary.js';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useDark, useToggle } from '@vueuse/core';
const isDark = useDark();
const titleText = ref('');
const router = useRouter();

const typed = ref<Typed>();
onMounted(() => {
  browserRedirect();
  //打字效果
  const typedDom = new Typed('#typed', {
    strings: ['Inspire,'],
    typeSpeed: 100,
    backSpeed: 100,
    showCursor: false,
    loop: true,
  });
  typed.value = typedDom;
});
//销毁打字效果
onBeforeMount(() => {
  typed.value?.destroy();
});
// @ts-ignore
const browserRedirect = () => {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad';
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os';
  var bIsMidp = sUserAgent.match(/midp/i) == 'midp';
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4';
  var bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb';
  var bIsAndroid = sUserAgent.match(/android/i) == 'android';
  var bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce';
  var bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile';
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
    ElMessageBox.alert('暂时不支持手机端查看,请您切换至pc/电脑端查看', '提示', {
      confirmButtonText: '确认',
      callback: action => {
        ElMessage({
          type: 'info',
          message: `暂不支持手机端查看`,
        });
      },
    });
  }
};

const go = (e: number) => {
  switch (e) {
    case 1:
      ElMessage({
        type: 'warning',
        message: `您无访问权限!`,
        grouping: true,
      });
      break;
    case 2:
      window.open('https://blog.csdn.net/weixin_44255044');
      break;
    case 3:
      window.open('https://github.com/cl-cc');
      break;
    case 4:
      router.push('/pluginCollection');
      break;
    case 5:
      window.open('http://47.96.82.137:4000/');
      break;
  }
};
//暗黑切换
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
</script>
<template>
  <div class="main">
    <div class="bgline bg-no-repeat bg-cover"></div>
    <div class="header flex items-center justify-around">
      <img class="logo" src="../assets/newLogo.png" alt="" />
      <div class="flex relative">
        <div class="cc mr-4 cursor-pointer" @click="go(3)">Github</div>
        <div class="cc cursor-pointer" @click="go(2)">Csdn</div>
      </div>
      <div class="flex items-center relative">
        <div class="cc mr-2 cursor-pointer" style="font-size: 18px" @click="go(5)">代码封装</div>
        <div class="cc btn cursor-pointer" @click="go(4)">前端工具</div>
      </div>
      <div class="toggle cursor-pointer" ref="switchRef" @click.stop="toggleDark()">
        <el-icon v-show="!isDark" :size="30"><Moon /></el-icon>
        <el-icon v-show="isDark" :size="30"><Sunny /></el-icon>
      </div>
    </div>
    <div class="text">
      <h1 id="typed" class="cc text-3xl font-bold text-gray-800 md:text-2xl lg:text-2xl xl:text-[100px]"></h1>
      <h1 style="margin-left: 5%" class="cc text-3xl font-bold text-gray-800 md:text-2xl lg:text-2xl xl:text-[100px]">creativity</h1>
      <h2 class="cc text-3xl jb">enrich life.</h2>
      <button type="button" class="btn1" @click="go(1)">
        <strong>个人简历</strong>
        <div id="container-stars">
          <div id="stars"></div>
        </div>
        <div id="glow">
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
      </button>
    </div>
    <div class="index-bg">
      <div class="i-bg"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url(./btn1.css);
.cc {
  font-family: 'Yuanti SC';
  color: var(--home-text-color, #333);
}

.jb {
  background: -webkit-linear-gradient(20deg, rgba(86, 215, 254, 1), rgba(86, 215, 254, 0.1));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}
.main {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  .btn1 {
    margin-top: 10%;
  }
  .text {
    box-sizing: border-box;
    padding: 5% 15%;
  }
  .index-bg:hover {
    box-shadow: 0 15px 30px 5px rgba(86, 215, 254, 0.8); /* 增加阴影，使它看起来更悬浮 */
  }
  .index-bg {
    width: 25%;
    height: 100%;
    border: 2px solid rgba(86, 215, 254, 0.5);
    position: absolute;
    border-radius: 10px;
    right: 9%;
    top: 4%;
    z-index: 2;
    transform: scale(0.8);
    box-shadow: 0 0 0 0 rgba(86, 215, 254, 0.5);
    transition: all 0.5s ease-in-out;
    .i-bg {
      width: 100%;
      height: 100%;
      background-image: url(../assets/index-bg.png);
      background-size: 100% 100%;
      border-radius: 10px;
    }
  }
  .bgline {
    width: 100%;
    height: 100%;
    background-image: url(../assets/bgline.svg);
    opacity: 0.1;
    position: absolute;
    top: 0;
    left: 22%;
  }
  .header {
    width: 100%;
    box-sizing: border-box;
    padding: 0 1%;
    margin-top: -2%;
    .logo {
      width: 200px;
    }
    .btn {
      background: linear-gradient(90deg, rgba(86, 215, 254, 0.8), rgba(86, 215, 254, 0.5));
      font-size: 18px;
      padding: 10px 15px;
      border-radius: 5%;
      color: var(--home-text-color, #333);
    }
    div {
      font-size: 22px;
      color: var(--home-text-color, #333);
    }
  }
}
.toggle {
  position: absolute;
  top: 5%;
  right: 2%;
}
</style>
