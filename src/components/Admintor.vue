<template>
  <div class="zheng">
<h2 class="adminh2">管理员登录</h2>
  <Card class="adminform">
    <img class="adminimg" src="../../src/assets/image/logo.png" >
   <Form :model="formInline" :rules="ruleInline" inline ref="houtAdmin">
        <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="username">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="password">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="formSubmit()">Signin</Button>
        </FormItem>
    </Form>
    </Card>
    </div>
  <!-- </div> -->
</template>

<script>

import axios from 'axios';

export default {
      name:'Admintor',
      data(){
        return{
        formInline:{
          user:'admin',
          password:'admin',
        },
        ruleInline:{
          user:[
            {required:true,message:'Please fill in the user name',trigger: 'blur'}
          ],
          password:[
            {required:true,message:'Please fill in the password.', trigger: 'blur'},
            { type: 'string', min: 5, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
          ],

        }
        }
      },
      methods:{
        formSubmit(){
          this.$refs.houtAdmin.validate((valid)=>{
            if(!valid)return
            
            axios({
              method:'post',
              url:'/user/adminLogin',
              params:{
                 password:this.formInline.password,
                 username:this.formInline.user
              }
              // headers: "content-type: 'application/json'"
            }).then((g)=>{
              console.log(g);
              if(g.data.state !==true){
                this.$message.error('登陆失败')
              }else{
                // this.$message.success('登录成功')
                this.$message.success('你已进入管理员界面')
              }
              window.localStorage.setItem('admintorToken',g.data.token)
              this.$router.push('/hout_admin')

            })
          })
          
             .then((g)=>{
              console.log(g)
            }).catch((g)=>{
              console.log(g);
            })
            // alert("你已成功进入管理员界面")
            this.formInline.user=""
            this.formInline.password=""

           
          
          
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
.adminh2{
  position: absolute;
  top: 80px;
  left: 540px;
}
</style>