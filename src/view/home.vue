<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2022-11-09 13:17:39
 * @LastEditors: 程
 * @LastEditTime: 2025-07-11 17:51:19
-->
<template>
  <div class="home">
    <div class="name">123</div>
    <div class="tips">123</div>
    <div class="btn" @click="to">
      <div>123</div>
      <el-icon><FolderRemove /></el-icon>
    </div>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(['go']);
// 跳转
function to() {
  emit('go', 2);
}
</script>
<style lang="scss" scoped>
.home {
  width: 1000px;
  height: 200px;
  // margin-left: 5%;
  // position: relative;
}
</style>
