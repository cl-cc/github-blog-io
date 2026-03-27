<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-11-09 13:36:56
 * @LastEditors: 程
 * @LastEditTime: 2022-11-18 16:32:40
-->
<template>
  <div class="about" :style="{ background: color }">
    <h1>{{ $t('about.title') }}</h1>
    <h2>{{ $t('about.tips') }}</h2>
    <div class="about-item">
      <div class="left">
        <div class="content">{{ $t('about.content') }}</div>
        <div class="title">{{ $t('about.tools') }}</div>
        <div class="skill">
          <div class="tips">HTML/CSS/JS 85%</div>
          <el-progress :stroke-width="15" :text-inside="true" color="#62bdfc" :percentage="85" />
        </div>
        <div class="skill">
          <div class="tips">Vue 80%</div>
          <el-progress :stroke-width="15" :text-inside="true" color="#62bdfc" :percentage="80" />
        </div>
        <div class="skill">
          <div class="tips">Uni-app 40%</div>
          <el-progress :stroke-width="15" :text-inside="true" color="#62bdfc" :percentage="40" />
        </div>
        <div class="skill">
          <div class="tips">TypeScript 70%</div>
          <el-progress :stroke-width="15" :text-inside="true" :percentage="50" color="#62bdfc" :indeterminate="true" :duration="5" />
        </div>
        <div class="skill">
          <div class="tips">Vite/WebPack 65%</div>
          <el-progress :stroke-width="15" :text-inside="true" color="#62bdfc" :percentage="65" />
        </div>
      </div>
      <div class="right">
        <div class="work"></div>
        <div class="info">
          <div class="title">{{ $t('about.name') }}</div>
          <div class="f">{{ $t('about.positions') }}</div>
          <div class="phone">
            <el-icon><Phone /></el-icon>
            <div>(+86) 138 9135 3386</div>
          </div>
          <div class="phone">
            <el-icon><TakeawayBox /></el-icon>
            <div>1074443738@qq.com</div>
          </div>
        </div>
      </div>
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
.about {
  background: var(--home-bg-color, #f9f9ff);
  width: 100%;
  height: 100%;
  h1 {
    color: var(--home-text-color, #222);
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    padding-top: 40px;
  }
  h2 {
    color: #777777;
    font-size: 18px;
    text-align: center;
    margin-top: 20px;
  }
  &-item {
    display: flex;
    margin-left: 5%;
    margin-top: 5%;
    position: relative;
    .right {
      position: absolute;
      right: 10%;
      width: 30%;
      height: 100%;
      background: #fff;
      .work {
        width: 100%;
        height: 70%;
        background: #ccc;
      }
      .info {
        .title {
          font-size: 20px;
          color: #222;
          font-weight: bold;
          text-align: center;
          margin: 20px 0;
        }
        .f {
          text-align: center;
          margin-top: -10px;
          color: #777;
        }
        .phone {
          display: flex;
          align-items: center;
          font-size: 16px;
          margin-top: 20px;
          justify-content: center;
          color: #777;
          div {
            margin-left: 10px;
          }
        }
      }
    }
    .left {
      width: auto;
      .content {
        width: 50%;
        color: #777777;
        font-size: 18px;
        line-height: 25px;
      }
      .title {
        font-family: 'Poppins', sans-serif;
        color: var(--home-tips-color, #222222);
        font-weight: 600;
        font-size: 22px;
        margin-top: 20px;
      }
      .skill {
        width: 50%;
        margin-top: 50px;
        .tips {
          margin-top: 20px;
          font-size: 20px;
          color: #777777;
          margin-bottom: 15px;
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>
