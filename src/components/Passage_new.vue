<template>
<div >
    <h3>创建一篇新文章</h3>
    
       <el-form :label-position="labelPosition" label-width="80px" >
        <el-form-item label="title">
            <el-input v-model="newTitle" placeholder="请输入你的标题" clearable></el-input>
        </el-form-item>
        <br>
        <el-form-item label="content">
            <el-input v-model="newContent" type="textarea" autosize placeholder="请输入你的内容" clearable></el-input>
        </el-form-item>
        <br>
        <!-- <el-form-item label="活动形式">
            <el-input v-model="formLabelAlign.type"></el-input>
        </el-form-item>-->
       <el-form-item label="pictures">
        <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :on-change="onUploadChange"
            :file-list="fileList">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
       </el-form-item>
       <br>
       <br>
       <el-form-item>
            <el-upload
                class="upload-demo"
                ref="upload"
                action=''
                :on-remove="handleremove"
                :file-list="filelist"
                :auto-upload="false"
                :on-exceed="exceedFile"
                :on-change="fileChange"
                :before-upload="beforeUploadFile"
                :on-success="handleSuccess"
	            :on-error="handleError">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
                <div slot="tip" class="el-upload__tip">只能上传jpg/excel文件，且不超过500kb</div>
            </el-upload>
       </el-form-item>
       <br>
       <br>
       <el-form-item>
       <el-button type="primary" @click="creat">上传</el-button> 
       </el-form-item>
       </el-form>
    
</div>
</template>

<script>
import axios from 'axios'
export default {
    name:'Passage_new',
    data(){
        return{
            tolen:'',
            labelPosition: 'top',
            newTitle: '',
            newContent: '',
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            imgUrl:'',
            passageID:-1,
            fileList:[],
            files:[],
            sofiles:[],
            localfiles:[],
            limitNum: 1,  // 上传excell时，同时允许上传的最大数
            filelist: [],   // excel文件列表

        }
    },
    methods:{
        creat(){
            console.log(this.$refs);
            this.token=window.localStorage.getItem('admintorToken')
            axios({
                method:'post',
                url:'http://121.4.187.232:8080/admin/createPassage?content='+this.newContent+'&title='+this.newTitle,
                headers:{
                    token:this.token
                }
            }).then((g)=>{
                console.log(g)
                this.newTitle=''
                this.newContent=''
                // console.log(g.data);
                axios.get('http://121.4.187.232:8080/passage/queryAllPassage?pageNo=1&pageSize=6')
                .then((g)=>{
                    this.passageID=g.data.passageItem[0].id
                    console.log(this.passageID); 

                    let param = new FormData()
                    param.append('passageID',this.passageID)

                    for(let i of this.files){
                        param.append('file',i)
                    }  
                    //  nsole.log(param.get('upload'));

                    axios({
                        method:'post',
                        url:'/admin/uploadImg',
                        data:param,
                        headers:{
                            "Content-Type":"multipart/form-data",
                            token:this.token
                        },
                        // responseType:'arraybuffer'
                    }).then(res=>{
                        console.log('success')
                        console.log(res)
                        this.fileList=[]
                    }).catch(err=>{
                        console.log('failed')
                    })

                    let form = new FormData()
                    form.append('passageID',this.passageID)
                    // console.log(this.fileList)
                    for(let i in this.filelist){
                        form.append('file', this.filelist[i]);
                    }
                    // form.append('file', this.filelist[i]);//有多少条数据appeng的多少次
                    axios.post("/admin/uploadResources", form, {headers: {'Content-type': 'multipart/form-data',token:this.token}}).then(res => {
                        console.log(res)
                        this.$message({
                            type: "success",
                            message: "导入成功"
                        });
                        this.filelist= []
                    }).catch(err => {
                        console.log(err)
                    })
                    
                })
                // if(g.status=200){
                //     this.$message.success('上传文章成功')  
                //     this.newContent=""
                //     this.newTitle=""
                // }else
                //     this.$message.error('上传文章失败')
            })

        },
         handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        console.log(this.dialogImageUrl);
        this.dialogVisible = true;
      },
      handleRemove(file, fileList) {
        console.log(file);
        console.log(fileList);
        // 1.找到索引值
        const i = this.files.findIndex(x => {
                return x === file.raw
        })
        console.log(i);
        // 2.删除索引所对应的值
        this.files.splice(i, 1)
      },
      handleremove(file,filelist){
          const i = this.filelist.findIndex(x=>{
            //   console.log(x===file);
              return x === file
          })
          this.filelist.splice(i,1)
          console.log(i);
      },
        onUploadChange(file){
        //     // console.log(file);
            const isIMAGE = (file.raw.type === 'image/jpeg'||file.raw.type === 'image/png'||file.raw.type === 'image/gif'||file.raw.type==='image/jpg'||file.raw.type==='image/svg');
            const isLt2M = file.size / 1024 / 1024 < 2;
     
            this.files.push(file.raw)
            console.log(this.files);

        //   console.log(file)
        // 打印出图片相关信息
      if (!isIMAGE) {
        this.$message.error('上传文件只能是图片格式!');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!');
        return false;
      }
    //   var reader = new FileReader();
    //   reader.readAsDataURL(file.raw);
    //   reader.onload = function(e){
    //     _this.imgUrl = this.result
        // console.log(_this.imgUrl)//图片的base64数据
        // console.log(this.result);
    //   }
    },
      // 文件超出个数限制时的钩子
      exceedFile(files, filelist) {
        this.$message.warning(`只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`);
      },
        // 文件状态改变的钩子
      fileChange(file,filelist) {
        console.log(file);
        console.log(filelist);
        this.filelist.push(file.raw) ;
        // this.sofiles=this.filelist  
        // console.log(this.sofiles);
      },
      // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
      beforeUploadFile(file) {
        // console.log('before upload');
        // console.log(file);
        let extension = file.name.substring(file.name.lastIndexOf('.')+1);
        let size = file.size / 1024 / 1024;
        if(extension !== 'xlsx') {
          this.$message.warning('只能上传后缀是.xlsx的文件');
        }
        if(size > 10) {
          this.$message.warning('文件大小不得超过10M');
        }
      },
      // 文件上传成功时的钩子
      handleSuccess(res, file, filelist) {
        this.$message.success('文件上传成功');
      },
        // 文件上传失败时的钩子
      handleError(err, file, filelist) {
        this.$message.error('文件上传失败');
      },

    },


      
        // 上传文件
       
 
       
  

}
</script>

<style>
.el-form{
    background-color: white;
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
     border-radius: 4px;
     font-size: 15px;
     padding: 10px 15px;
     position: relative;

}
</style>