/*
 * @Descripttion:
 * @version:
 * @Author: 程
 * @Date: 2021-10-28 15:02:15
 * @LastEditors: 程
 * @LastEditTime: 2025-12-12 11:34:57
 */
import { createWebHistory, createRouter } from 'vue-router';
const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../src/pages/aiIndex.vue'),
    meta: {
      title: '测试模型',
    },
    children: [],
  },
  {
    path: '/ces',
    name: 'ces',
    meta: {
      title: '地图测试',
    },
    component: () => import('@/view/map.vue'),
  },
  {
    path: '/deepseek',
    name: 'deepseek',
    meta: {
      title: '地图测试',
    },
    component: () => import('@/view/deepseek.vue'),
  },
  {
    path: '/tongyi',
    name: 'tongyi',
    meta: {
      title: '地图测试',
    },
    component: () => import('@/view/tongyi.vue'),
  },
  {
    path: '/L_map',
    name: 'L_map',
    meta: {
      title: '地图测试',
    },
    component: () => import('@/view/L_map.vue'),
  },
  {
    path: '/excelBoxtz',
    name: 'excelBoxtz',
    meta: {
      title: '表格测试',
    },
    component: () => import('@/view/excelBoxtz.vue'),
  },
  {
    path: '/resume',
    name: 'resume',
    meta: {
      title: '个人简历',
    },
    component: () => import('@/view/resume.vue'),
  },
  //------
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '个人简历',
    },
    component: () => import('../src/pages/home.vue'),
  },
  {
    path: '/project',
    name: 'project',
    meta: {
      title: '项目经历',
    },
    component: () => import('../src/pages/project.vue'),
  },
  {
    path: '/message',
    name: 'message',
    meta: {
      title: '聊天室',
    },
    component: () => import('../src/pages/message.vue'),
  },
  {
    path: '/pluginCollection1',
    name: 'pluginCollection1',
    meta: {
      title: '前端工具大全',
    },
    component: () => import('@/view/pluginCollection.vue'),
  },
  {
    path: '/pluginCollection',
    name: 'pluginCollection',
    meta: {
      title: '前端工具大全',
    },
    component: () => import('@/view/newTool/index.vue'),
  },
];
const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes,
});
export default router;
