<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-11-09 16:53:10
 * @LastEditors: 程
 * @LastEditTime: 2022-11-18 15:01:47
-->
<template>
  <div class="education">
    <div class="position">
      <div class="text">
        <img src="@/assets/v2/phone.png" alt="" />
        <div>(+86) 138 9135 3386</div>
      </div>
      <div class="text">
        <img src="@/assets/v2/em.png" alt="" />
        <div>1074443738@qq.com</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.education {
  width: 100%;
  height: 100vh;
  position: relative;
  .position {
    position: absolute;
    bottom: 20%;
    right: 10%;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  }
  .text {
    display: flex;
    align-items: center;
    font-size: 40px;
    font-weight: bold;
    margin-top: 40px;
    img {
      width: 50px;
      height: 50px;
    }
    div {
      margin-left: 20px;
    }
  }
}
</style>
