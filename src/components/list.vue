<template>
  <div class="main-home">
    <div class="main">
      <h1>About</h1>
      <div class="content-box">
        <span>您好，我叫程垒，家乡陕西，现在在杭州从事前端开发相关工作。</span>
        <div>
          <br />个人技能 <br />1、精通 HTML5、CSS3 能够高效构建 Web 前端项目与应用； <br />2、熟练使用 JavaScript、Jquery 实现页面中的交互效果；
          <br />3、熟悉响应式布局及前端响应式开发框架 Bootstrap； <br />4、熟练使用 Vue2.x 全家桶并有实际的项目开发经验,了解 React 和 Angular 框架基本语法规范；
          <br />5、使用过Vue3 + vite + ts开发过项目,对Vue3语法规范有一定的了解； <br />6、熟悉 Svn / Git 版本管理工具,微信小程序开发,Echarts,百度地图API数据可视化开发；
          <br />7、熟练掌握 Ajax,axios 与模板引擎和后端进行数据交互、拦截、实现动态渲染与页面部分刷新； <br />8、了解 TypeScript基本语法 和 Node.js,MongoDB 数据库;
        </div>
      </div>
      <div class="my animated tada"></div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from 'vue';
import axios from 'axios';
export default {
  setup() {
    const state = reactive({
      list: [],
      fadeInNum: Number,
    });
    //接口
    const dataList = () => {
      axios.get(`/api/v1/articles`).then(res => {
        if (res.code == 200) {
          state.list = res.data.lists;
        } else ElMessage.error(res.msg);
      });
    };

    onMounted(() => {
      dataList();
    });
    //鼠标滑过列表样式
    const mouseOver = i => {
      state.fadeInNum = i;
    };
    return {
      mouseOver,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped>
.my {
  width: 450px;
  height: 700px;
  background: url(../assets/my.jpg) no-repeat;
  background-size: 100% 100%;
  position: absolute;
  top: -20px;
  right: 0;
  transform: rotate(10deg) !important;
  z-index: 1;
}
.content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  line-height: 20px;
  font-size: 14px;
  font-family: 'cl';
}
.card-header span {
  font-size: 18px;
}
.main-home {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
h1 {
  font-size: 90px;
  margin-top: 30px;
  margin-bottom: 100px;
}
.content-box {
  font-size: 30px;
  line-height: 40px;
  font-family: 'cl';
  position: relative;
  z-index: 10;
}
.content-box > div {
  line-height: 45px;
  margin-top: 30px;
}
.main {
  width: 90%;
  height: 80vh;
  position: relative;
}
.main .list {
  width: 45%;
  height: 25%;
  cursor: pointer;
}
</style>
