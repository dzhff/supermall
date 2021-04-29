<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <!-- <router-link to='/admin' tag="button"> 登录</router-link>
    <router-link to='/hout_admin' tag="button" @click="guan">管理员界面</router-link> -->
    <!-- <router-link to='/main' tag="button">主页面</router-link> -->
    <el-container>
    <el-header class="home_head">
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
    <!-- <el-row class="home_head">
      <el-col :span="24">
        <img src="../../src/assets/image/logo.png"  width="60" height="50">
        <span style="color:black">学习资源分享</span>
      </el-col>
    </el-row>-->

      <el-row :gutter="20" class="all_btn">
          <!-- <el-col :span="2" :offset="4">
            <router-link to='/admin' tag="el-button" class="denglu_btn"> 登录</router-link>
          </el-col>
          <el-col :span="2" >
              <router-link to='/hout_admin' tag="el-button" @click="guan">管理员界面</router-link>
          </el-col> -->
          <el-menu class="el-menu-demo" mode="vertical" >
              <span class="meue_head">
                <router-link to='/shouye'><el-menu-item >首页</el-menu-item></router-link>
                <router-link to="/bored"><el-menu-item >大厅留言板</el-menu-item></router-link>
                <router-link to='/source'><el-menu-item>资源文章页</el-menu-item></router-link>
                <br>
                <br>
                <router-link to='/admin'><el-button class="denglu_btn"> 登录</el-button></router-link>
                <router-link to='/hout_admin'><el-button @click="guan">管理员界面</el-button></router-link>
              </span>
            <el-divider></el-divider>
          </el-menu>
      </el-row>
  
      <el-row :gutter="20" class="jianjie">
        <el-col :span="18" :offset="2">
          <h1>这是简介</h1>
        </el-col>
      </el-row> 
      <el-row :gutter="20" class="show">
        <br>
        <br>
        <router-view></router-view>
      </el-row>
      <!-- <el-row :gutter="20" class="home_main">
        <el-col :span="6" :offset="4">
          <el-card class="card" >
            这是文章
          </el-card>
        </el-col>
      </el-row>  -->
  </el-container>
    
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
    guan(){
      console.log(1111);
    }
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
</style>
