<template>
<div class="fabric">
  <h5>面料信息</h5>

<el-form label-width="25%">
  <div v-for="(item, index) in fabricList">
    <el-form-item :label="item.label" class="bg">
      <el-input v-model="item.name" placeholder="请填写您的面料名称" class="padding-right"></el-input>
      <i  v-if="index > 1" class="el-icon-delete" @click.stop="deleteFabric(index)"></i>
    </el-form-item>
    <el-row :gutter="10"  class="space padding-bottom" >    
        <el-col :span="6" class="text-right text-style-sm">
          面料图片: 
        </el-col> 
        <el-col :span="14">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <span class="remind">点击上传</span>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        </el-col>
    </el-row>
      <el-form-item label="面料成分: " class="padding-right">
          <el-select v-model="item.component" placeholder="请输入您的面料成分" style="width:100%">
             <el-option 
                  v-for="(item, index) in category"
                :key="'category'+index"
                :label="item.category_name" :value="item.category_id">                  
                </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="面料类型:" class="padding-right">
          <el-select v-model="item.type" placeholder="请输入您的面料类型" style="width:100%">
             <el-option 
                  v-for="(item, index) in component"
                :key="'category'+index"
                :label="item.component_name" :value="item.component_id">
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
export default {
  props:['component','category'],
    data() {
      return {
        dialogVisible: false,
        dialogImageUrl: false,
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
            label:'主面料1名称:',
            name: '',
            component: '',
            delivery: false,
            imgUrl:'',
            weight:''
          },
          {
            label:'辅面料1名称:',
            name: '',
            component: '',
            delivery: false,
            imgUrl:'',
            weight:''
          }
        ]
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
      handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        addFabric(){
          let fabric = {
                label:'',
                name: '',
                component: '',
                delivery: false,
                imgUrl:'',
                weight:''
              }
              fabric.label= "辅面料" + (this.index++) + "名称:";
              console.log(fabric)
          this.fabricList.push(fabric)
        },
        deleteFabric(index){
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
</style>