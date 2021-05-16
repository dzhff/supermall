<template>
<div>
    <el-row :gutter="20" class="show_main">
        <el-col :span="15" :offset="0">
            <h3>资源展示</h3>
            <div  >
                <el-card class="box-cardd" v-for="(item,index) in tiaoItem" :key="index">
                    <div slot="header" class="showSpan1">
                        <span class="span_title">{{item.title}}</span><br>
                        <span class="showspan_time">发表于{{item.time}}</span>
                    </div>
                    <div >
                        
                            <span class="neirong"><span class="juTi" >具体内容：</span><br>{{item.content}}</span>
                            <!-- <span class='avatar'><img src="avatar" alt="图片加载失败"></span> -->
                            <br>
                        
                        <span class="juTi" v-show="pictShow"><br>图片展示:</span>
                        <br>
                        <div class="item" v-for="(item,index) in pictures" :key="index">
                            <img style="width:80%" :src="'data:image/png;base64,'+item"/>
                        </div>
                        <!-- <span v-for="item in pictures" :key="item.id">
                          <img class="my-item-showimg" :src="'data:image/png;base64,'+item"/>
                          <span class="my-item-showimg-describe">图片</span>
                        </span> -->
                        <!-- <el-button @click="getfile()">
                            获取资源
                        </el-button> -->
                        <!-- <div v-for="(item,index) in showsources" :key="index"></div>
                            <span>{{item.address}}</span>
                            <!-- <a href=""></a> -->
                    </div> 
                    <br>
                    <br>
                    <span>点击相应资源链接即可下载</span>
                    <div v-for="(item,index) in sources" :key="index">
                        <!-- <h3>资源{{item.address}}</h3> -->
                        
                    <a @click="uploadDown(index)"><sapn class="zi">资源下载：</sapn>{{item.address}}</a>
                    </div>
                    <!-- <el-button @click="uploadDown">下载</el-button> -->
                    <!-- <a v-text="showsources"></a> -->
                </el-card>
                <br>
                <br>
            </div>
        </el-col>
        <el-col :span="13" :offset="0">
            <!-- <br> -->
            <h3>评论区</h3>
            <div class="showdiv" >
                <div class="userComment">
                    <el-input v-model="comment" placeholder="评论一下吧" clearable class="comment_input"  @keyup.enter.native="commentInput"></el-input>
                    <el-button @click="commentInput">发送</el-button>
                </div>
                <div v-show="hen"><h3>现有{{commentTotal}}条</h3></div>
                <div v-show="hen" v-for="item in commentItem" :key="item.id">
                    <span style="font-size:19px">{{item.username}}</span>
                    <span style="font-size:19px">:{{item.content}}</span>
                    <span style="font-size:12px"><span v-show="ing"></span>{{item.time}}</span>
                </div>
                <div v-show="!hen">现在暂时还没有评论</div>
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
            pictShow:false,
            pictures:[],
            hen:false,
            userID:'',
            token:'',
            comment:'',
            id:-1,
            loginName:'',
            tiaoItem:[],
            commentItem:[],
            showsources:[],
            commentTotal:'',
            ing:false,
            // upsources:
            // avatar:
        }
    },

    methods:{
        commentInput(){
            this.userID = window.sessionStorage.getItem("userID")
            this.token = window.sessionStorage.getItem("userToken")
                    if(this.token){
                        console.log(this.token);
                           axios({
                                method:'post',
                                url:'http://121.4.187.232:8080/comment/createComment?content='+this.comment+'&passageID='+this.id+'&userID='+this.userID,
                                headers:{
                                    token:this.token
                                }
                            }).then((g)=>{
                                console.log(g);
                                this.comment=''
                                this.$message.success('发表评论成功')  
                                })
                                }else{
                                    this.$confirm('登录后才可以评论文章哦，是否前往登录呢？', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                        }).then(()=>{
                                            this.$router.push('/admin/user_login')
                                        })
                                }
        },
        uploadDown(index){
            if(this.token){
                 axios({
                    method: "post",
                    url: `http://121.4.187.232:8080/passage/downResources?filePath=${this.sources[index].address}`,
                    headers:{
                                // 'Content-type': 'application/octet-stream',
                                token:this.token
                            },
                    responseType: "blob",
                  }).then((res) => {
                    console.log(res);
                    res = res.data;
                    console.log(res.data);
                    let blob = new Blob([res], { type: res.type });
                    let downloadElement = document.createElement("a");
                    let href = window.URL.createObjectURL(blob);
                    downloadElement.href = href;
                    downloadElement.download = this.sources[index].address;
                    document.body.appendChild(downloadElement);
                    downloadElement.click();
                    document.body.removeChild(downloadElement);
                    window.URL.revokeObjectURL(href);
                  });
            }else{
                this.$confirm('登录后才可以下载文章资源哦，是否前往登录呢？', '提示', {
                                        confirmButtonText: '确定',
                                        cancelButtonText: '取消',
                                        type: 'warning'
                                        }).then(()=>{
                                            this.$router.push('/admin/user_login')
                                        })
            }
        }

    },
    created:
    function(){
        this.id=this.$route.query.idd;
        axios.get('http://121.4.187.232:8080/passage/passageResources?passageID='+this.id)
        .then((g)=>{
            this.tiaoItem.push(g.data[0])
            this.pictures=g.data[2]
            this.sources=g.data[1]
            console.log(g);

            for(let i in this.pictures){
                if(this.pictures[i]){
                    this.pictShow=true
                }
            }
            this.token = window.sessionStorage.getItem("userToken")


        })
        this.id=this.$route.query.idd;
        // 获取评论
        
            axios.get('http://121.4.187.232:8080/passage/queryCommentByPassageID?passageID='+this.id)
                .then((g)=>{
                    this.commentItem = g.data
                    // for(let i=this.commentItem.length;i=this.commentItem.length;i){
                    //     console.log(this.commentItem[i]);
                    // }
                    console.log(this.commentItem);
                    for(let i in this.commentItem){
                        if(this.commentItem[1]){
                            this.hen=true
                        }
                        if(this.commentItem[i]){
                            this.ing=true
                        }
                    }
                    let e=this.commentItem.length
                    this.commentTotal=this.commentItem[e-1]
                    console.log(this.commentTotal);
                    // console.log(e);
                    // console.log(g);
        })

           

        // 获取图片
        // asios.get()
        
    },
    updated:
    function(){
        axios.get('http://121.4.187.232:8080/passage/queryCommentByPassageID?passageID='+this.id)
        .then((g)=>{
            this.commentItem = g.data;
            for(let i in this.commentItem){
                        if(this.commentItem[1]){
                            this.hen=true
                            // let e=this.commentItem.length
                            // console.log(e);
                            // console.log(this.commentItem[i]);
                        }
                    }
                    let e=this.commentItem.length
                    this.commentTotal=this.commentItem[e-1]
            // console.log(g);
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
     width: 58vw;
     padding: 10px 40px;
}
.comment_input{
    width: 300px;
}
.neirong{
    font-size: 24px;
}
.juTi{
    font-size: 20px;
    color: cadetblue;
}
.zi{
    color: black;
}
.item{
    text-align: center;
    /* width:500px */
    /* height: 500px; */
}
.box-cardd{
    width: 800px;
}

/* .showSpan1{
    display: flex;
    justify-content: space-between;
} */
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
    font-size: 15px;
}
</style>