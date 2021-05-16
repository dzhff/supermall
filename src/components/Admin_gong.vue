<template>
  <div>
      <!-- <h2>这是公告管理页</h2> -->
      <div class="gongdiv">
        <h3 v-show="show">今日公告:</h3>
        <h3 v-show="!show">更新公告······</h3>
        <span class="gongToday" v-show="show">{{gongToday}}</span>
        <span v-show="!show"><el-input style="width:700px" type="textarea" autosize v-model="gongToday"/></span>
        <div><br>
        <el-button @click="gongMix">修改公告</el-button></div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'Admin_gong',
    data(){
      return{
        token:'',
        show:true,
        gongToday:'',
      }
    },
    methods:{
      gongMix(){
        this.token=window.localStorage.getItem('admintorToken')
        this.show=!this.show
        axios({
          method:'post',
          url:'/admin/updateNotice',
          params:{
            content:this.gongToday
          },
          headers:{
            token:this.token
          }
        })
        // this.gongToday=this.gongToday
        // axios.post('http://121.4.187.232:8080/admin/updateNotice?content='+this.gongToday)
        .then((g)=>{
          console.log(g);
        }).catch((g)=>{
          console.log(g);
        })
        // this.gongToday=''
      }
    },
    created:
    function(){
      axios.get('/notice/queryNotice')
      .then((g)=>{
        this.gongToday=g.data
        console.log(this.gongToday);
      })
    },
    // updated:
    // function(){
    //    axios.get('/notice/queryNotice')
    //   .then((g)=>{
    //     this.gongToday=g.data
    //     console.log(this.gongToday);
    //   })
    // }
}
</script>

<style>
.gongdiv{
    background-color: white;
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
     border-radius: 4px;
     font-size: 15px;
     padding: 10px 15px;
}
</style>