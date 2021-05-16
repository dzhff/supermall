<template>
  <el-container class="home_container">
      <el-header class="hout_head">
        <div>
            <!-- <img src="../../src/assets/image/logo.png"  width="60" height="50"> -->
            <span style="color:black">学习资源分享</span>
        </div>
        <div>
            <el-button type="primary" @click="loginout">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
            <el-menu default-active="1"
                class="el-menu-vertical-demo"
                >
                <!-- <router-link to = "/hout_admin/admin_passage"> -->
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>文章管理页</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <router-link to="/hout_admin/all_user"><el-menu-item index="1-1">用户信息</el-menu-item></router-link>
                        <router-link to="/hout_admin/passage_mix"><el-menu-item index="1-2">更新文章</el-menu-item></router-link>
                        <router-link to="/hout_admin/passage_new"><el-menu-item index="1-3">新建文章</el-menu-item></router-link>
                        <router-link to="/hout_admin/mixing" ><el-menu-item index="1-4" v-show="mixingshow">mixing</el-menu-item></router-link>
                    </el-menu-item-group>
                </el-submenu>
                <!-- <br> -->
                <!-- </router-link> -->
                <router-link to="/hout_admin/admin_gong">
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                     <span>公告管理页</span>
                </el-menu-item>
                </router-link>
                <router-link to="/hout_admin/admin_bored">
                <el-menu-item index="3">
                    <i class="el-icon-menu"></i>
                    <span >大厅留言板管理页</span>
                </el-menu-item>
                </router-link>
            </el-menu>
        </el-aside>
        <el-main class="el-router">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
    name:"Hout_admin",
    data(){
      return{
        mixingshow:false
      }
    },
    methods:{
        loginout(){
            window.localStorage.removeItem('admintorToken')
            this.$router.push('/admin')
        },
    }
}
</script>

<style>
.home_container{
  height: 60vw;

}
.hout_head{
  background-color:  rgba(111, 128, 175, 1.0);
  display: flex;
  justify-content: space-between;
  line-height: 60px;
  font-size: 25px;
  
}
.el-header img{
    vertical-align: middle;
}
.el-aside{
  background-color:  rgba(111, 128, 175, 1.0);
  /* height: 80vw; */
}
.el-main{
  background-color:  white;
}
.tui_admin_btn{
    width: 60px;
}
.el-router{
   background-color:  whitesmoke;

}
</style>