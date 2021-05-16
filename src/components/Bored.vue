<template>
<div class="homediv">
  <el-row :gutter="20">
    <!-- <el-col :span="15" :offset="4"> -->
      <h2>可在这里写下你的留言</h2>
        <!-- <h2>{{$route.query.username}}</h2> -->
      <br>
    <!-- </el-col> -->
    <!-- <el-col :span="15" :offset="4"> -->
      <el-input v-model="content" placeholder="写下你的留言" clearable class="bored_input" @keyup.enter.native="wordInput"></el-input>
      <el-button @click="wordInput">发送</el-button>
      <br>
      <!-- <h2>{{$route.query.username}}</h2> -->
    <!-- </el-col> -->
    <!-- <el-col :span="15" :offset="4"> -->
      <br>
      <el-table :data="tableWord" height="500"  style="width: 100%">
        <!-- <el-table-column  prop="name" label="留言者"  width="180"></el-table-column> -->
        <el-table-column prop="time" label="时间" width="180"></el-table-column>
        <el-table-column show-overflow-tooltip prop="content" label="留言"></el-table-column>
      </el-table>
    <!-- </el-col> -->
  </el-row>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name:'Bored',
    data(){
      return{
        content:'',
        tableWord:[],
      }
    },
    methods:{
      wordInput(){
        if(this.content!=''){
          axios.post('http://121.4.187.232:8080/hallComment/createHallComment?content='+this.content)
            .then((g)=>{
          // console.log(g);
          // let usernames=sessionStorage.getItem('userName')
          // if(usernames!==''){
          //     this.tableWord.name=usernames
          //   }
        })
        this.content=""
        }
        else{
          this.$message.error('不能发送空白值，请输入你的留言')
        }
        
      }
    },
    created:
      function(){
        axios.get('/hallComment/queryAllHallComment')
        .then((g)=>{
          for(let i=g.data.length;i>=0;i--){
            this.tableWord=g.data
            console.log(g);
            // console.log(this.tableWord)
          }
          // console.log(g);
        })
        // console.log($route.query.username);
        // console.log($route.query.userValid);
      },
      updated:
      function(){
        axios.get('/hallComment/queryAllHallComment')
        .then((g)=>{
          for(let i=g.data.length;i>=0;i--){
            this.tableWord=g.data
      
            // console.log(this.tableWord)
          }
          // console.log(g);
        })
        // localStorage.setItem("bored",JSON.stringify(this.tableWord))
      },
      // updated:
      //   function(){
      //     axios.get('/hallComment/queryAllHallComment')
      //       .then((g)=>{
      //         for(let i of g.data){
      //           this.tableWord=g.data
                // console.log(this.tableWord)
          //        let usernames=sessionStorage.getItem('userName')
          // if(usernames!==''){
          //     this.tableWord.name=usernames
          //   }
              
              // console.log(g);
            }
            
    


</script>

<style>
.homediv{
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
     border-radius: 4px;
     font-size: 15px;
     padding: 10px 15px;
     width: 60vw;
     padding: 10px 40px;
     background-color: white;
}
.bored_input{
  width:30%
}
.el-tooltip__popper{
  width: 300px;
  /* background-color:  rgba(111, 128, 175, 1.0); */
  background:rgb(111, 128, 175) !important;/*背景色  !important优先级*/
/* opacity: 0.5 !important;背景色透明度 */

}
</style>