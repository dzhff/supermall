<template>
    <div class="passageMixdiv">
        
        <el-table :data="boredWord"  style="width: 100%">
        <el-table-column prop="title" label="title" width="250"></el-table-column>
        <el-table-column prop="content" label="content"></el-table-column>
        <el-table-column prop="time" label="time"></el-table-column>
        <el-table-column label="操作" width="150">
        <template slot-scope="scope">
        <el-button
          @click.native.prevent="mixDelete(scope)"
          type="text"
          size="small"> 
            删除
        </el-button>
        <el-button
          @click.native.prevent="passageRemix(scope)"
          type="text"
          size="small"> 
            编辑
        </el-button>
        </template> 
      </el-table-column>
      </el-table>
      <div class="block">
          <br>
                <el-pagination
                    layout="prev, pager, next"
                    :total="total"
                    @current-change="CurrentChange"
                    :current-page="page"
                    :page-size="pageSize">
                </el-pagination>
                </div>
      </div>
  
</template>

<script>
import axios from 'axios'

export default {
    name:'Passage_mix',
    data(){
        return{
            boredWord:[],
            mixID:-1,
            deleteID:-1,
            // showmix:[],
            token:'',
            page:0,
            total:0,
            pageSize:6,
            

        }
    },
    methods:{
        passageRemix(store){
            // this.mixID=store.$index
            // console.log(this.mixID);
            // this.passageShow=!this.passageShow
           this.$message.success('正在跳转到相应文章，请稍等片刻')
             axios.get('http://121.4.187.232:8080/passage/queryAllPassage?pageNo=1&pageSize=6')
            .then((g)=>{
                // console.log(g)
                this.mixID=g.data.passageItem[store.$index].id
                // console.log(this.mixID);
                this.$router.push({
                    path:'/hout_admin/mixing',
                    query:{
                        ID:this.mixID
                    }
                    })
                    // console.log(this.mixID);
        //             this.fullscreenLoading = true;
        // setTimeout(() => {
        //   this.fullscreenLoading = false;
        // }, 2000);
                this.$message.success('你已成功进入这篇文章的编辑页面')

                    
                
            })
           
        },
        mixDelete(store){
            this.token=window.localStorage.getItem('admintorToken')
            this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    axios.get('http://121.4.187.232:8080/passage/queryAllPassage?pageNo='+this.page+'&pageSize=6')
                    .then((g)=>{
                        this.deleteID=g.data.passageItem[store.$index].id
                    axios({
                        method:'post',
                        url:'http://121.4.187.232:8080/admin/deletePassage?passageID='+this.deleteID,
                        headers:{
                            token:this.token
                        }
                    }).then((g)=>{
                        console.log(g);
                    })
                    })
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                    });
        },
        getAllUser(page) {
            this.page = page
            axios.get('http://121.4.187.232:8080/passage/queryAllPassage?pageNo='+this.page+'&pageSize=6')
            .then(res => {
            this.boredWord= res.data.passageItem
            // console.log(this.page);
            })
        },
        CurrentChange(currentPage){
            this.page = currentPage;
            this.getAllUser(this.page)//点击第几页
            // console.log(currentPage); 
            console.log(this.page);
        },
        
    },
    created:
    function(){
            axios.get('http://121.4.187.232:8080/passage/queryAllPassage?pageNo=1&pageSize=6')
            .then((g)=>{
                // console.log(g)
                this.boredWord=g.data.passageItem
                this.total=g.data.passageItemCount
            
            })
        },
        updated:
        function(){
            axios.get('http://121.4.187.232:8080/passage/queryAllPassage?pageNo='+this.page+'&pageSize=6')
            .then((g)=>{
                // console.log(g)
                this.boredWord=g.data.passageItem
                this.total=g.data.passageItemCount
            })
        }
}
</script>

<style>
.passageMixdiv{
    background-color: white;
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
     border-radius: 4px;
     font-size: 15px;
     padding: 10px 15px;
}
</style>