<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-11-09 16:14:20
 * @LastEditors: 程
 * @LastEditTime: 2022-11-09 18:00:11
-->
<template>
  <div class="work">
    <div class="content">
      <el-timeline>
        <el-timeline-item center timestamp="2019/05 - 2020/01" placement="top">
          <el-card>
            <h4>{{ $t('work.branch') }}</h4>
            <p>{{ $t('work.tips') }}</p>
            <div>{{ $t('work.content') }}</div>
            <div>{{ $t('work.content1') }}</div>
            <div>{{ $t('work.content2') }}</div>
            <div>{{ $t('work.content3') }}</div>
            <div>{{ $t('work.content4') }}</div>
            <p>{{ $t('work.tips1') }}</p>
            <div>{{ $t('work.items') }}</div>
          </el-card>
        </el-timeline-item>
        <el-timeline-item center timestamp="2020/01 - 至今" placement="top">
          <el-card>
            <h4>{{ $t('work1.branch') }}</h4>
            <p>{{ $t('work1.tips') }}</p>
            <div>{{ $t('work1.content') }}</div>
            <div>{{ $t('work1.content1') }}</div>
            <div>{{ $t('work1.content2') }}</div>
            <div>{{ $t('work1.content3') }}</div>
            <div>{{ $t('work1.content4') }}</div>
            <div>{{ $t('work1.content5') }}</div>
            <div>{{ $t('work1.content6') }}</div>
            <p>{{ $t('work1.tips1') }}</p>
            <div>{{ $t('work1.items') }}</div>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.work {
  padding: 5% 0 10% 10%;
  width: 100%;
  height: 100vh;
  padding-bottom: 5%;
  overflow: scroll;
  .content {
    width: 70%;
    padding-bottom: 10%;
  }
  h4 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  p {
    font-size: 22px;
    font-weight: 500;
  }
  div {
    font-size: 18px;
    line-height: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>
