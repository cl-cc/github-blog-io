<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-11-09 16:38:13
 * @LastEditors: 程
 * @LastEditTime: 2026-01-17 14:09:35
-->
<template>
  <div class="advantage" :style="{ background: color }">
    <div class="card">
      <div class="title">{{ $t('advantage.title') }}</div>
      <div class="line"></div>
    </div>
    <div class="item">
      <el-card class="box-card">
        <div>{{ $t('advantage.content') }}</div>
        <div>{{ $t('advantage.content1') }}</div>
        <div>{{ $t('advantage.content2') }}</div>
        <div>{{ $t('advantage.content3') }}</div>
        <div>{{ $t('advantage.content4') }}</div>
        <div>{{ $t('advantage.content5') }}</div>
        <div>{{ $t('advantage.content6') }}</div>
      </el-card>
    </div>
  </div>
</template>
<script setup lang="ts">
type Icolor = {
  color: string;
};
defineProps<Icolor>();
</script>
<style lang="scss" scoped>
.advantage {
  background: var(--home-bg-color, #f9f9ff);
  width: 100%;
  height: 100%;
  padding: 10% 0 0 5%;

  .item {
    width: 90%;
    margin-top: 5%;

    .box-card {
      line-height: 50px;
      font-size: 20px;
    }
  }

  .card {
    width: 100%;
    display: flex;
    align-items: center;

    .title {
      font-size: 32px;
      font-weight: bold;
    }

    .line {
      width: 80%;
      height: 2px;
      background: #ccc;
      margin-left: 20px;
    }
  }
}
</style>
