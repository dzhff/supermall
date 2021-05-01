<template>
<div>
    <el-row :gutter="20" class="show_main">
        <el-col :span="13" :offset="5">
            <h1>展示资源</h1>
            <div  >
                <!-- <span class="showSpan1">
                    <h1>{{$route.query.titleshow}}</h1>
                    <h3>{{$route.query.timeshow}}</h3>
                </span>
                <span>
                    <h3>{{$route.query.contentshow}}</h3>
                </span> -->
                <el-card class="box-card" v-for="item in tiaoItem" :key="item.id">
                    <div slot="header" class="showSpan1">
                        <span class="span_title">{{item.title}}</span>
                        <span class="span_time">{{item.time}}</span>
                    </div>
                    <!-- <div v-for="o in 4" :key="o" class="text item"> -->
                        <!-- {{'列表内容 ' + o }} -->
                    <!-- </div> -->
                    <div>
                        <h3>{{item.content}}</h3>
                        <!-- <span class='avatar'><img src="avatar" alt="图片加载失败"></span> -->
                    </div>
                </el-card>
                <br>
                <br>
            </div>
        </el-col>
        <el-col :span="13" :offset="5">
            <div class="showdiv" >
                <el-card v-for="item in commentItem" :key="item.id">
                <div >
                    <span>游客{{item.commentID}}</span>
                    <span>{{item.content}}</span>
                    <span>{{item.time}}</span>
                </div>
                </el-card>
            </div>
        </el-col>
      </el-row> 
</div>
  

</template>

<script>
import axios from 'axios'
export default {
    name:'Show',
    data(){
        return{
            id:this.$route.query.idd,
            tiaoItem:[],
            commentItem:[],
            // avatar:
        }
    },
    created:
    function(){
        this.id=this.$route.query.idd;
        console.log(this.$route.query.idd);
        // console.log(this.$route.query.contentshow);
        axios.get('http://121.4.187.232:8080/passage/passageResources?passageID='+this.id)
        .then((g)=>{
            this.tiaoItem.push(g.data[0])
            console.log(this.tiaoItem);
            // this.avatar=g.data[2]
            // this.commentItem.push(g.data[3])
            // console.log(this.commentItem);
        })
        this.id=this.$route.query.idd;
        axios.get('http://121.4.187.232:8080/passage/queryCommentByPassageID?passageID='+this.id)
        .then((g)=>{
            this.commentItem.push(g.data[3])
            // console.log(this.commentItem);
            console.log(g);

        })
    }
}
</script>

<style>
.showdiv{
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
     border-radius: 4px
}
.showSpan1{
    display: flex;
    justify-content: space-between;
}
.showSpan2{
    display: flex;
    /* justify-content */
}
.span_title{
    font-size: 30px;
}
.span_time{
    font-size: 20px;
}
</style>