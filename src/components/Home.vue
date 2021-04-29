<template>
  <el-container>
    <el-header class="home_head">
      <el-row :gutter="20">
        <el-col :span="18" :offset="4">
        <div>
            <img src="../../src/assets/image/logo.png"  width="100" height="80">
            <span style="color:black">学习资源分享</span>
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

      <el-row :gutter="20" class="jianjie">
        <el-col :span="18" :offset="2">
          <h1>这是简介</h1>
        </el-col>
      </el-row> 
      <el-row :gutter="20" class="all_btn">
          <!-- <el-col :span="2" :offset="4">
            <router-link to='/admin' tag="el-button" class="denglu_btn"> 登录</router-link>
          </el-col>
          <el-col :span="2" >
              <router-link to='/hout_admin' tag="el-button" @click="guan">管理员界面</router-link>
          </el-col> -->
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <router-link to='/shouye' tag="el-menu-item" index="1">首页</router-link>
            <router-link to="/bored" tag="el-menu-item" index="2">大厅留言板</router-link>
            <router-link to='/source' tag="el-menu-item" index="3">资源文章页</router-link>
          </el-menu>
      </el-row>
      <el-row :gutter="20" class="show">
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
</template>

<script>

export default {
    name:''
}
</script>

<style> 
.home_head{
    /* height:100px ; */
     background-color:  rgba(111, 128, 175, 1.0);
    /* display: flex; */
    /* justify-content: center; */
    padding: 40px 0 80px 0;
    font-size: 50px;
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
</style>