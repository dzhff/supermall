<template>
  <div id="app">
    <!-- <router-view name="scend"></router-view> -->
    <!-- <router-view></router-view> -->
    <!-- <router-link to='/admin' tag="button"> 登录</router-link>
    <router-link to='/hout_admin' tag="button" @click="guan">管理员界面</router-link> -->
    <!-- <router-link to='/main' tag="button">主页面</router-link> -->
    <el-container>
    <el-header class="home_head">
      <!-- <span class="notice">
          <el-button plain @click="notice_btn" v-show="gonggao">不会自动关闭</el-button>
      </span> -->
      <el-row :gutter="20">
        <el-col :span="18" :offset="4">
        <div>
            <!-- <img src="../../src/assets/image/logo.png"  width="100" height="80"> -->
            <span>
              <h1>学习资源分享</h1> 
            </span>
        </div>
        </el-col>
      </el-row>
    </el-header>

      <el-row :gutter="20" class="all_btn">
          <el-menu class="el-menu-demo" mode="vertical" >
              <span class="meue_head">
                <router-link to='/home/shouye'><el-menu-item >首页</el-menu-item></router-link>
                <router-link to="/home/bored"><el-menu-item >大厅留言板</el-menu-item></router-link>
                <router-link to='/home/source'><el-menu-item>资源文章页</el-menu-item></router-link>
                <router-link to='/home/show' v-show="cang"><el-menu-item>资源展示</el-menu-item></router-link>
                <br>
                <br>
                <el-button @click="userClick">登录</el-button>
                <el-button @click="guanClick" >管理员界面</el-button>
                <!-- <el-button @click="gongAdmin" v-show="cang">公告管理页</el-button> -->
                <el-popover placement="right"  width="200" trigger="manual" v-model="visible">{{content}}
                <el-button slot="reference" @click="notice_btn">今日公告</el-button>
                </el-popover>
              </span>
            <el-divider></el-divider>
          </el-menu>
      </el-row>
      <!-- <el-row :gutter="20" class="jianjie">
        <el-col :span="18" :offset="2">
          <h1>这是简介</h1>
        </el-col>
      </el-row>  -->
      <el-row :gutter="20" class="show">
        <br>
        <br>
        <!-- <router-view name="first"></router-view> -->
        <router-view></router-view>
      </el-row>
      <!-- <el-footer>
        <el-row :gutter="20" class="home_main">
        <el-col :span="15" :offset="4">
          <el-card class="card" >
            这是文章
          </el-card>
        </el-col>
      </el-row> 
      </el-footer> -->
  </el-container>
    
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data(){
    return{
      cang:false,
      visible:false,
      content:'',
    }
  },
  methods:{
    userClick(){
      this.$router.push('/admin');
    },
    guanClick(){
      this.$router.push('/hout_admin')
    },
    notice_btn(){
      this.visible=!this.visible,
      axios.get('/notice/queryNotice')
      .then((g)=>{
        this.content=g.data
      })
    },
    // gongAdmin(){
    //       this.$router.push('/admin_gong')
    //     }
    // open2() {
    //   this.$notify({
    //     title: '提示',
    //     message: '这是一条不会自动关闭的消息',
    //     duration: 0
    //    });
    // }
  },
  created:
  function(){
    // this.visible=true
  }
}
</script>

<style>
#app{
  height: 100%;
  margin: 0;
  padding: 0;
  min-width: 1366px;
}
.meue_head{
    display: flex; 
    justify-content:center;
    /* width: 600px; */

}
.home_head{
    /* height:100px ; */
     background-color:  rgba(111, 128, 175, 1.0);
    /* display: flex; */
    /* justify-content: center; */
    padding: 40px 0 80px 0;
    font-size: 30px;
    /* font-weight:bolder; */
    margin:0px ;
}
.jianjie{
  display: flex;
  justify-content: center;
  padding: 40px 0 40px 0;

}
.el-header img{
    vertical-align: middle;
}
.el-divider{
  display:inline-block;
  /* margin: 0px; */
  /* height:100%; */
  width:60%;
  margin:0 8px;
  vertical-align:middle;
  padding: 0px;
  position:absolute;
  left: 230px;
}
.notice{
  position:absolute;
  top:0px;
  
}
</style>
 