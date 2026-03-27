<template>
  <!-- 首页顶部banner -->
  <div class="banner">
    <div class="nav" @click="go_about">返回主页</div>
    <!-- <img class="logo" src="../assets/logo.png" alt="" /> -->
    <div class="mask">
      <div>
        <div class="mask-text animated bounceInRight">
          Hello, I’ m Cheng Lei.
        </div>
        <p class="typer-dynamic">
          <span class="cut">
            Welcome to my website.
            <!-- <span class="word" v-for="(letter, index) in words" :key="index">
              {{
              letter
              }}
            </span>-->
          </span>
        </p>
      </div>
    </div>
  </div>
  <!-- 第二块 -->
  <div class="content">
    <home-list></home-list>
  </div>
  <!-- 第四块 -->
  <div class="info">
    <div class="info_bg"></div>
    <home-info></home-info>
  </div>
  <!-- 第三块 -->
  <div class="about">
    <home-about></home-about>
  </div>
  <!-- 公共底部 -->
  <home-foot :status="status"></home-foot>
  <!-- 回到顶部组件 -->
  <el-backtop style="width: 50px; height: 50px">
    <i style="font-size: 25px" class="el-icon-lightning"></i>
  </el-backtop>
</template>

<script>
import { reactive, toRefs, watch, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
//组件
import list from "../components/list.vue";
import foot from "../components/footer.vue";
import about from "../components/about.vue";
import info from "../components/info.vue";

export default {
  // 组件注册
  components: {
    "home-list": list,
    "home-foot": foot,
    "home-about": about,
    "home-info": info,
  },
  watch: {},
  setup() {
    const router = useRouter();
    const state = reactive({
      words: [], //字母数组push，pop的载体
      str: "The lonely time, will shape the strongest you!", //str初始化
      letters: [], //str分解后的字母数组
      order: 1, //表示当前是第几句话
      scrollNum: 0,
    });
    //关于页面跳转
    const go_about = () => {
      router.go(-1);
    };
    onMounted(() => {
      begin();
    });
    //开始输入的效果动画
    const begin = () => {
      state.letters = state.str.split("");
      for (var i = 0; i < state.letters.length; i++) {
        setTimeout(write(i), i * 100);
      }
    };
    const write = (i) => {
      return () => {
        let L = state.letters.length;
        state.words.push(state.letters[i]);
        let that = state;
        /*如果输入完毕，在2s后开始删除*/
        if (i == L - 1) {
          setTimeout(function () {
            back();
          }, 2000);
        }
      };
    };
    //擦掉(删除)字母
    const wipe = (i) => {
      return () => {
        state.words.pop(state.letters[i]);
        /*如果删除完毕，在300ms后开始输入*/
        if (state.words.length == 0) {
          state.order++;
          let that = state;
          setTimeout(function () {
            begin();
          }, 300);
        }
      };
    };
    //开始删除的效果动画
    const back = () => {
      let L = state.letters.length;
      for (var i = 0; i < L; i++) {
        setTimeout(wipe(i), i * 50);
      }
    };
    //组件传参实例
    const status = ref(state.scrollNum);
    return {
      status,
      begin,
      go_about,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped>
.nav {
  position: absolute;
  right: 150px;
  top: 50px;
  font-size: 20px;
  color: #e4e7ed;
  z-index: 9999;
  font-weight: bold;
  font-family: "宋体";
  cursor: pointer;
}
.nav:hover {
  text-decoration: underline;
}
.content {
  height: 100vh;
  background: url(../assets/home-about.png) no-repeat;
  background-size: 100% 100%;
}
.about {
  height: 100vh;
  background: #f5f5f5;
}
.typer {
  margin-top: 2%;
  box-sizing: border-box;
}
.typer .typer-content {
  font-weight: bold;
  font-size: 50px;
  display: flex;
  flex-direction: row;
  letter-spacing: 2px;
}
.typer-dynamic {
  position: relative;
  font-size: 40px;
  height: 60px;
  text-align: center;
}
.cut {
  color: skyblue;
}
.banner img {
  width: 100%;
  height: 100%;
}
.banner {
  width: 100%;
  height: 100vh;
  background: #ccc;
  position: relative;
  background: url(../assets/banner.jpg) repeat fixed;
  background-size: cover;
  background-position: center center;
}
.banner .logo {
  width: 120px;
  height: 80px;
}
.info_bg {
  width: 100%;
  height: 100vh;
  background: #ccc;
  position: relative;
  background: url(../assets/banner1.jpeg) repeat fixed;
  background-size: cover;
  background-position: center center;
  filter: blur(2px);
  position: absolute;
  z-index: 1;
}
.info {
  position: relative;
  height: 100vh;
}
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mask-text {
  font-size: 100px;
  color: #fff;
  font-weight: bold;
  text-align: center;
  margin-top: -20px;
  margin-bottom: 20px;
  margin-left: 50px;
}
</style>
