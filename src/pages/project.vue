<template>
  <div class="main">
    <div class="nav">
      <div class="go_project" @click="go_home">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        返回主页
      </div>
      <div class="nav_title">项目经历</div>
      <div class="nav_tips">Project experience</div>
      <div class="nav_list">
        <div
          class="nav_tab"
          :class="[active == item.id ? 'nav_active' : '']"
          v-for="(item, index) in list"
          :key="index"
          @click="to_active(item.id)"
        >
          <img src="../assets/project_icon.png" alt="" />
          <div>{{ item.val }}</div>
        </div>
      </div>
    </div>
    <div class="show">
      <div v-show="active == 1">
        <div class="show_main">
          <el-card class="box-card"
            >智慧农贸SAAS管理平台 - 项目简介 (2021.03 - 至今)</el-card
          >
          <el-card class="box-card_ul">
            <ul>
              <li>项目参与程度 : <span>70%;</span></li>
              <li>开发技术 : HTML + less + element-ui + Vue3.x/cli + axios;</li>
              <li>
                项目描述 :
                针对智慧化农贸市场(单个市场/全部市场)交易金额,市场管理,商户信息,安全追溯,商户信用评比,会员管理,市场监控和系统管理等;
              </li>
              <div style="margin-top: 20px; line-height: 30px">
                项目职责 <br />
                1、根据设计稿，完成设计图，实现前端页面；<br />
                2、vue-cli搭建项目,配置axios,接口统一管理,页面主要部分布局;<br />
                3、通过 element-ui 进行前台视图层的渲染；<br />
                4、使用 vue-router 进行路由配置及渲染；<br />
                5、使用Echarts数据可视化统计商户信息/金额/交易;<br />
                6、使用ckPlayer对接萤石云/海康监控市场到平台上;
              </div>
            </ul>
          </el-card>
          <img src="../assets/i.png" alt="" />
          <img src="../assets/i1.png" alt="" />
        </div>
      </div>
      <div v-show="active == 2">
        <div class="show_main">
          <el-card class="box-card"
            >农贸市场综合监管平台 - 项目简介 (2020.09 - 至今)</el-card
          >
          <el-card class="box-card_ul">
            <ul>
              <li>项目参与程度 : <span>40%;</span></li>
              <li>开发技术 : HTML + css/css3 + element-ui + Vue2.x + axios;</li>
              <li style="line-height: 30px">
                项目描述 :
                智慧农贸省市区监管平台是应用云计算、大数据、物联网技术，基于智慧农贸信息化管理平台基础上对所管辖区内的农贸市场的市场信息、市场分布、市场摊位、市场商户进行监管以及对农贸市场农产品安全监管，食品安全溯源；同时对于各个市场的信息发布、智能监控、数据分析的一个现代化综合信息监管平台;
              </li>
              <div style="margin-top: 20px; line-height: 30px">
                项目职责 <br />
                1、根据设计稿，完成设计图，实现前端页面；<br />
                2、vue-cli搭建项目,配置axios,接口统一管理,页面主要部分布局;<br />
                3、通过 element-ui 进行前台视图层的渲染；<br />
                4、使用 vue-router 进行路由配置及渲染；<br />
                5、使用Echarts数据可视化统计监管商户/任务情况/摊位等功能;<br />
                6、使用ckPlayer对接萤石云/海康监控市场到平台上;
              </div>
            </ul>
          </el-card>
          <img src="../assets/i2.png" alt="" />
          <img src="../assets/i4.png" alt="" />
        </div>
      </div>
      <div v-show="active == 3">
        <div class="show_main">
          <el-card class="box-card"
            >全国农贸市场大数据可视化 - 项目简介 (2021.2 - 2021.2)</el-card
          >
          <el-card class="box-card_ul">
            <ul>
              <li>项目参与程度 : <span>100%;</span></li>
              <li>开发技术 : HTML + css/css3 + element-ui + Vue2.x + axios;</li>
              <li style="line-height: 30px">
                项目描述 : 针对全国农贸市场统计平面可视化数据屏
              </li>
              <div style="margin-top: 20px; line-height: 30px">
                项目职责 <br />
                1、根据设计稿，完成设计图，实现前端页面；<br />
                2、vue-cli搭建项目,配置axios,接口统一管理,页面主要部分布局;<br />
                3、通过 element-ui 进行前台视图层的渲染；<br />
                4、主要使用Echarts数据可视化完成大部分功能;
              </div>
            </ul>
          </el-card>
          <img src="../assets/i3.jpg" alt="" />
          <img src="../assets/i5.png" alt="" />
        </div>
      </div>
      <div v-show="active == 4">
        <div class="show_main">
          <el-card class="box-card"
            >衢州市农贸市场大数据中心 - 项目简介 (2021.5 - 2021.5)</el-card
          >
          <el-card class="box-card_ul">
            <ul>
              <li>项目参与程度 : <span>100%;</span></li>
              <li>开发技术 : HTML + css/css3 + element-ui + Vue2.x + axios;</li>
              <li style="line-height: 30px">
                项目描述 : 定制化开发衢州市场数据可视化大数据屏;
              </li>
              <div style="margin-top: 20px; line-height: 30px">
                项目职责 <br />
                1、根据设计稿，完成设计图，实现前端页面；<br />
                2、vue-cli搭建项目,配置axios,接口统一管理,页面主要部分布局;<br />
                3、通过 element-ui 进行前台视图层的渲染；<br />
                4、主要使用Echarts数据可视化完成大部分功能;<br />
                5、使用ckPlayer对接萤石云/海康监控市场到数据屏上;
              </div>
            </ul>
          </el-card>
          <img src="../assets/i6.png" alt="" />
          <img src="../assets/i8.png" alt="" />
        </div>
      </div>
      <div v-show="active == 5">
        <div class="show_main">
          <el-card class="box-card"
            >萧山市场服务驾驶舱 - 项目简介 (2021.8 - 2021.8)</el-card
          >
          <el-card class="box-card_ul">
            <ul>
              <li>项目参与程度 : <span>100%;</span></li>
              <li>开发技术 : HTML + css/css3 + element-ui + Vue2.x + axios;</li>
              <li style="line-height: 30px">
                项目描述 : 定制化开发萧山各个农贸市场的可视化方案;
              </li>
              <div style="margin-top: 20px; line-height: 30px">
                项目职责 <br />
                1、根据设计稿，完成设计图，实现前端页面；<br />
                2、vue-cli搭建项目,配置axios,接口统一管理,页面主要部分布局;<br />
                3、通过 element-ui 进行前台视图层的渲染；<br />
                4、主要使用Echarts数据可视化完成大部分功能;
              </div>
            </ul>
          </el-card>
          <img src="../assets/i7.png" alt="" />
          <img src="../assets/i9.png" alt="" />
        </div>
      </div>
      <div v-show="active == 6">
        <div class="show_main">
          <el-card class="box-card"
            >民鲲控股(官网) - 项目简介 (2021.9 - 2021.11)</el-card
          >
          <el-card class="box-card_ul">
            <ul>
              <li>项目参与程度 : <span>70%;</span></li>
              <li>开发技术 : HTML + css/css3 + ajax + jquery + layui;</li>
              <li style="line-height: 30px">
                项目描述 : 为民鲲控股公司自己研发的门户网站;
              </li>
              <div style="margin-top: 20px; line-height: 30px">
                项目职责 <br />
                1、根据设计稿，完成设计图，实现前端页面；<br />
                2、使用原生 html5 + css3 进行编写;<br />
                3、通过 layui + jquery 进行页面交互以及操作dom元素的交互；<br />
                4、数据渲染为前后端不分离形式渲染,配合后端进行交互调整;
              </div>
            </ul>
          </el-card>
          <img src="../assets/i10.png" alt="" />
          <img src="../assets/i11.png" alt="" />
        </div>
      </div>
      <div v-show="active == 7">
        <div class="show_main">
          <el-card class="box-card"
            >萧山政务-触摸屏(嵌套安卓程序) - 项目简介 (2021.11 -
            2021.12)</el-card
          >
          <el-card class="box-card_ul">
            <ul>
              <li>项目参与程度 : <span>100%;</span></li>
              <li>开发技术 : HTML + css/css3 + vue2.x + axios;</li>
              <li style="line-height: 30px">
                项目描述 : 提供萧山政务安卓触摸查询机嵌套H5开发;
              </li>
              <div style="margin-top: 20px; line-height: 30px">
                项目职责 <br />
                1、根据设计稿，完成设计图，实现前端页面；<br />
                2、vue-cli搭建项目,配置axios,接口统一管理,页面主要部分布局;<br />
                3、通过 element-ui 进行前台视图层的渲染；<br />
                4、处理嵌套安卓盒子部分报错问题;
              </div>
            </ul>
          </el-card>
          <div style="display: flex; justify-content: space-evenly">
            <img
              style="height: 1200px; width: 600px"
              src="../assets/i12.png"
              alt=""
            />
            <img
              style="height: 1200px; width: 600px"
              src="../assets/i13.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div v-show="active == 8">
        <div class="show_main">
          <el-card class="box-card"
            >泰州市监管(小程序) - 项目简介 (2021.4 - 至今)</el-card
          >
          <el-card class="box-card_ul">
            <ul>
              <li>项目参与程度 : <span>100%;</span></li>
              <li>开发技术 : WXML + wxss + js;</li>
              <li style="line-height: 30px">
                项目描述 : 根据泰州市政府监管平台对应小程序项目;
              </li>
              <div style="margin-top: 20px; line-height: 30px">
                项目职责 <br />
                1、根据设计稿，完成设计图，实现前端页面；<br />
                2、原声小程序搭建项目,配置axios,接口方法统一管理;<br />
                3、通过原生css/css3进行页面绘制,js交互和原生组建编写；<br />
              </div>
            </ul>
          </el-card>
          <div style="display: flex; justify-content: space-evenly">
            <img
              style="height: 1200px; width: 600px"
              src="../assets/i14.png"
              alt=""
            />
            <img
              style="height: 1200px; width: 600px"
              src="../assets/i15.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div v-show="active == 9">
        <div class="show_main">
          <el-card class="box-card"
            >林鲲智慧市场(小程序) - 项目简介 (2020.9 - 至今)</el-card
          >
          <el-card class="box-card_ul">
            <ul>
              <li>项目参与程度 : <span>70%;</span></li>
              <li>开发技术 : WXML + wxss + js;</li>
              <li style="line-height: 30px">
                项目描述 :
                该小程序主要针对商户管理/市场管理定制开发,主要功能,查询商品具体单价,商品检测结果,交易明细,消息通知,溯源追溯,商户个人信息摊位等功能;
              </li>
              <div style="margin-top: 20px; line-height: 30px">
                项目职责 <br />
                1、根据设计稿，完成设计图，实现前端页面自适应；<br />
                2、原生小程序搭建项目,根据ui设计图进行静态页面绘制;<br />
                3、通过安装axios进行数据的对接,后台数据更改,小程序实时更新渲染；<br />
              </div>
            </ul>
          </el-card>
          <div style="display: flex; justify-content: space-evenly">
            <img
              style="height: 1200px; width: 600px"
              src="../assets/i16.png"
              alt=""
            />
            <img
              style="height: 1200px; width: 600px"
              src="../assets/i17.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div v-show="active == 10">
        <div class="show_main">
          <el-card class="box-card"
            >环强垃圾回收(小程序) - 项目简介 (2020.9 - 至今)</el-card
          >
          <el-card class="box-card_ul">
            <ul>
              <li>项目参与程度 : <span>100%;</span></li>
              <li>开发技术 : WXML + wxss + js;</li>
              <li style="line-height: 30px">
                项目描述 :
                该小程序主要针对实时对垃圾回收方面/用户可以直接预约垃圾回收类型,然后平台派送对应人员去安排取货投递等;
              </li>
              <div style="margin-top: 20px; line-height: 30px">
                项目职责 <br />
                1、根据设计稿，完成设计图，实现前端页面自适应；<br />
                2、原生小程序搭建项目,根据ui设计图进行静态页面绘制;<br />
                3、通过安装
                axios进行数据的对接,后台数据更改,小程序实时更新渲染；<br />
              </div>
            </ul>
          </el-card>
          <div style="display: flex; justify-content: space-evenly">
            <img
              style="height: 1200px; width: 600px"
              src="../assets/i18.png"
              alt=""
            />
            <img
              style="height: 1200px; width: 600px"
              src="../assets/i19.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "project",
  setup() {
    //路由
    const router = useRouter();
    const state = reactive({
      list: [
        {
          val: "智慧农贸SAAS管理平台",
          url: "../assets/project_icon.png",
          id: 1,
        },
        {
          val: "农贸市场综合监管平台",
          url: "../assets/project_icon1.png",
          id: 2,
        },
        {
          val: "全国农贸市场数据可视化",
          url: "../assets/project_icon1.png",
          id: 3,
        },
        {
          val: "衢州市农贸市场数据中心",
          url: "../assets/project_icon1.png",
          id: 4,
        },
        {
          val: "萧山市场服务驾驶舱",
          url: "../assets/project_icon1.png",
          id: 5,
        },
        {
          val: "民鲲控股-官网",
          url: "../assets/project_icon1.png",
          id: 6,
        },
        {
          val: "萧山政务-触摸屏",
          url: "../assets/project_icon1.png",
          id: 7,
        },
        {
          val: "泰州市监管-小程序",
          url: "../assets/project_icon1.png",
          id: 8,
        },
        {
          val: "林鲲智慧市场-小程序",
          url: "../assets/project_icon1.png",
          id: 9,
        },
        {
          val: "环强垃圾回收-小程序",
          url: "../assets/project_icon1.png",
          id: 10,
        },
      ],
      active: 1,
    });
    const to_active = (id) => {
      state.active = id;
      window.scrollTo(0, 0);
    };
    const go_home = () => {
      router.go(-1);
    };
    return {
      go_home,
      to_active,
      ...toRefs(state),
    };
  },
};
</script>
<style lang='scss' scoped>
.main {
  width: 100%;
  height: 100vh;
  display: flex;
  .nav {
    width: 15%;
    height: 100%;
    background: rgb(243, 246, 249);
    text-align: center;
    overflow: scroll;
    .nav_title {
      width: 200px;
      height: 50px;
      border: 1px solid #ccc;
      border-radius: 5px;
      text-align: center;
      line-height: 50px;
      font-size: #333;
      font-weight: bold;
      font-size: 18px;
      margin: 0 auto;
      margin-top: 50px;
    }
    .nav_tips {
      font-size: 14px;
      color: rgb(180, 173, 173);
      margin-top: 20px;
    }
    .nav_list {
      width: 100%;
      text-align: center;
    }
    .nav_tab {
      padding: 25px 30px;
      color: #03e9f4;
      font-size: 24px;
      text-transform: uppercase;
      transition: 0.5s;
      letter-spacing: 4px;
      cursor: pointer;
    }
    .nav_tab:hover {
      background-color: rgb(175, 208, 235);
      color: #050801;
      box-shadow: 0 0 5px rgb(175, 208, 235), 0 0 25px rgb(175, 208, 235),
        0 0 50px rgb(175, 208, 235), 0 0 200px rgb(175, 208, 235);
    }
    .nav_active {
      background-color: rgb(175, 208, 235);
      color: #050801;
      box-shadow: 0 0 5px rgb(175, 208, 235), 0 0 25px rgb(175, 208, 235),
        0 0 50px rgb(175, 208, 235), 0 0 200px rgb(175, 208, 235);
    }
    .nav_tab:first-child {
      margin-top: 50px;
    }
    .nav_tab {
      height: 100px;
      padding-bottom: 10px;
      padding-top: 20px;
      margin-top: 10px;
      img {
        width: 60px;
        height: 60px;
      }
      div {
        font-size: 16px;
        color: #333;
        margin-top: 10px;
      }
    }
  }
  .show {
    width: 85%;
    height: 100%;
    background: rgb(74, 152, 216);
    display: flex;
    justify-content: center;
    overflow: scroll;
    .show_main {
      width: 1400px;
      height: 700px;
      margin: 20px;
      .box-card {
        margin: 20px 0;
        font-weight: bold;
        font-size: 16px;
      }
      .box-card_ul {
        font-size: 18px;
        font-family: "cl";
        font-weight: bold;
        margin: 20px 0;
        li {
          margin: 10px 0px;
          span {
            font-family: "";
            font-weight: bold;
          }
        }
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        margin-bottom: 20px;
      }
    }
  }
}
.go_project {
  padding: 25px 30px;
  color: plum;
  font-size: 24px;
  text-transform: uppercase;
  transition: 0.5s;
  letter-spacing: 4px;
  cursor: pointer;
  overflow: hidden;
}
.go_project div {
  position: absolute;
}
.go_project div:nth-child(1) {
  width: 100%;
  height: 2px;
  top: 0;
  left: -100%;
  background: linear-gradient(to right, transparent, #e6a23c);
  animation: animate1 1s linear infinite;
}
.go_project div:nth-child(2) {
  width: 2px;
  height: 100%;
  top: -100%;
  right: 0;
  background: linear-gradient(to bottom, transparent, #67c23a);
  animation: animate2 1s linear infinite;
  animation-delay: 0.25s;
}
.go_project div:nth-child(3) {
  width: 100%;
  height: 2px;
  bottom: 0;
  right: -100%;
  background: linear-gradient(to left, transparent, #f56c6c);
  animation: animate3 1s linear infinite;
  animation-delay: 0.5s;
}
.go_project div:nth-child(4) {
  width: 2px;
  height: 100%;
  bottom: -100%;
  left: 0;
  background: linear-gradient(to top, transparent, #909399);
  animation: animate4 1s linear infinite;
  animation-delay: 0.75s;
}
@keyframes animate1 {
  0% {
    left: -100%;
  }
  50%,
  100% {
    left: 100%;
  }
}
@keyframes animate2 {
  0% {
    top: -100%;
  }
  50%,
  100% {
    top: 100%;
  }
}
@keyframes animate3 {
  0% {
    right: -100%;
  }
  50%,
  100% {
    right: 100%;
  }
}
@keyframes animate4 {
  0% {
    bottom: -100%;
  }
  50%,
  100% {
    bottom: 100%;
  }
}

.go_project {
  width: 200px;
  height: 30px;
  text-align: center;
  margin-top: 50px;
  color: rgb(81, 207, 94);
  font-family: "";
  font-weight: bold;
  cursor: pointer;
  font-size: 34px;
  padding: 25px 30px;
  font-size: 24px;
  text-transform: uppercase;
  transition: 0.5s;
  letter-spacing: 4px;
  cursor: pointer;
  position: relative;
  margin: 0 auto;
  margin-top: 30px;
}
.go_project:hover {
  background-color: #03e9f4;
  color: #050801;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 200px #03e9f4;
}
</style>