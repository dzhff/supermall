<template>
  <div class="zheng">
    <el-menu  class="el-menu-demo" mode="horizontal" >
      <router-link to="/admin/user_login" tag="el-menu-item" index="1">登录</router-link>
      <router-link to="/admin/user_registration" tag="el-menu-item" index="2">注册</router-link>
      <router-link to="/admin/admintor" tag="el-menu-item" index="3">管理员登录</router-link>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name:"Admin"
}
</script>

<style>
.zheng{
  /* background-color:  rgba(111, 128, 175, 1.0); */
  background-color: whitesmoke;
  position: relative;
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 600px;
}
.adminimg{
  width: 80px;
}
.adminform{
  position: absolute;
  top:10%;
  left:50%;
  transform: translate(-50%,-50%);/*通过变形来搞定*/
  background-color: white;
  border-radius: 5%;
  margin: 200px auto;
  /* padding: auto; */
  text-align: center;
  width: 300px;
  /* height: 450px; */
}
</style>