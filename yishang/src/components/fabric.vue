<template>
<div class="fabric">
  <h5>面料信息</h5>

<el-form label-width="25%">
  <div v-for="(item, index) in fabricList">
    <el-form-item :label="item.label" class="bg">
      <el-input v-model="item.name" placeholder="请填写您的面料名称" class="padding-right"></el-input>
      <i  v-if="index > 1" class="el-icon-delete" @click.stop="deleteFabric(index)"></i>
    </el-form-item>
    <el-row :gutter="10"  class="space padding-bottom  uploadimgs" >    
        <el-col :span="6" class="text-right text-style-sm">
          面料图片: 
        </el-col> 
        <el-col :span="14">
          <div  class="floatleft" v-if="item.showSrc">
              <img :src="item.showSrc" class="show-demo1">
            </div>  
        <el-upload    
          class="floatleft"          
              ref="fabric"
                :action="actionUrl"
                
                list-type="picture-card"
                :on-preview="(file) =>{ return  handlePictureCardPreview(file, index)}"
                :on-success="(response, file, fileList) =>{ return  uploadImgeSuccess(response, index)}"            
                :on-remove="(file, fileList) =>{ return  handleRemove(fileList, index)}">
                <span  slot="trigger" class="remind" >点击上传</span>
                <!-- <el-button class="click-submit"  @click="submitImg(index)">点击上传</el-button> -->
          </el-upload>
          <el-dialog :visible.sync="item.dialogVisible" size="tiny">
              <img width="100%" :src="item.dialogImageUrl" alt="">
          </el-dialog>
        </el-col>
    </el-row>
      <el-form-item label="要求信息:" v-if=" !item.is_main" style="width:96%">
          <el-input type="textarea" v-model="item.requirement"></el-input>
      </el-form-item>
      <el-form-item label="面料成分: " class="padding-right">
          <el-select v-model="item.component" placeholder="请输入您的面料成分" style="width:100%">
               <el-option 
                  v-for="(item, index) in component"
                :key="'component'+index"
                :label="item.component_name" :value="item.component_id">
                </el-option>            
          </el-select>
      </el-form-item>
      <el-form-item label="面料类型:" class="padding-right">
          <el-select v-model="item.category" placeholder="请输入您的面料类型" style="width:100%">
             <el-option 
                v-for="(item, index) in category"
                :key="'category'+index"
                :label="item.category_name" :value="item.category_id">
                </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="面料克重:" class="padding-right">
        <el-input v-model="item.weight" placeholder="请输入克重">  </el-input>
        <div class="after"> 克/平方米 </div>
      </el-form-item>
    </div>
</el-form>
  <div class="middle-line">
      <el-button type="primary" icon="el-icon-plus" @click="addFabric" class="circle-btn"></el-button>
  </div>
</div> 
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  props:['component','category'],
    data() {
      return {
        index: 2,
        form: {
          name: '',
          component: '',
          delivery: false,
          imgUrl:'',
          weight:''
        },
        fabricList:[
          {
            is_main: 1,
            label:'主面料1名称:',
            showSrc:require('../assets/fabric-pic.jpg'),
            name: '',
            requirement:'',
            component: '',
            category:'',
            picture:[],
            weight:'',                
            dialogVisible: false,
            dialogImageUrl: false,
          },
          {
            is_main: 0,
            label:'辅面料1名称:',
            name: '',
            showSrc:require('../assets/fabric-pic.jpg'),  
            requirement:"",
            component: '',
            category:'',
            picture:[],
            weight:'',
            dialogVisible: false,
            dialogImageUrl: false,
          }
        ],
      }
    },
    computed:{
        ...mapGetters([
            'getUploadUrl'
          ]),
        actionUrl(){
          return this.getUploadUrl +'/picture/upload'
        }
      },
    watch:{
      fabricList:{
        handler(curVal,oldVal){
            this.$emit("setFabric",curVal)
    　　　},
    　　　deep:true
      }
    },
    methods: { 
    handleRemove(fileList,index) {
          if(!this.fabricList[index].picture.length) return;
            let imgs = [];
          fileList.forEach((item ,index) =>{
            imgs.push(item.response.content.url)
          })
          this.fabricList[index].picture = imgs.slice(0, imgs.length)
        },
        uploadImgeSuccess(response,index){
            if (response.status == 200 ) {
               this.fabricList[index].picture.push(response.content.url)
              }else{
                //response.msg
              }
        },
        handlePictureCardPreview(file,index) {
            this.fabricList[index].dialogImageUrl = file.url;
            this.fabricList[index].dialogVisible = true;
        },      
            
     // handleRemoveSingle(file,index) {
     //      this.fabricList[index].picture = ''
     //    },          
     //    uploadImgeSuccessSingle(response, index){
     //        if (response.status == 200 ) {
     //           this.fabricList[index].picture = response.content.url
     //          }else{
     //            //response.msg
     //          }
     //    },
     //    handlePictureCardPreviewSingle(file,index) {
     //        this.fabricList[index].dialogImageUrl = file.url;
     //        this.fabricList[index].dialogVisible = true;
     //    },
     //      submitImg(index) {
     //        this.$refs.fabric[index].submit();
     //    },    
      addFabric(){
          let fabric = {
                label:'',
                name: '',
                requirement:"",
                component: '',
                category:'',
                delivery: false,
                picture:[],
                weight:'',
                dialogVisible: false,
                dialogImageUrl: false,
              }
              fabric.label= "辅面料" + (this.index++) + "名称:";
             // console.log(fabric)
          this.fabricList.push(fabric)
        },
        deleteFabric(index){
          this.index--
          this.fabricList.splice(index,1)
        }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.after{
  position: absolute;
  top: 0px;
  right: 20px;
  font-size: 1.1em;
}
.bg{
  background: rgb(204,204,204);
  padding: 10px;
  padding-top: 15px;
}
 .el-icon-delete{
  position: absolute;
  margin-left: 10px;
  right: 0;
  top: 10px;
}
.el-icon-delete:hover{
  color: #C44DDC;
}
  .show-demo1{
    border:1px solid #e0e0e0;
    height: 145px;
    width: 145px;
  }
  .floatleft{
    float: left;
    margin-right: 10px;
  }
</style>