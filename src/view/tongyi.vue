<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程垒 💻
 * @Date: 2025-02-11 09:11:46
 * @LastEditors: 程垒 💻
 * @LastEditTime: 2025-02-12 14:11:54
-->
<script setup lang="ts">
import OpenAI from 'openai';
const deepSeek = ref('');
//输出用户
const content = ref<string | any>('');
const contentLoading = ref(false);
const openai = new OpenAI({
  apiKey: 'sk-0dcb5fa61a7f4fb8ae3ae4afd2f84cdb',
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  dangerouslyAllowBrowser: true,
});
async function deepSeekFn() {
  if (!deepSeek.value) {
    return;
  }
  try {
    contentLoading.value = true;
    const completion = await openai.chat.completions.create({
      model: 'qwen-plus',
      messages: [
        {
          role: 'user',
          content: deepSeek.value,
        },
      ],
    });
    content.value = completion.choices[0].message.content;
    console.log(completion.choices[0].message.content);
  } catch (err) {
    content.value = err;
  } finally {
    contentLoading.value = false;
  }
}
const font = reactive({
  color: 'rgba(0, 0, 0, .15)',
});
</script>
<template>
  <div class="main">
    <el-watermark :gap="[250, 250]" element-loading-text="Loading..." element-loading-svg-view-box="-10, -10, 50, 50" element-loading-background="rgba(122, 122, 122, 0.8)" v-loading="contentLoading" :content="['cheng Lucky', '模型已全面升级为 tongyi-V3']" class="main-content" :font="font">
      <div v-html="content"></div>
    </el-watermark>
    <div class="deepseek_">
      <el-input @keyup.enter="deepSeekFn" class="ipt" v-model="deepSeek" placeholder="来问我吧!" clearable>
        <template #prefix>
          <el-icon class="el-input__icon"><Search /></el-icon>
        </template>
      </el-input>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  &-content {
    width: 90%;
    height: 85%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: auto;
    padding: 20px;
    margin-top: 2%;
  }
  .deepseek_ {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: fixed;
    bottom: 3%;
  }
  .ipt {
    border: none;
    height: 50px;
    font-size: 18px;
  }
  .btn {
    margin-left: 2%;
  }
}
</style>
