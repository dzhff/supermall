<template>
  <div class="homediv">
    <!-- <h2>这是首页</h2> -->
    <div >
      <el-row :gutter="20" >
        <!-- <el-col :span="18" :offset="2"> -->
          
          <h3><h2>简介</h2><br>这里是学习资源分享地区，是同学们相互学习，发表学习资源，汲取他人经验的平台，希望在这里同学们可以收获学习的快乐</h3>
        <!-- </el-col> -->
      </el-row> 
      <el-row :gutter="20">
        <div class="block">
          <!-- <span class="demonstration">Click 指示器触发</span> -->
          <br>
          <el-carousel trigger="click" :height="bannerHeight+'px'" ref="carousel" @click.native="linkTo">
            <el-carousel-item v-for="(item,index) in imgitem" :key="index">
              <img class="img" :src="item.src" alt="">
              <!-- <li>{{ item }}</li> -->
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-row>
      <div class="noticediv">
        <span><h3>今日公告</h3>{{notices}}</span>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios';
export default {
    name:'Shouye',
    data(){  
      return{
        imgitem:[
          {src:require('../../src/assets/image2/p3.jpg')},
          {src:require('../../src/assets/image2/p1.jpg'),link:'/home/bored'},
          {src:require('../../src/assets/image2/p2.jpg'),link:'/home/source'},
          ],
          bannerHeight:1000,
          screenWidth:0,
          notices:'',
      }
    },
    methods:{
      setSize() {
        // 通过浏览器宽度(图片宽度)计算高度
        this.bannerHeight = (600 / 1920) * this.screenWidth;
      },
      linkTo () {  //跳转路由
      console.log(this.$refs.carousel);
          let activeIndex = this.$refs.carousel.activeIndex
          this.$router.push(this.imgitem[activeIndex].link)
        }

    },

    mounted() {
      // 首次加载时,需要调用一次
      this.screenWidth = window.innerWidth;
      this.setSize();
      // 窗口大小发生改变时,调用一次
      window.onresize = () => {
      this.screenWidth = window.innerWidth;
      this.setSize();
    }
    },
    updated:
    function(){
       axios.get('/notice/queryNotice')
      .then((g)=>{
        this.notices=g.data
      })
    }
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
}
.noticediv{
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
     border-radius: 4px;
     font-size: 15px;
     padding: 10px 15px;
     width: 200px;
     position: absolute;
     right: 100px;
     top: 40px;
     word-break: break-all; word-wrap:break-word;
}

.jianjie{
  display: flex;
  justify-content: center;
  padding: 40px 0 40px 0;

}
 .el-carousel__item h3 {
    /* color: #475669; */
    font-size: 14px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
.img{
  width: 100%;
  height: inherit;
}
</style>