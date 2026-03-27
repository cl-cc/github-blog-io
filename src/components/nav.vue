<template>
  <el-affix>
    <div class="nav">
      <div
        v-for="(item,index) in listNav"
        @click="activeOn(index)"
        :class="[num == index?'active animated pulse':'']"
        :key="index"
      >
        <router-link :to="item.url">{{item.text}}</router-link>
      </div>
    </div>
  </el-affix>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  setup() {
    const state = reactive({
      listNav: [
        { text: "首页", url: "/" },
        { text: "博客文章", url: "/about" },
      ],
      num: 1,
    });
    //导航点击事件
    const activeOn = (i) => {
      state.num = i;
    };
    return {
      activeOn,
      ...toRefs(state),
    };
  },
};
</script>

<style scoped>
.nav {
  width: 100%;
  height: 50px;
  background: url(../assets/nav.png);
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.nav div {
  width: 100px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  cursor: pointer;
}
.active {
  background: #91640f;
}
a {
  display: block;
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}
</style>