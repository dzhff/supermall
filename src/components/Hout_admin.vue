<template>
  <el-container class="home_container">
      <el-header class="hout_head">
        <div>
            <img src="../../src/assets/image/logo.png"  width="60" height="50">
            <span style="color:black">学习资源分享</span>
        </div>
        <div>
            <el-button type="primary" @click="loginout">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
            <el-menu default-active="2"
                class="el-menu-vertical-demo">
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>公告管理页</span>
                    </template>
                    <el-menu-item-group>
                        <template slot="title">分组一</template>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">大厅留言板管理页</span>
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-menu"></i>
                    <span slot="title">文章管理页</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
    name:"Hout_admin",
    methods:{
        loginout(){
            window.localStorage.removeItem('admintorToken')
            this.$router.push('/shouye')
        }
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
  font-size: 20px;
  
}
.el-header img{
    vertical-align: middle;
}
.el-aside{
  background-color:  rgba(111, 128, 175, 1.0);
}
.el-main{
  background-color:  white;
}
.tui_admin_btn{
    width: 60px;
}
</style>