<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2025-08-30 13:41:22
 * @LastEditors: 程
 * @LastEditTime: 2026-03-20 16:55:39
-->
<script setup lang="ts">
import init_search from '@/utils/fuseSearch';
import { ref, onMounted } from 'vue';
import dashboard from 'lodash';
import { newToolItems } from './toolData';
import { showLoading, hideLoading } from '@/utils/loading';
import Typed from 'typed.js';
import { ElMessage } from 'element-plus';
const colorList = ref([
  { color: 'bg-gradient-to-r from-blue-500 to-purple-600', text: 'group-hover:text-blue-600' },
  { color: 'bg-gradient-to-r from-green-500 to-teal-600', text: 'group-hover:text-green-600' },
  { color: 'bg-gradient-to-r from-yellow-500 to-orange-600', text: 'group-hover:text-yellow-600' },
  { color: 'bg-gradient-to-r from-pink-500 to-red-600', text: 'group-hover:text-pink-600' },
  { color: 'bg-gradient-to-r from-indigo-500 to-purple-600', text: 'group-hover:text-indigo-600' },
  { color: 'bg-gradient-to-r from-red-500 to-orange-600', text: 'group-hover:text-red-600' },
]);
function toUrl(url: string) {
  window.open(url);
}
//搜索
const newToolItemsData = ref<any[]>([]);
newToolItemsData.value = newToolItems.value;
const searchInput = ref('');
const search = dashboard.debounce(() => {
  showLoading();
  setTimeout(() => {
    if (searchInput.value) {
      const results: any = {};
      for (const key in newToolItems.value) {
        const group = newToolItems.value[key];
        group.isExpand = true;
        const fuse = init_search(group.items || []);
        const matched = fuse.search(searchInput.value).map((r: any) => r.item);
        results[key] = {
          ...group,
          items: matched,
        };
      }
      newToolItemsData.value = results;
    } else {
      newToolItemsData.value = newToolItems.value;
      for (const key in newToolItemsData.value) {
        const group = newToolItemsData.value[key];
        group.isExpand = key === 'frame' || key === 'webUi';
      }
    }
    hideLoading();
  }, 0);
}, 50);
//展开折叠
const toggleExpand = (index: number) => {
  newToolItemsData.value[index].isExpand = !newToolItemsData.value[index].isExpand;
};
onMounted(() => {
  const options = {
    strings: ['师者，传道授业解惑也!', '君子知至学之难易而知其美恶，然后能博喻，能博喻然后能为师!', '人生就像射箭，梦想就是箭靶子，如果连箭靶子也找不到的话，你每天拉弓有什么意义?'],
    typeSpeed: 80,
    backSpeed: 50,
    loop: true,
    showCursor: false,
    backDelay: 1500,
  };
  new Typed('#typedDom', options);
});
const changeLanguage = (lang: string) => {
  if (window.localStorage.getItem('lang') === lang) {
    ElMessage.warning('当前语言已选择 ' + lang);
    return;
  }
  window.localStorage.setItem('lang', lang);
  window.location.reload();
};
</script>
<template>
  <div class="tool min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
    <div class="tool-header bg-white/90 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-2 sm:px-2 lg:px-4 py-2">
        <div class="text-center relative">
          <h1 class="font-bold text-[30px] mb-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">前端工具</h1>
          <p class="text-gray-600 mb-2 h-[20px]" id="typedDom"></p>
          <el-input class="ipt" v-model="searchInput" @input="search" clearable @keyup.enter="search" placeholder="搜索前端工具和网站..." />
          <!-- <div class="mt-2 flex items-center justify-center">
            <el-button type="primary" icon="Eleme" @click="changeLanguage('zh')">中文</el-button>
            <el-button type="warning" icon="ElemeFilled" @click="changeLanguage('en')">英文</el-button>
          </div> -->
          <div class="absolute top-0 left-0">
            <img class="w-[250px]" src="./name-loop.svg" />
          </div>
        </div>
      </div>
    </div>
    <main class="mx-auto px-2 sm:px-4 lg:px-4 py-4">
      <div>
        <section class="mb-2" v-for="(v, index) in newToolItemsData" :key="v.text">
          <div class="flex items-center mb-2">
            <h2 class="font-bold border-b-3 border-blue-500 text-blue-600 inline-block name">{{ v.text }}</h2>
            <div class="bg-gray-100 text-gray-600 font-medium rounded-full tips flex items-center justify-center ml-1">{{ v.items.length }} 个工具</div>
            <el-icon color="#67C23A" v-if="!v.isExpand" @click="toggleExpand(index)" size="24" class="ml-1 cursor-pointer"><CirclePlusFilled /></el-icon>
            <el-icon color="#F56C6C" v-else @click="toggleExpand(index)" size="24" class="ml-1 cursor-pointer"><RemoveFilled /></el-icon>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5" v-if="v.isExpand">
            <div v-for="item in v.items" @click="toUrl(item.url)" class="group mb-2 bg-white border border-gray-100 rounded-sm px-2 py-2 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 mr-2">
              <h3 class="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-200 name" :class="colorList[Math.floor(Math.random() * colorList.length)].text">{{ item.text }}</h3>
              <p class="text-gray-600 leading-relaxed introduction">{{ item.introduction }}</p>
              <div class="h-0.5 rounded-full mt-1 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" :class="colorList[Math.floor(Math.random() * colorList.length)].color"></div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>
<style lang="scss" scoped>
.tool-header {
  background: val(--home-top-color, #fff);
  background-image: radial-gradient(transparent 1px, var(--home-top-color, #fff));
  background-size: 4px 4px;
  -webkit-backdrop-filter: saturate(50%) blur(1px);
  backdrop-filter: blur(1px);
}
.ipt {
  width: 50%;
  height: 50px;
  font-size: 18px;
}
.name {
  font-size: 22px;
}
.tips {
  width: 80px;
  height: 30px;
}
.introduction {
  height: 40px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-emphasis: ellipsis;
}
</style>
