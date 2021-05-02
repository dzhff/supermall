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
                <el-card class="box-card" v-for="(item,index) in tiaoItem" :key="index">
                    <div slot="header" class="showSpan1">
                        <span class="span_title">{{item.title}}</span>
                        <span class="showspan_time">{{item.time}}</span>
                    </div>
                    <!-- <div v-for="o in 4" :key="o" class="text item"> -->
                        <!-- {{'列表内容 ' + o }} -->
                    <!-- </div> -->
                    <div>
                        <span>
                            <h3>{{item.content}}</h3>
                            <!-- <span class='avatar'><img src="avatar" alt="图片加载失败"></span> -->
                        </span>
                        <div class="item" v-for="(item,index) in pictures" :key="index">
                            <img :src="'data:image/png;base64,'+item"/>
                        </div>
                        <!-- <span v-for="item in pictures" :key="item.id">
                          <img class="my-item-showimg" :src="'data:image/png;base64,'+item"/>
                          <span class="my-item-showimg-describe">图片</span>
                        </span> -->
                    </div>
                </el-card>
                <br>
                <br>
            </div>
        </el-col>
        <el-col :span="13" :offset="5">
            <!-- <br> -->
            <h3>评论区</h3>
            <div class="showdiv" >
                <div class="userComment">
                    <el-input v-model="comment" placeholder="评论一下吧" clearable class="comment_input"></el-input>
                    <el-button @click="commentInput">发送</el-button>
                </div>
                <div v-for="item in commentItem" :key="item.id">
                    <div v-show="hen">现在暂时还没有评论</div>
                    <div>游客{{item.username}}: </div>
                    <div>{{item.content}}</div>
                    <div>{{item.time}}</div>
                </div>
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
            pictures:[],
            hen:false,
            userID:'',
            token:'',
            comment:'',
            id:-1,
            loginName:'',
            tiaoItem:[],
            commentItem:[],
            // avatar:
        }
    },
    methods:{
        commentInput(){
            this.userID = window.sessionStorage.getItem("userID")
            this.token = window.sessionStorage.getItem("userToken")
            // axios.post('http://121.4.187.232:8080/comment/createComment?content='+this.comment+'&passageID='+this.id+'&userID='+this.userID,{
            //     // config:{
            //     headers:{
            //         token:this.token
            //     }
            //     // }
            // })
            // .then((g)=>console.log(g))
            // .catch((g)=>console.log(g))
        
            // if(this.token=''){
            //     confirm('登录方可评论')
            //     if(confirm('登录方可评论')){
            //         this.$router.push('/admin/user_login')
            //     }
            //     }else{
                    // if()
                    axios({
                    method:'post',
                    url:'http://121.4.187.232:8080/comment/createComment?content='+this.comment+'&passageID='+this.id+'&userID='+this.userID,
                    headers:{
                        token:this.token
                    }
                }).then((g)=>{
                    console.log(g);
                    })
                // }
                    // this.$message.success('发表评论成功')  
            
                

        }
    },
    created:
    function(){
        this.id=this.$route.query.idd;
        // console.log(this.id)
        // console.log(this.$route.query.loginName);
        // console.log(this.$route.query.contentshow);
        axios.get('http://121.4.187.232:8080/passage/passageResources?passageID='+this.id)
        .then((g)=>{
            this.tiaoItem.push(g.data[0])
            this.pictures=g.data[2]
            console.log(this.pictures);
            // console.log(g);
            // console.log(this.tiaoItem);
            // this.avatar=g.data[2]
            // this.commentItem.push(g.data[3])
            // console.log(this.commentItem);
        })
        this.id=this.$route.query.idd;
        // 获取评论
        
            axios.get('http://121.4.187.232:8080/passage/queryCommentByPassageID?passageID='+this.id)
                .then((g)=>{
                    this.commentItem = g.data;
                    //  if(g.data[3]!==null){
                    //         this.hen=false
                    //     }else{
                    //         this.hen=true
                    //     }
        })

        // 获取图片
        // asios.get()
        
    },
    updated:
    function(){
        axios.get('http://121.4.187.232:8080/passage/queryCommentByPassageID?passageID='+this.id)
        .then((g)=>{
            this.commentItem = g.data;

        })
    }
}

</script>

<style>
.showdiv{
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
     border-radius: 4px;
     font-size: 15px;
     padding: 10px 15px;
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
    margin: 15px 0;
    font-size: 20px;
}
.showspan_time{
    padding: 0;
    margin: 15px 0;
    font-size: 20px;
}
</style>