<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-11-09 14:24:51
 * @LastEditors: 程
 * @LastEditTime: 2022-11-18 16:46:08
-->
<template>
  <div class="project">
    <div class="card">
      <img src="@/assets/i1.png" alt="" />
      <div class="item">
        <div class="title">{{ $t('project.title') }}</div>
        <p>{{ $t('project.content') }}</p>
      </div>
    </div>
    <div class="xcard">
      <div class="item">
        <div class="title">{{ $t('project.title1') }}</div>
        <p>{{ $t('project.content1') }}</p>
      </div>
      <img src="@/assets/i4.png" alt="" />
    </div>
    <div class="card">
      <img src="@/assets/i17.png" alt="" />
      <div class="item">
        <div class="title">{{ $t('project.title2') }}</div>
        <p>{{ $t('project.content2') }}</p>
      </div>
    </div>
    <div class="xcard">
      <div class="item">
        <div class="title">{{ $t('project.title3') }}</div>
        <p>{{ $t('project.content3') }}</p>
      </div>
      <img src="@/assets/i9.png" alt="" />
    </div>
    <div class="card">
      <img src="@/assets/i7.png" alt="" />
      <div class="item">
        <div class="title">{{ $t('project.title4') }}</div>
        <p>{{ $t('project.content4') }}</p>
      </div>
    </div>
    <div class="xcard">
      <div class="item">
        <div class="title">{{ $t('project.title5') }}</div>
        <p>{{ $t('project.content5') }}</p>
      </div>
      <img src="@/assets/i6.png" alt="" />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.project {
  margin: 0px 0 0 5%;
  width: 100%;
  height: 100vh;
  padding-bottom: 5%;
  overflow: scroll;
  .card {
    display: flex;
    margin-top: 40px;
    img {
      width: 540px;
      height: 330px;
      margin-right: 60px;
      transition: all 0.3s ease 0s;
    }
    img:hover {
      cursor: pointer;
      transform: scale(0.9);
    }
    .item {
      width: 30%;
      margin-top: 20px;
    }
    .title {
      font-size: 26px;
      margin-bottom: 30px;
      font-weight: bold;
    }
    p {
      line-height: 25px;
      color: #777777;
    }
  }
  .xcard {
    display: flex;
    margin-left: 5%;
    img {
      width: 540px;
      height: 330px;
      margin-left: 110px;
      transition: all 0.3s ease 0s;
      margin-top: -5%;
    }
    img:hover {
      cursor: pointer;
      transform: scale(0.9);
    }
    .item {
      width: 30%;
      margin-top: 5%;
    }
    .title {
      font-size: 26px;
      margin-bottom: 30px;
      font-weight: bold;
    }
    p {
      line-height: 25px;
      color: #777777;
    }
  }
}
</style>
