<template>
  <div class="zheng2">
      <!-- <h2>这是用户注册界面</h2> -->
      <el-card class="adminform2">
        <img class="adminimg" src="../../src/assets/image/logo.png" >
      <el-form :model="formInline" status-icon :rules="rules" label-width="100px" ref="userRegist" class="demo-ruleForm">
        <el-form-item label="用户" prop="user" >
          <el-input type="text" v-model="formInline.user" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formInline.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="formInline.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="zhubtn" @click="zhubtn()" type="primary" >注册</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
      </el-card>
  </div>
</template>

<script>
import axios from 'axios';
// import axios from 'axios';

export default {
    name:"User_registration",
    data(){
        return{
            formInline:{
                user:'',
                password:'',
                checkPass:'',
            },
            rules:{
                user:[
                    {required:true,message:'Please fill in the user name',trigger: 'blur'}
                ],
                password:[
                    {required:true,message:'Please fill in the password.', trigger: 'blur'},
                    {type: 'string', min: 5, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
                ],
                checkPass:[
                    {required:true,message:'Please fill in the password again',trigger:'blur'},
                    
                ]
            }
        }
    },
    methods:{
        zhubtn(){
              this.$refs.userRegist.validate((valid)=>{
                 if(this.formInline.password==this.formInline.checkPass){
                 if(!valid)return;
                  
                 axios({
                     method:'post',
                     url:'/user/register',
                     params:{
                         password:this.formInline.password,
                         username:this.formInline.user
                     }
                 }).then((g)=>{
                     console.log(g)
                     this.$message.success('注册成功')
                     this.formInline.user="",
                     this.formInline.password="",
                     this.formInline.checkPass=""
                 }).catch((g)=>{console.log(g);})

                  }else{
                      this.$message.error('两次输入的密码不正确，请重新输入')
                      this.formInline.checkPass="",
                      this.formInline.password=""
                  }
              })

          }
        }
    
}
</script> 

<style>
.zheng2{
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
.adminform2{
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
  height: 350px;
  padding: 0px 100px;
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

</style>