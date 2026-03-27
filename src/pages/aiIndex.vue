<!--
 * @Descripttion: 
 * @version: 
 * @Author: 程
 * @Date: 2025-02-12 09:49:53
 * @LastEditors: 程
 * @LastEditTime: 2026-01-13 09:46:31
-->
<script setup lang="ts">
import { ref } from 'vue';
import OpenAI from 'openai';
import { CircleClose } from '@element-plus/icons-vue';
import aiInput from './AIinput.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import Typed from 'typed.js';
import { onMounted, watch, nextTick } from 'vue';
const aiInputRef = ref<any>(null);
//ai
const openai = new OpenAI({
  apiKey: 'sk-0dcb5fa61a7f4fb8ae3ae4afd2f84cdb',
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  dangerouslyAllowBrowser: true,
});
// 挂载时初始化 Typed
onMounted(() => {
  const options = {
    strings: [
      '当前模型已全面升级为 DeepSeek-V3',
      '有什么可以帮到您的吗？',
      '请问今天需要什么帮助?',
      '我可以为您解答什么问题？',
      '欢迎回来！今天想聊点什么？',
      '请告诉我您的需求，我来帮您！',
      '有什么问题尽管问，我随时待命！',
      '一起探索点什么新鲜事吧？',
      '需要我为您提供什么信息？',
      '想聊聊什么？我在这儿听着！',
      '请问有什么可以为您效劳的？',
    ],
    typeSpeed: 80,
    backSpeed: 50,
    loop: true,
    showCursor: false,
    backDelay: 1500,
  };
  new Typed('#typedDom', options);
});
const go = (e: number) => {
  switch (e) {
    case 1:
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
const loading = ref(false);
const contentText = ref('');
const contentSet = async (e: string) => {
  if (e === '') return;
  loading.value = true;
  contentText.value = e;
  messages.value.push({ text: e, isUser: true, id: null });
  const MAX_HISTORY = 10;
  const history = messages.value.slice(-MAX_HISTORY).map(item => ({
    role: item.isUser ? ('user' as const) : ('assistant' as const),
    content: item.text,
  }));
  const completion = await openai.chat.completions.create({
    model: 'qwen-plus',
    messages: [
      {
        role: 'system' as const,
        content: '你是一个专业的前端架构师，用简洁中文回答',
      },
      ...history,
    ],
  });
  const currentBotMessageIndex = botMessageIndex.value;
  messages.value.push({ text: completion.choices[0].message.content as string, isUser: false, id: `botMessageId-${currentBotMessageIndex}` });
  aiInputRef.value.clearInput();
  await nextTick();
  const botMessageId = `botMessageId-${currentBotMessageIndex}`;
  const botMessageElement = document.getElementById(botMessageId);
  if (botMessageElement) {
    const observer = new MutationObserver(() => {
      scrollToBottom();
    });
    observer.observe(botMessageElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    const messageLength = messages.value[messages.value.length - 1].text.length;
    setTimeout(() => {
      observer.disconnect();
      scrollToBottom(true);
    }, messageLength * 20 + 500);
    botMessageIndex.value++;
  }
  loading.value = false;
};
// 存储聊天消息的数组
const messages = ref<{ text: string; isUser: boolean; id: string | any }[]>([]);
// 聊天消息区域的 ref
const chatMessagesRef = ref<HTMLDivElement | null>(null);
// 滚动到底部的函数
const scrollToBottom = (smooth = false) => {
  nextTick(() => {
    if (chatMessagesRef.value) {
      // 使用 scrollTo 方法确保滚动到底部
      chatMessagesRef.value.scrollTo({
        top: chatMessagesRef.value.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
  });
};
// 监听消息列表的变化
watch(
  messages,
  async () => {
    await nextTick();
    scrollToBottom();
  },
  { deep: true }
);
// 关闭聊天框
const closeEvent = () => {
  messages.value = [];
};
const botMessageIndex = ref(0);
</script>
<template>
  <div class="main">
    <div class="bgline bg-no-repeat bg-cover"></div>
    <div class="header flex items-center justify-around">
      <img class="logo" src="../assets/newLogo.png" alt="" />
      <div class="flex nav">
        <p @click="go(3)">GitHub</p>
        <p @click="go(2)">Csdn</p>
        <p @click="go(4)">前端工具</p>
      </div>
    </div>
    <div class="h-max" v-show="messages.length">
      <div class="message-box" ref="chatMessagesRef" v-loading="loading" element-loading-text="模型加载中..." element-loading-background="rgba(0, 0, 0, 0.2)">
        <el-icon color="#409efc" @click="closeEvent" class="close" :size="25"><CircleClose /></el-icon>
        <div v-for="(message, index) in messages" :key="index" :class="message.isUser ? 'user-message' : 'bot-message'">
          <div class="message-content" v-if="message.isUser">{{ message.text }}</div>
          <div class="message-content" v-else :id="message.id"></div>
        </div>
      </div>
    </div>
    <div class="h-max" v-show="!messages.length">
      <div id="typedDom" class="cc"></div>
    </div>
    <div>
      <aiInput ref="aiInputRef" @send-content="contentSet" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #050505;
  .bgline {
    width: 100%;
    height: 100%;
    background-image: url(../assets/bgline.svg);
    position: absolute;
    top: 0;
    left: 12%;
  }
  .header {
    width: 100%;
    height: 100px;
    background: #050505;
    display: flex;
    justify-content: left;
    .logo {
      width: 200px;
      height: 200px;
      margin-left: 5%;
      margin-top: 2%;
    }
    .nav {
      margin-left: 2%;
      color: #fff;
      display: flex;
      line-height: 230px;
      height: 200px;
      font-size: 20px;
      width: 250px;
      justify-content: space-between;
      position: relative;
      z-index: 1;
      p {
        cursor: pointer;
      }
      p:hover {
        color: #ccc;
        text-decoration: underline;
      }
    }
  }
  .h-max {
    height: 75%;
    border: 1px solid #050505;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2%;

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 10px;
    }
    .user-message,
    .bot-message {
      display: flex;
      margin-bottom: 10px;
    }
    .user-message {
      justify-content: flex-end;
    }
    .bot-message {
      justify-content: flex-start;
    }
    .message-content {
      background: rgba(33, 33, 33, 1);
      box-sizing: border-box;
      padding: 5px 15px;
      border-radius: 10px;
      text-align: left;
    }
    .cc {
      font-family: 'Yuanti SC';
      color: var(--home-text-color, #333);
      font-size: 20px;
    }
    .message-box {
      width: 60%;
      height: 100%;
      background: rgba(33, 33, 33, 0.5);
      position: relative;
      z-index: 2;
      box-sizing: border-box;
      padding: 30px 40px;
      border-radius: 10px;
      padding-top: 60px;
      font-size: 16px;
      color: #ececec;
      overflow-y: auto;
      overflow-x: hidden;
      scroll-behavior: smooth;
      position: relative;
      .close {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
      }
    }
  }
  #typedDom {
    color: white;
    font-size: 50px;
    font-weight: 700;
    text-align: center;
    // margin-top: 10%;
    position: relative;
    z-index: 999;
  }
}
</style>
