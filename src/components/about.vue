<template>
  <div class="main">
    <div :class="[top > 1300 ? 'animated fadeInLeftBig left1' : 'left']"></div>
    <div :class="[top > 1300 ? 'animated fadeInRightBig right1' : 'right']">
      <div class="title">Get in touch</div>
      <!-- <div class="remarke">今天最好的表现是明天最低的要求</div> -->
      <div class="center">
        Say Hi or find me on other platforms:
        <a href="https://blog.csdn.net/weixin_44255044" target="_blank">CSDN</a>
        & <a href="https://gitee.com/chenglei0221" target="_blank"> GITEE </a>
        <br />
        <span>Email:</span>1074443738@outlook.com
        <br />
        <span>WeChat:</span>13891353386
        <br />
        <span>QQ:</span>1074443738
        <br />
      </div>
      <i
        style="font-size: 50px; color: skyblue"
        class="el-icon-more-outline"
      ></i>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";

export default {
  setup() {
    const state = reactive({
      top: 0,
    });
    onMounted(() => {
      window.addEventListener(
        "scroll",
        () => {
          let top =
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop;
          state.top = top;
        },
        true
      );
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style scoped>
.right1 i {
  position: absolute;
  bottom: 50px;
  right: 100px;
}
.center span {
  color: #000;
}
.center a {
  color: #5e6271;
  text-decoration: underline;
}
.center {
  color: #5e6271;
  font-size: 24px;
  line-height: 40px;
  width: 80%;
  margin-left: 100px;
  margin-top: 50px;
}
.remarke {
  font-size: 16px;
  color: #4f9da6;
  margin-left: 100px;
}
.title {
  font-weight: bold;
  font-size: 56px;
  margin: 70px 0 10px 100px;
}
.main {
  width: 90%;
  height: 100%;
  margin: 0px auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.left {
  width: 600px;
  height: 700px;
  background: #fff;
  margin-left: 50px;
  background: url(../assets/home-cedie.jpg) no-repeat;
  background-size: 100% 100%;
  border-radius: 5px;
  display: none;
}
.left1 {
  width: 600px;
  height: 700px;
  background: #fff;
  margin-left: 50px;
  background: url(../assets/home-cedie.jpg) no-repeat;
  background-size: 100% 100%;
  border-radius: 5px;
  display: block;
}
.right {
  width: 1000px;
  height: 500px;
  background: #e4e7ed;
  margin-left: -150px;
  border-radius: 5px;
  display: none;
}
.right1 {
  width: 1000px;
  height: 500px;
  background: #e4e7ed;
  margin-left: -150px;
  position: relative;
  border-radius: 5px;
  display: block;
}
</style>