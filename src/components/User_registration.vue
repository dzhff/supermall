<template>
  <div class="zheng2">
      <!-- <h2>这是用户注册界面</h2> -->
       <h2 class="zhuu">新用户注册</h2>
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
       var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.checkPass !== '') {
            this.$refs.userRegist.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }
        return{
            formInline:{
                user:'',
                password:'',
                checkPass:'',
            },
            rules:{
                user:[
                    {required:true,message:'请输入用户名',trigger: 'blur'}
                ],
                // password:[
                //     {required:true,message:'Please fill in the password.', trigger: 'blur'},
                //     {type: 'string', min: 5, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
                // ],
                // checkPass:[
                //     {required:true,message:'Please fill in the password again',trigger:'blur'},
                    
                // ]
                 password: [
            { required:true,validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required:true,validator: validatePass2, trigger: 'blur' }
          ],
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
                     this.$message.success('注册成功,请再次登录')
                     this.formInline.user="",
                     this.formInline.password="",
                     this.formInline.checkPass=""
                     this.$router.push({
                       path:'/admin/user_login'
                     })
                    //  this.$message.success('')
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
/* .zhuu{
  position: absolute;
  left: 500px;
  top: 80px;
  
} */
.zhuu{
  
  position: absolute;
  top: 50px;
  left: 530px;

}
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
  /* opacity: 0; */
     box-shadow: 0 2px 12px 0 white  !important;
     text-align: center !important;
     position: absolute  !important;
}
.zhubtn{
    position: absolute;
    left: 0;
}

</style>