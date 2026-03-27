<template>
  <!-- 遮盖 -->
  <div class="bg_mask"></div>
  <div class="main" :class="!show ? 'bg_active' : ''">
    <!-- 登录窗口 -->
    <div class="login-box" v-show="show">
      <div class="login-title">登录</div>
      <div class="login_ipt">
        <input placeholder="请输入账号" type="text" v-model="loginData.user_name" />
        <input placeholder="请输入密码" type="password" v-model="loginData.user_password" />
      </div>
      <div class="login-btn" @click="login">登录 / 注册</div>
    </div>
    <!-- 聊天窗口 -->
    <div class="chat-box" v-show="!show">
      <header>当前聊天室人数：{{ count }} 人</header>
      <!-- id="message-list" -->
      <div class="msg-box" ref="msg_box">
        <div v-for="(i, index) in list" :key="index" class="msg" :style="i.userId == userId ? 'flex-direction:row-reverse' : ''">
          <div class="user-head">
            <div
              class="head"
              :style="`background: hsl(${getUserHead(i.userId, 'bck')}, 88%, 62%); clip-path:polygon(${getUserHead(
                i.userId,
                'polygon'
              )}% 0,100% 100%,0% 100%); transform: rotate(${getUserHead(i.userId, 'rotate')}deg)`"
            ></div>
          </div>
          <div class="user-msg">
            <span :style="i.userId == userId ? 'float:right' : ''" :class="i.userId == userId ? 'right' : 'left'">{{ i.content }}</span>
          </div>
        </div>
      </div>
      <div class="input-box">
        <input type="text" ref="sendMsg" v-model="contentText" @keyup.enter="sendText()" />
        <div class="btn" :class="{ ['btn-active']: contentText }" @click="sendText()">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onUpdated, onMounted, ref } from 'vue';
import { ElMessage, ElNotification } from 'element-plus';
import axios from '@/utils/axios';
export default {
  setup() {
    const msg_box = ref(null);
    const state = reactive({
      ws: null, //ws
      count: 0, //总人数
      userId: null, //当前用户ID
      list: [], //聊天记录的数组
      contentText: '', //input输入的值
      loginData: {
        user_name: '',
        user_password: '',
      }, //登录数据
      show: true, //登录切换
      token: '', //后端需要参数token
    });
    //这里处理对方消息弹出
    onUpdated(() => {
      //等待进入聊天窗口后再进行调用
      if (!state.show) {
        let ele = msg_box.value;
        ele.scrollTop = ele.scrollHeight;
      }
    });
    //页面挂载
    onMounted(() => {});
    //登录
    const login = () => {
      let httpOption = axios.post;
      let params = {
        ...state.loginData,
      };
      httpOption('/login', params).then(res => {
        console.log(res);
        if (res.status) {
          state.show = false;
          state.token = res.token;
          //等待进入聊天界面后再进行连接服务器
          initWebSocket();
          getUserID();
        } else ElMessage.error(res.reason);
      });
    };
    //根据时间戳作为当前用户ID
    const getUserID = () => {
      let time = new Date().getTime();
      state.userId = time;
    };
    //根据userID生成一个随机头像
    const getUserHead = (id, type) => {
      let ID = String(id);
      if (type == 'bck') return Number(ID.substring(ID.length - 3));
      if (type == 'polygon') return Number(ID.substring(ID.length - 2));
      if (type == 'rotate') return Number(ID.substring(ID.length - 3));
    };
    //滚动条到底部
    const scrollBottm = () => {
      let el = msg_box.value;
      el.scrollTop = el.scrollHeight;
    };
    //发送聊天信息
    const sendText = () => {
      msg_box.value.focus();
      if (!state.contentText) {
        return;
      }
      //发送给后台的参数
      let params = {
        userId: state.userId,
        msg: state.contentText,
        token: `token@@@${state.token}`,
      };
      //发送
      state.ws.send(JSON.stringify(params)); //调用WebSocket send()发送信息的方法
      state.contentText = '';
      setTimeout(() => {
        scrollBottm();
      }, 500);
    };
    //进入页面创建websocket连接
    const initWebSocket = () => {
      //判断页面有没有存在websocket连接
      if (window.WebSocket) {
        // 此处的 :8181 端口号 要与后端配置的一致
        let ws = new WebSocket('ws://192.168.5.42:9502');
        // let ws = new WebSocket("ws://192.168.5.8:8181");
        state.ws = ws;
        ws.onopen = function (e) {
          ElNotification({
            title: '成功',
            message: '服务器连接成功',
            type: 'success',
          });
        };
        ws.onclose = function (e) {
          ElNotification({
            title: '关闭',
            message: '服务器连接关闭',
            type: 'info',
          });
        };
        ws.onerror = function () {
          ElNotification({
            title: '出错',
            message: '服务器连接出错',
            type: 'error',
          });
        };
        ws.onmessage = function (e) {
          //接收服务器返回的数据
          if (e.data == '进入聊天室') return false;
          else {
            let resData = JSON.parse(e.data);
            if (resData.funName == 'userCount') {
              state.count = resData.userCount;
              state.list = resData.chat;
            } else {
              state.list = [
                ...state.list,
                {
                  userId: resData.userId,
                  content: resData.msg,
                },
              ];
            }
          }
        };
      }
    };
    return {
      msg_box,
      sendText,
      getUserHead,
      login,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'cl';
  // src: url(../assets/1.ttf);
}
.bg_active {
  background: url(../assets/massage_bg.png) !important;
}
.bg_mask {
  background: #b8e5f8;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
.main {
  width: 100%;
  height: 90vh;
  background: url(../assets/login-bg.png);
  padding-top: 100px;
  position: relative;
  z-index: 2;
  .login-box {
    width: 500px;
    height: 300px;
    background: #fafafa;
    border-radius: 5px;
    margin: 150px auto;
    box-shadow: 0px 10px 16px rgb(211, 208, 208);
    .login-title {
      width: 70px;
      font-family: 'cl';
      font-size: 26px;
      font-weight: bold;
      padding: 20px 0 10px 20px;
      margin-left: 20px;
      border-bottom: 4px solid #06f;
    }
  }
  .login_ipt {
    width: 91%;
    margin: 0 auto;
    margin-top: 20px;
    input {
      display: block;
      border: none;
      outline: none;
      background: none;
      width: 100%;
      height: 50px;
      font-size: 18px;
      font-family: 'cl';
      border-bottom: 1px solid #ccc;
      margin-bottom: 20px;
    }
  }
  .login-btn {
    width: 60%;
    height: 40px;
    line-height: 40px;
    font-family: 'cl';
    font-size: 16px;
    color: #fff;
    margin: 0 auto;
    background: #06f;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
  }
  .login-btn:hover {
    background: rgb(28, 119, 255);
  }
}
.chat-box {
  position: relative;
  margin: 0 auto;
  background: #fafafa;
  width: 800px;
  height: 700px;
  box-shadow: 0px 10px 26px rgb(211, 208, 208);
  border-radius: 5px;
  font-family: 'cl';
  header {
    width: 800px;
    height: 50px;
    background: #409eff;
    font-family: 'cl';
    // max-width: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 18px;
    border-radius: 5px 5px 0 0;
  }
  .msg-box {
    position: absolute;
    width: 800px;
    height: 600px;
    overflow-y: scroll;
    .msg {
      width: 95%;
      min-height: 25px;
      margin: 20px 10px;
      position: relative;
      display: flex;
      justify-content: flex-start !important;
      .user-head {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #f1f1f1;
        display: flex;
        justify-content: center;
        align-items: center;
        .head {
          width: 20px;
          height: 20px;
        }
        // position: absolute;
      }
      .user-msg {
        width: 80%;
        // position: absolute;
        word-break: break-all;
        position: relative;
        z-index: 5;
        margin-left: 10px;
        margin-right: 10px;
        span {
          display: inline-block;
          padding: 20px 15px;
          border-radius: 10px;
          margin-top: 10px;
          font-size: 16px;
        }
        .left {
          background: white;
          animation: toLeft 0.5s ease both 1;
        }
        .right {
          background: #53a8ff;
          color: white;
          animation: toright 0.5s ease both 1;
        }
        @keyframes toLeft {
          0% {
            opacity: 0;
            transform: translateX(-10px);
          }
          100% {
            opacity: 1;
            transform: translateX(0px);
          }
        }
        @keyframes toright {
          0% {
            opacity: 0;
            transform: translateX(10px);
          }
          100% {
            opacity: 1;
            transform: translateX(0px);
          }
        }
      }
    }
  }
  .input-box {
    position: absolute;
    bottom: 0;
    width: 800px;
    box-shadow: 0 0 5px #ccc;
    display: flex;
    align-items: center;
    font-family: 'cl';
    input {
      height: 40px;
      display: inline-block;
      width: 650px;
      padding: 5px;
      border: none;
      border-radius: 10px;
      font-size: 26px;
      padding-left: 10px;
      outline: none;
      font-family: 'cl';
    }
    .btn {
      width: 150px;
      height: 40px;
      background: #e0e0e0;
      padding: 5px;
      font-size: 26px;
      color: white;
      text-align: center;
      margin-left: 10px;
      transition: 0.5s;
      line-height: 40px;
    }
    .btn-active {
      background: #409eff;
    }
  }
}
</style>
