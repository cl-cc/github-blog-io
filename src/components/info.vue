<template>
  <div class="main">
    <div class="go_project" @click="toDetail">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      项目经历
    </div>
    <div class="title">学如逆水行舟 , 不进则退</div>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "info",
  setup() {
    //路由
    const router = useRouter();
    const state = reactive({});
    //跳转对应详情页面
    const toDetail = (i) => {
      router.push({ path: "/project" });
    };
    return {
      toDetail,
      ...toRefs(state),
    };
  },
};
</script>
<style lang='scss' scoped>
.title {
  font-size: 40px;
  color: #fff;
  font-family: cursive;
  text-align: center;
  padding-top: 300px;
}
.main {
  position: relative;
  z-index: 9999;
}
.go_project {
  width: 200px;
  text-align: center;
  margin-top: 50px;
  color: #fff;
  font-family: cursive;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  font-size: 34px;
  padding: 25px 30px;
  font-size: 34px;
  text-transform: uppercase;
  transition: 0.5s;
  letter-spacing: 4px;
  cursor: pointer;
  overflow: hidden;
  top: 400px;
  left: 800px;
}
.go_project:hover {
  background-color: #03e9f4;
  color: #050801;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 200px #03e9f4;
}
</style>