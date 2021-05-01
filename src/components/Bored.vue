<template>
<div>
  <el-row :gutter="20">
    <el-col :span="15" :offset="4">
      <h2>可在这里写下你的留言</h2>
        <!-- <h2>{{$route.query.username}}</h2> -->
      <br>
    </el-col>
    <el-col :span="15" :offset="4">
      <el-input v-model="content" placeholder="写下你的留言" clearable class="bored_input"></el-input>
      <el-button @click="wordInput">发送</el-button>
      <!-- <h2>{{$route.query.username}}</h2> -->
    </el-col>
    <el-col :span="15" :offset="4">
      <br>
      <el-table :data="tableWord" height="250" border style="width: 100%">
        <el-table-column  prop="name" label="留言者"  width="180"></el-table-column>
        <el-table-column prop="time" label="时间" width="180"></el-table-column>
        <el-table-column prop="content" label="留言"></el-table-column>
      </el-table>
    </el-col>
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
        axios.post('http://121.4.187.232:8080/hallComment/createHallComment?content='+this.content)
        .then((g)=>{
          console.log(g);
          // let usernames=sessionStorage.getItem('userName')
          // if(usernames!==''){
          //     this.tableWord.name=usernames
          //   }
        })
        this.content=""
      }
    },
    created:
      function(){
        axios.get('/hallComment/queryAllHallComment')
        .then((g)=>{
          for(let i=g.data.length;i>=0;i--){
            this.tableWord=g.data
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
      updated:
        function(){
          axios.get('/hallComment/queryAllHallComment')
            .then((g)=>{
              for(let i of g.data){
                this.tableWord=g.data
                // console.log(this.tableWord)
          //        let usernames=sessionStorage.getItem('userName')
          // if(usernames!==''){
          //     this.tableWord.name=usernames
          //   }
              }
              // console.log(g);
            })
            
        }
}

</script>

<style>
.bored_input{
  width:30%
}
</style>