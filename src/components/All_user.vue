<template>
    <div>
        <h3>以下是所有用户信息</h3>
        <div class="allUserdiv">
        <div>
            <div>目前{{userTotal}}位</div>
            <el-table :data="userData" height="500" border  style="width: 100%">
                <el-table-column label="序号" type="index"  width="180"></el-table-column>
                <!-- <el-table-column prop="userId" label="userId"  width="180"></el-table-column> -->
                <el-table-column prop="username" label="username" width="180"> </el-table-column>
                <el-table-column prop="password" label="password"></el-table-column>
            </el-table>
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'All_user',
    data(){
        return{
            token:'',
            userData:[],
            userTotal:''

        }
    },
    created:
    function(){
        this.token=window.localStorage.getItem('admintorToken')
        axios({
            method:'post',
            url:'/admin/queryAllUser',
            headers:{
                token:this.token
            }
        }).then((g)=>{
            this.userData=g.data[0]
            this.userTotal=g.data[1]
            console.log(g)
            })
    }
}
</script>

<style>
.allUserdiv{
    background-color: white;
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
     border-radius: 4px;
     font-size: 15px;
     padding: 10px 15px;
}
</style>