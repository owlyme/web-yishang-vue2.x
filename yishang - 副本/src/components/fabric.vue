<template>
<div class="fabric">
  <h5>面料信息</h5>
<el-form label-width="25%">
  <div v-for="(item, index) in fabricList">
    <el-form-item :label="item.label" class="bg">
      <el-input v-model="submitReceipt.fabric[index].name" placeholder="请填写您的面料名称" class="padding-right"></el-input>
      <i  v-if="index > 0" class="el-icon-delete" @click.stop="deleteFabric(index)"></i>
    </el-form-item>
    <el-row :gutter="10"  class="space padding-bottom  uploadimgs" >    
        <el-col :span="6" class="text-right text-style-sm">
          面料图片: 
        </el-col> 
        <el-col :span="14">
          <div  class="floatleft" v-if="item.showSrc" v-for='(item1, index1) in item.showSrc'>
              <img :src="item1" class="show-demo1">
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
          </el-upload>
          <el-dialog :visible.sync="item.dialogVisible" size="tiny">
              <img width="100%" :src="item.dialogImageUrl" alt="">
          </el-dialog>
        </el-col>
    </el-row>
      <el-form-item label="面料成分: " class="padding-right">
            <el-select v-model="submitReceipt.fabric[index].component_id"  placeholder="请输入您的面料成分" style="width:100%">
               <el-option 
                v-for="(item1, index1) in receiptContent.component"
                :key="'component'+index"
                :label="item1.component_name" :value="item1.component_id">
                </el-option>  
          </el-select>
      </el-form-item>
      <el-form-item label="面料克重:" class="padding-right">
        <el-input v-model="submitReceipt.fabric[index].weight"  placeholder="请输入克重">  </el-input>
        <div class="after"> 克/平方米 </div>
      </el-form-item>
      <el-form-item label="面料米重:" class="padding-right">
        <el-input v-model="submitReceipt.fabric[index].grammage"  placeholder="请输入克重">  </el-input>
        <div class="after"> 克/米 </div>
      </el-form-item>
      <el-form-item label="门幅宽度:" class="padding-right">
        <el-input v-model="submitReceipt.fabric[index].width"  placeholder="请输入克重"  style="width: 70%;">  </el-input>
        <el-radio-group v-model="submitReceipt.fabric[index].units" style="padding-left:18px">
            <el-radio  label="厘米">厘米</el-radio>
            <el-radio  label="英寸">英寸</el-radio>
        </el-radio-group>
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
  props:['receiptContent','submitReceipt'],
    data() {
      return {
        startCode: 65,
        image :  require('../assets/fabric-pic.jpg'), 
        tempList: new Array(),       
      }
    },
    computed:{
      ...mapGetters([
          'getUploadUrl'
        ]),
      actionUrl(){
        return this.getUploadUrl +'/picture/upload'
      },
      fabricList(){
        let _aboutList = this.tempList
        if( Array.isArray( this.submitReceipt.fabric )){
          this.submitReceipt.fabric.forEach( (item, index)=>{
            let list = {
                  name: '',
                  component: '',
                  grammage:'',
                  width:'',  
                  units: '',
                  weight:'',
                  imgUrls:[],
                  is_main: 0,
                  loaded: false,
                  label:'',
                  showSrc:[],
                  dialogVisible: false,
                  dialogImageUrl: false,
                  getImgUrl(val, clear){
                      if(clear){
                        item.picture.splice(0, item.picture.length)
                        val.forEach( (item1, index1)=>{
                          item.picture.push( item1 )
                        })
                      }else{
                        item.picture.push(val)
                      }
                    }
                }
            if( !_aboutList[index] ){
              console.log('aboutList ' + index)
              _aboutList.push(list)
              if( !item.picture ){ item.picture= [] }
              // if(!_aboutList[index].loaded ){
                console.log('aboutList ' + index)
                console.log('_aboutList[index].showSrc ' +_aboutList[index].showSrc)
                _aboutList[index].label = "面料" + String.fromCharCode( index+this.startCode )
                _aboutList[index].imgUrls = item.picture.slice(0, item.picture.length)
                _aboutList[index].showSrc = item.picture.length ? this.addUploadUrl(this.getUploadUrl, item.picture.slice(0, item.picture.length)): [this.image]
                console.log('_aboutList[index].showSrc ' +_aboutList[index].showSrc)
              // } 
                _aboutList[index].loaded =true 
            }
          })
        }
        return _aboutList
      }
    },
    methods: { 
      handleRemove(fileList,index) {
        let imgs = [];
        imgs = imgs.concat( this.fabricList[index].imgUrls )    
        fileList.forEach((item ,index) =>{
          imgs.push(item.response.content.url)
        })
       
        this.fabricList[index].getImgUrl( imgs.slice(0, imgs.length), true )
      },
      uploadImgeSuccess(response,index){
          if (response.status == 200 ) {
             this.fabricList[index].getImgUrl( response.content.url )
            }else{
              //response.msg
            }
      },
      handlePictureCardPreview(file,index) {
          this.fabricList[index].dialogImageUrl = file.url;
          this.fabricList[index].dialogVisible = true;
      },
      addFabric(){
          let fabric = {
                name: '',
                component: '',
                grammage:'',
                width:'',
                units: '', 
                weight:'',
                picture:[],
                is_main: 0
              }
           this.submitReceipt.fabric.push(fabric)
      },
      deleteFabric(index){
          this.submitReceipt.fabric.splice(index,1)
          this.tempList.splice(index,1)
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