<template>
  <div class="zheng">
    <!-- <div class="out_lable">
        <div class="username">
          <h3>账户名</h3> 
          <input type="text" placeholder="username"/>
        </div>
        <div class="password">
          <h3>密码</h3>
          <input type="text" placeholder="password"/>
        </div>
      <div class="admintor_btn">
        <button type="primary">登录</button>
    </div>
  </div> -->
  <!-- <div class="adminform"> -->

  <Card class="adminform">
    <img class="adminimg" src="../../src/assets/image/logo.png" >
   <Form :model="formInline" :rules="ruleInline" inline>
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
          user:'',
          password:'',
        },
        ruleInline:{
          user:[
            {required:true,message:'Please fill in the user name',trigger: 'blur'}
          ],
          password:[
            {required:true,message:'Please fill in the password.', trigger: 'blur'},
            { type: 'string', min: 5, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
          ]
        }
        }
      },
      methods:{
        formSubmit(){
          if(this.formInline.user !==''&&this.formInline.password !==''){
            // console.log(this.formInline);
            axios({
              method:'post',
              url:'/user/adminLogin?password='+this.formInline.password+'&username='+this.formInline.user,
              // headers: "content-type: 'application/json'"
            }) .then((g)=>{
              // 这里要写一个验证
              // if(g.data.state = true)
              console.log(g)
            }).catch((g)=>{
              console.log(g);
            })
            // 全局定义的
            // this.$axios.get("")'
            // if(this.formInline.user != 'admin' || this.formInline.password != 'admin'){

            // }
          }else {
            alert("请填写你的账户和密码")
          }
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
</style>