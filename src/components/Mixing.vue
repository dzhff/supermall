<template>
  <div >
      <h3>更新文章</h3>
      <!-- <div class="mixingdiv"> -->
       <el-form :label-position="labelPosition" label-width="80px" >
        <el-form-item label="title">
            <el-input v-model="mixTitle" clearable></el-input>
        </el-form-item>
         <br>
        <el-form-item label="content">
            <el-input v-model="mixContent" type="textarea" autosize clearable></el-input>
        </el-form-item>
        <br>
        <el-form-item label="picture">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleremove"
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
        <el-form-item label="资源">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-remove="handleremove"
              multiple
              :file-list="filelist"
              :auto-upload="false"
              :on-change="onUpload_Change">
              <el-button size="small" type="primary">点击上传资源</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
       </el-form-item>
       <br>
       <br>
       <el-form-item>
       <el-button type="primary" @click="mixCreat">上传</el-button> 
       </el-form-item>
       </el-form>
      <!-- </div> -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'Mixing',
    data(){
      return{
        ID:-1,
        token:'',
        labelPosition: 'top',
        mixTitle:'',
        mixContent:'',
        mixpicture:[],
        dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            imgUrl:'',
            passageID:-1,
            fileList:[],
            files:[],
            upfiles:[],
            pictures:[],
            base:[],
            localfiles:[],
            doneList:[],
            limitNum: 1,  // 上传excell时，同时允许上传的最大数
            filelist: [],   // excel文件列表
            // fullscreenLoading: false
            sources:[],
            upsources:[],
            sofiles:[],
            sodonefiles:[],
            undonefiles:[],
            sofilelist:[],
            upsofiles:[],
            solocal:[],
            upsolocal:[]


      }
    },
    methods:{
      mixCreat(){
        this.token=window.localStorage.getItem('admintorToken')
        if(this.mixContent!==''&&this.mixTitle!==''){
        axios({
          method:'post',
          url:'http://121.4.187.232:8080/admin/updatePassage?content='+this.mixContent+'&passageID='+this.ID+'&title='+this.mixTitle,
          headers:{
            token:this.token
          }
        }).then((g)=>{
          console.log(g);
          // this.mixTitle=""
          // this.mixContent=""
          this.$message.success('更新文章成功')
                      // if(this.localfiles[g].status=="ready"){
                          let param = new FormData()
                          param.append('passageID',this.ID)
                       
                    // for(let e of this.upfiles){
                    //       i.push()
                        for(let e in this.doneList){
                          console.log(this.doneList);
                          if(this.doneList[e]){
                             this.files.push(this.doneList[e])
                          }
                        }
                        console.log(this.doneList);
                        console.log(this.files);
                        for(let i of this.files){
                            param.append('file',i)
                            console.log(param);
                            console.log(this.files);
                            //  console.log(param.getAll('file'));
                        }
                         axios({
                        method:'post',
                        url:'/admin/uploadImg',
                        data:param,
                        headers:{
                            "Content-Type":"multipart/form-data",
                            token:this.token
                        },
                        responseType:'arraybuffer'
                    }).then(res=>{
                        console.log('success')
                        console.log(res)
                      for(let i in this.undonefiles){
                        if(this.undonefiles[i]){
                          this.upsofiles.push(this.undonefiles)
                        }
                      };
                      console.log(this.undonefiles);
                      console.log(this.upsofiles);

                      let soparam = new FormData()
                      soparam.append('passageID',this.ID) 
                      
                      for(let i in this.upsofiles){
                        soparam.append('file',this.upsofiles[i])
                      }

                      axios.post("/admin/uploadResources", soparam, {headers: {'Content-type': 'multipart/form-data',token:this.token}}).then(res => {
                        console.log(res)
                        this.$message({
                            type: "success",
                            message: "导入成功"
                        });
                        // this.filelist= []
                    }).catch(err => {
                        console.log(err)
                    })



                        
                    }).catch(err=>{
                        console.log('failed')
                    })
                    
                    
        })
        }else{
          if(this.mixTitle==''){
            this.$message.error('标题还没有写呢')
          }else{
            if(this.mixContent==''){
              this.$message.error('内容还没有写呢')
            }
          }
          // this.$message.error('不能输入空白值')
        }
        this.$router.go(-1)
      },
      handleRemove(file,fileList) {

                // 找到索引值
              
                let i = this.files.findIndex(x => {
                return x === file.raw
        })
        if(i>=0){
           console.log(i);
        // 2.删除索引所对应的值
        this.files.splice(i, 1)
        this.$message.success('删除图片成功')
        }else{
             const e = this.upfiles.findIndex(x =>{
            return x ===  file
          })
          console.log(e);
          this.upfiles.splice(e,1)
          console.log(this.upfiles);
          let imgID=this.upfiles[e].imgID
          console.log(imgID);
          this.token=window.localStorage.getItem('admintorToken')
          axios({
            method:'post',
            url:'http://121.4.187.232:8080/admin/deleteImg?imgID='+imgID,
            headers:{
              token:this.token
            }
          }).then((g)=>{
            console.log(g);
            this.$message.success('删除图片成功')

          })
        }
       
        
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
              base64ToBlob ({b64data = '', contentType = '', sliceSize = 512} = {}) {
          return new Promise((resolve, reject) => {
            // 使用 atob() 方法将数据解码
            let byteCharacters = atob(b64data);
            let byteArrays = [];
            for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
              let slice = byteCharacters.slice(offset, offset + sliceSize);
              let byteNumbers = [];
              for (let i = 0; i < slice.length; i++) {
                  byteNumbers.push(slice.charCodeAt(i));
              }
              // 8 位无符号整数值的类型化数组。内容将初始化为 0。
              // 如果无法分配请求数目的字节，则将引发异常。
              byteArrays.push(new Uint8Array(byteNumbers));
            }
            let result = new Blob(byteArrays, {
              type: contentType
            })
            result = Object.assign(result,{
              // 这里一定要处理一下 URL.createObjectURL
              preview: URL.createObjectURL(result),
              name: `XXX.png`
            });
            resolve(result)
          })
        },
            onUploadChange(file,fileList){
              console.log(file);
              const isIMAGE = (file.raw.type === 'image/jpeg'||file.raw.type === 'image/png'||file.raw.type === 'image/gif'||file.raw.type==='image/jpg'||file.raw.type==='image/svg');
              const isLt2M = file.size / 1024 / 1024 < 2;
            
                     this.files.push(file.raw)
                     console.log(file.raw);
                     console.log(this.files);
                     console.log(fileList);
                     console.log(this.fileList);

                  for(let i in this.fileList){
                    this.doneList.push(this.fileList[i].raw)
                  }
                  console.log(this.doneList);
                  
            if (!isIMAGE) {
              this.$message.error('上传文件只能是图片格式!');
              return false;
            }
            if (!isLt2M) {
              this.$message.error('上传文件大小不能超过 2MB!');
              return false;
            }
    },
          handleremove(file,filelist){
          //  return this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          //       confirmButtonText: '确定',
          //       cancelButtonText: '取消',
          //       type: 'warning'
          //       }).then(()=>{

                   let i = this.upsofiles.findIndex((x)=>{
              return x===file.raw
            })
            if(i>=0){
              console.log(i);
              this.upsofiles.splice(i,1)
              console.log(this.upsofiles);
              this.$message.success('删除资源成功')
            }else{
              const e = this.upsolocal.findIndex((x)=>{
                return x===file
              })
              console.log(this.upsolocal);
              let resourcesID=this.upsolocal[e].sourID
              this.upsolocal.splice(e,1)
              this.token=window.localStorage.getItem('admintorToken')
              axios({
                method:'post',
                url:'http://121.4.187.232:8080/admin/deleteResources?resourcesID='+resourcesID,
                headers:{
                  token:this.token
                }
              }).then((g)=>{
                console.log(g);
                this.$message.success('删除资源成功')
              })
              
              console.log(resourcesID);
              console.log(e);

            }
                // })
           
            
            
          },
          onUpload_Change(file,filelist){
            console.log(file.raw);
            // console.log(filelist);
            this.sofilelist=filelist
            // console.log(this.sofilelist);
            // console.log(this.filelist);

            this.upsofiles.push(file.raw)
            // console.log(this.upsofiles);
              for(let i in this.sofilelist){
                this.undonefiles.push(this.sofilelist[i].raw)
              }
              // console.log(this.undonefiles);
          }

///////////////////////////////////////////////////////////////////////////////


    //  // 文件超出个数限制时的钩子
    //   exceedFile(files, filelist) {
    //     this.$message.warning(`只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`);
    //   },
    //     // 文件状态改变的钩子
    //   fileChange(file,filelist) {
    //     // console.log(file);
    //     this.filelist.push(file.raw) ;
    //   },
    //   // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    //   beforeUploadFile(file) {
    //     // console.log('before upload');
    //     // console.log(file);
    //     let extension = file.name.substring(file.name.lastIndexOf('.')+1);
    //     let size = file.size / 1024 / 1024;
    //     if(extension !== 'xlsx') {
    //       this.$message.warning('只能上传后缀是.xlsx的文件');
    //     }
    //     if(size > 10) {
    //       this.$message.warning('文件大小不得超过10M');
    //     }
    //   },
    //   // 文件上传成功时的钩子
    //   handleSuccess(res, file, filelist) {
    //     this.$message.success('文件上传成功');
    //   },
    //     // 文件上传失败时的钩子
    //   handleError(err, file, filelist) {
    //     this.$message.error('文件上传失败');
    //   },


    },
    created:
    function(){
      this.ID=this.$route.query.ID
        axios.get('http://121.4.187.232:8080/passage/passageResources?passageID='+this.ID)
        .then((g)=>{
          // console.log(g)
          this.mixTitle=g.data[0].title
          this.mixContent=g.data[0].content
          this.pictures=g.data[2]
            this.sources=g.data[1]
            // console.log(this.sources)

            for(let i in this.sources){
                // console.log(this.sources[i].id);
               axios({
        method: "post",
        url: `http://121.4.187.232:8080/passage/downResources?filePath=${this.sources[i].address}`,
        headers:{
              // 'Content-type': 'application/octet-stream',
              token:this.token
            },
        responseType: "blob",
        }).then((res) => {
          console.log(res)
          this.filelist.push({
            name:res.config.url,
            url:res.config.url,
            sourID:this.sources[i].id
          })
          this.solocal.push(this.filelist)
          // console.log(this.solocal);
          // console.log(this.filelist);
          this.upsolocal=this.solocal[0]
          // console.log(this.upsolocal);
        })
        }
        // console.log(this.filelist);
          
        
        // console.log(this.pictures);
        for(let i in this.pictures){
          if(this.pictures[i]){
            // console.log(i);
          }
          // console.log(this.pictures);
          let base64=this.pictures[i]
          this.base64ToBlob({b64data: base64, contentType: 'image/png'}).then(res => {
          // 转后后的blob对象
          // console.log(res);
          // console.log( res.preview)
            this.fileList.push({
              url:res.preview,
              imgID:i
              })
              // console.log(this.fileList);
            this.localfiles.push(
              this.fileList,
              
              )
            this.upfiles=this.localfiles[0]
          })  
        }
        })
    },
    
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
.upload-demo{
  width: 700px;
}
.el-upload-list__item-name{
  font-size: 18px;
}
</style>