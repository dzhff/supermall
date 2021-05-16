<template>
  <div id="app">
    <el-container>
    <el-header class="home_head">
      <el-row :gutter="20">
        <el-col :span="18" :offset="4" class="head">
        <div >
            <img src="../../src/assets/image/logo.png"  width="60" height="50">
            <span style="color:black">学习资源分享</span> 
        </div>
        <div class="signbtn">
          <a class="signbtnA" v-show="signshow" @click="userClick">登录</a>
          <!-- <a class="signbtnA" v-show="!signshow" v-text="signUser" @click="userBack"></a> -->
          <el-dropdown v-show="!signshow">
            
              <a class="el-dropdown-link signbtnA" v-text="signUser">
                
              </a>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="userBack">退出登录</el-dropdown-item>
                <el-dropdown-item @click.native="changeClick">切换账户</el-dropdown-item>
                <!-- <el-dropdown-menu></el-dropdown-menu> -->
                <!-- <el-dropdown-item @click.native="adminClick">管理员登录</el-dropdown-item> -->
              </el-dropdown-menu>
    
          </el-dropdown>
        </div>
        </el-col>
      </el-row>
    </el-header>

      <el-row :gutter="20" class="all_btn">
        <el-col :span="15" :offset="4" >
          <el-menu class="el-menu-demo"  mode="horizontal" >
              <span class="meue_head">
                <router-link to='/home/shouye'><el-menu-item class="size">首页</el-menu-item></router-link>
                <router-link to="/home/bored"><el-menu-item class="size">大厅留言板</el-menu-item></router-link>
                <router-link to='/home/source'><el-menu-item class="size">资源文章页</el-menu-item></router-link>
                <router-link to='/home/show' v-show="cang"><el-menu-item>资源展示</el-menu-item></router-link>
                <br>
                <br>
              </span>
          </el-menu>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="show">
        <el-col :span="18" :offset="4">
        <br>
        <br>
            <router-view></router-view>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="show">
        <el-col :span="24" :offset="0" class="footdiv">
          <h3>欢迎来到学习的世界</h3>
        </el-col>
      </el-row>
  </el-container>
    
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data(){
    return{
      signshow:true,
      cang:false,
      visible:false,
      content:'',
      signUser:'',
    }
  },
  methods:{
    userBack(){
      window.sessionStorage.removeItem('userName')
      window.sessionStorage.removeItem('userToken')
      this.signshow=!this.signshow
    },
    userClick(){
      this.$router.push('/admin');
    },
    changeClick(){
      this.$confirm('此操作将退出现有用户, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
              }).then(()=>{
                window.sessionStorage.removeItem('userName')
                window.sessionStorage.removeItem('userToken')
                this.$router.push('/admin')
              })
    },
    adminClick(){
      this.$router.push('/admin/admintor')
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
  },
  created:
  function(){
    let loginName=JSON.parse(window.sessionStorage.getItem('userName'))
    if(loginName!==null){
      this.signshow=!this.signshow
      this.signUser="Hi！"+loginName
    }
  },
  updated:
  function(){
  }
}
</script>

<style>
.signbtnA{
  color: black;
}
.signbtn{
  font-size: 20px;
  padding: 20px 0px 5px 0px;
  font-weight:normal;
}
.head{
  /* margin: 0px; */
  font-size: 40px;
  font-weight:bolder;
  width: 1000px;
   display: flex;
  justify-content: space-between;
}
.homediv{
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
     border-radius: 4px;
     font-size: 15px;
     padding: 10px 15px;
     width: 60vw;
     padding: 10px 40px;
}
.footdiv{
     /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
     border-radius: 4px;
     font-size: 20px;
     padding: 40px 15px;
     width: 100vw;
     height: 100px;
     text-align: center;
     /* padding: 10px 40px; */
     background-color: rgba(0, 0, 0, 0.308);
}
#app{
  height: 100%;
  margin: 0;
  padding: 0;
  min-width: 1366px;
}
.meue_head{
    display: flex; 
    justify-content:left;
}
.home_head{
   background-color:  rgba(111, 128, 175, 0.8);
 display: flex;
  justify-content: space-between;
  align-items:flex-start;
    padding: 30px 0 60px 0;
    font-size: 25px;
    color: black;
    /* height: 500px; */
    /* font-weight:bolder; */
    margin:0px 0px;
}

.el-header img{
    vertical-align: middle;
}

.notice{
  position:absolute;
  top:0px;
  
}
.el-dropdown-link{
  font-size: 20px;
  
}
</style>
 