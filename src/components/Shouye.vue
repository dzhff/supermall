<template>
  <el-row :gutter="20" class="home_main">
        <el-col :span="15" :offset="4">
            <el-card class="box-card" v-for="(item) in passageItem" :key="item.id">
                <div slot="header" class="card_title">
                    <span>{{item.title}}</span>
                    <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
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
</template>

<script>
import axios from 'axios'
export default {
    name:'Shouye',
    data(){
        return{
            passageItem:{
                content:'',
                title:'',
                id:''
            }
        }
    },
    created:
        function(){
            axios({
                method:'get',
                url:'/passage/queryAllPassage',
            }).then((g)=>{
                console.log(g)
            })
        }
}
</script>

<style>
.card_title{
    font-size: 20px;
}
.box-card{
    height:200px
}
</style>