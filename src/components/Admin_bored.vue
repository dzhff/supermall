<template>
  <div>
    <h3>当前留言板</h3>
    <div class="boreddiv">
      <el-table :data="boredWord" height="500" border style="width: 100%">
        <!-- <el-table-column  prop="name" label="留言者"  width="180"></el-table-column> -->
        <el-table-column prop="time" label="时间" width="250"></el-table-column>
        <el-table-column prop="content" label="留言"></el-table-column>
        <!-- <el-table-column prop="id" label="操作">
          <el-button v-model="boredWord.id" @click="boredDelete(id)">删除</el-button>
        </el-table-column> -->
        <el-table-column label="操作" width="150">
        <template slot-scope="scope">
        <el-button
          @click.native.prevent="boredDelete(scope)"
          type="text"
          size="small"> 
          删除
        </el-button>
      </template></el-table-column>
      </el-table>
  </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'Admin_bored',
    data(){
      return{
        token:'',
        boredWord:[],
        id:'',
      }
    },
    methods:{
      boredDelete(store){
        this.token=window.localStorage.getItem('admintorToken')
        // console.log(store.$index)
        // this.id=store.$index
        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(()=>{
                  axios.get('/hallComment/queryAllHallComment')
                  .then((g)=>{
                    // for(let i=g.data.length;i>=0;i--){
                      this.id=g.data[store.$index].id
                      // console.log(this.id);
                      axios({
                    method:'post',
                    url:'/admin/deleteHallComment',
                    params:{
                      ID:this.id
                    },
                    headers:{
                      token:this.token
                    }
                  })
                  .then((h)=>{
                  })
                })
        
        })
         
        
      }
    },
    created:
      function(){
        axios.get('/hallComment/queryAllHallComment')
        .then((g)=>{
          // for(let i=g.data.length;i>=0;i--){
            this.boredWord=g.data
            // this.id.push(g.data.id)
            console.log(g);
            // console.log(this.tableWord)
          // }
          // console.log(g);
        })
        // console.log(this.boredWord.id)
        // console.log($route.query.username);
        // console.log($route.query.userValid);
      },
      updated:
      function(){
        axios.get('/hallComment/queryAllHallComment')
        .then((g)=>{
          // console.log(g);
            this.boredWord=g.data

        })
        
      }
      
}
</script>

<style>
.boreddiv{
    background-color: white;
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
     border-radius: 4px;
     font-size: 15px;
     padding: 10px 15px;
}
</style>