<template>
    <div>
        <el-row :gutter="20" class="home_main">
        <el-col :span="15" :offset="2">
            <el-card class="box-card" v-for="(item) in passageItem" :key="item.id" shadow="hover">
                <div slot="header" class="card_title" @click="tiao(item.id)">
                    <span class="span_title" >{{item.title}}</span>         
                    <span class="span_time"><br>发表于{{item.time}}</span>
                </div>
                <div>
                    <!-- <span><h3>{{item.content}}</h3></span> -->
                    <span @click="tiao(item.id)" class="tiao">精彩内容请前往阅读=></span>
                    <!-- <h3>哈哈哈哈哈哈</h3> -->
                </div>
            </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
          <el-col :span="15" :offset="2">
            <div class="block">
                <el-pagination
                    layout="prev, pager, next"
                    :total="total"
                    @current-change="CurrentChange"
                    :current-page="page"
                    :page-size="pageSize">
                </el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
  
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
            page:0,
            total:0,
            pageSize:6
        }
    },
    methods:{
      tiao(id){
        //   console.log(22);
        this.$message.success('正在跳转到相应文章，请稍等片刻')
        axios.get('http://121.4.187.232:8080/passage/passageResources?passageID='+id)
        .then((g)=>{
          console.log(g);
          this.$router.push({
          path:'/home/show',
          query:{
            idd:g.data[0].id
          }
        })
        
        })
      
      },
      getAllUser(page) {
          this.page = page
        axios.get('http://121.4.187.232:8080/passage/queryAllPassage?pageNo='+this.page+'&pageSize=6')
        .then(res => {
          this.passageItem= res.data.passageItem
        //   this.total=res.data.passageItemCount
        //   console.log(this.total);
        //   this.total = res.data.total
        })
      },
       CurrentChange(currentPage){
        this.page = currentPage;
        this.getAllUser(this.page)//点击第几页
        // console.log(currentPage); 
        // console.log(this.page);
      },
    },
    created:
        function(){
            axios.get('http://121.4.187.232:8080/passage/queryAllPassage?pageNo=1&pageSize=6')
                // method:'get',
                // url:'/passage/queryAllPassage',
            .then((g)=>{
                console.log(g)
                for(let i=0; i<g.data.passageItem.length;i++){
                    // let index=i
                    this.passageItem=g.data.passageItem
                    this.total=g.data.passageItemCount
                    console.log(this.total)
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
    /* display: flex; */
    /* justify-content: space-between; */
    /* width:500px */
    /* height: 200px; */
    /* margin: 20px; */
    
}
.span_title{
    font-size: 30px;
}
.span_time{
    margin:15px 0;
    font-size: 14px;
}
.box-card{
    width:500px;
    height:200px;
    margin:20px
}
.tiao{
    font-size: 16px;
}
.tiao:hover{
    cursor: pointer;
    color:cadetblue ;
    font-size: 18px;
}
</style>