<template>
  <el-row :gutter="20" class="home_main">
        <el-col :span="15" :offset="4">
            <el-card class="box-card" v-for="(item) in passageItem" :key="item.id" >
                <div slot="header" class="card_title" @click="tiao(item.id)">
                    <span class="span_title" >{{item.title}}</span>
                    <!-- <span><h2>标题</h2></span> -->
                    <span class="span_time">{{item.time}}</span>
                </div>
                <!-- <div v-for="o in 4" :key="o" class="text item"> -->
                    <!-- {{'列表内容 ' + o }} -->
                <!-- </div> -->
                <div>
                    <h3>{{item.content}}</h3>
                </div>
            </el-card>
        </el-col>
      </el-row> 
      <!-- <el-pagination  :page-size="20" :pager-count="11"></el-pagination> -->
</template>

<script>
import axios from 'axios'
export default {
    name:'Source',
    data(){
        return{
            titleshow:'',
            contentshow:'',
            timeshow:'',
            // content:'',
            passageItem:[
                // title='',
                // content=''
            ],
        }
    },
    methods:{
      tiao(id){
        axios.get('http://121.4.187.232:8080/passage/passageResources?passageID='+id)
        .then((g)=>{
          console.log(g);
          this.$router.push({
          path:'/home/show',
          query:{
            idd:g.data[0].id
            // titleshow:g.data[0].title,
            // contentshow:g.data[0].content,
            // timeshow:g.data[0].time,
            // commentId:g.data[3].commentID,
            // contentt:g.data[3].content,
            // commentTime:g.data[3].time
          }
        })
          // this.titleshow=g.data[0].title;
          // this.contentshow=g.data[0].content;
          // this.timeshow=g.data[0].time
          // console.log(g);
        })
        // this.$router.push({
        //   path:'/show',
        //   query:{
        //     titleshow:this.titleshow,
        //     contentshow:this.contentshow,
        //     timeshow:this.timeshow
        //   }
        // })
        // console.log(111);

        // axios.get('http://121.4.187.232:8080/passage/passageResources?passageID='+id)
        // .then((g)=>{
        //   this.$router.push({
        //     path:'/show',
        //     query:{
        //       commentItem:'pinglun'
        //     }
        //   })
        //   console.log(g);
        // })
      }
    },
    created:
        function(){
            axios.get('http://121.4.187.232:8080/passage/queryAllPassage?pageNo=2&pageSize=6')
                // method:'get',
                // url:'/passage/queryAllPassage',
            .then((g)=>{
                // console.log(g)
                for(let i=0; i<g.data.passageItem.length;i++){
                    // let index=i
                    this.passageItem=g.data.passageItem
                    // console.log(this.passageItem)
                    // this.passageItem.content=g.data.passageItem
                }
            })
        }
}
</script>

<style>
.card_title{
    /* font-size: 20px; */
    display: flex;
    justify-content: space-between;
    /* margin: 20px; */
    
}
.span_title{
    font-size: 30px;
}
.span_time{
    margin:15px 0;
    font-size: 20px;
}
.box-card{
    height:200px;
    margin:20px
}
</style>