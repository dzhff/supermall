<template>
  <div class="zheng">
      <!-- <h2>这是用户登录表单</h2> -->
      <el-card class="adminform1">
        <img class="adminimg" src="../../src/assets/image/logo.png" >
      <el-form :model="formInline" status-icon :rules="rules" ref="userLogin" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户" prop="user" >
          <el-input type="text" v-model="formInline.user" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formInline.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="zhubtn" type="primary" @click="signbtn()">sign in</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
      </el-card>
  </div>
</template>

<script>
import axios from 'axios'
// import axios from 'axios';

export default {
  name:"User_login",
  data(){
    return{
      formInline:{
        user:'',
        password:'',
      },
      rules:{
        user:[
            {required:true,message:'Please fill in the user name',trigger: 'blur'}
        ],
        password:[
          {required:true,message:'Please fill in the password.', trigger: 'blur'},
          {type: 'string', min: 5, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
        ]
      },
    }
  },
  methods:{
    signbtn(){
      // 验证表单
      this.$refs.userLogin.validate((valid)=>{
        if(!valid)return;

        axios({
          method:'post',
          url:'/user/userLogin',
          params:{
             password:this.formInline.password,
             username:this.formInline.user
          }
        })
        .then((g)=>{
          console.log(g)
          // 判断当前登陆状态
          if(g.data.state !== true){
            this.$message.error('登陆失败')
          }else{
            this.$message.success('登陆成功')
          }
          // 保存token值
          window.localStorage.setItem('userToken',g.data.token)
          // this.$router.push('/hout_admin')
          })
        .catch((g)=>{console.log(g)})
          this.formInline.user="",
          this.formInline.password=""
        
      })
    }
  }
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
/* .el-card{
  height: 300px;
  padding: 0px 100px;
} */
.adminform1{
  /* display: flex; */
  /* justify-content: left; */
  position: absolute;
  top:10%;
  left:50%;
  transform: translate(-50%,-50%);/*通过变形来搞定*/
  background-color: white;
  border-radius: 5%;
  margin: 200px auto;
  /* padding: auto; */
  text-align: center;
  width: 350px;
  height: 300px;
  padding: 0px 100px;
  /* height: 450px; */
  /* align-content: center; */
  padding: 5px 5px 5px 20px
}
.el-form{
    position: absolute;
    left: 0;
    /* height: 300px; */
}
.zhubtn{
    position: absolute;
    left: 0;
}
/* .let_center{
  width: 60px;
} */
</style>