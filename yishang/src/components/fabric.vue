<template>
<div class="fabric">
  <h5>面料信息</h5>

<el-form ref="form" :model="form" label-width="16.67%">
  <el-form-item label="主面料1名称">
    <el-input v-model="form.name" placeholder="请填写您的面料名称"></el-input>
  </el-form-item>

  <el-row :gutter="10"  class="space padding-bottom" >    
      <el-col :span="4">
        上传说明图片:
      </el-col> 
      <el-col :span="16">
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
    <el-form-item label="面料成分" >
        <el-select v-model="form.region" placeholder="请输入您的面料成分" style="width:100%">
          <el-option label="针织" value="zhengzhi"></el-option>
          <el-option label="梭织" value="suozhi"></el-option>
          <el-option label="毛衫" value="maoshan"></el-option>
          <el-option label="牛仔" value="liuzai"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="面料类型" >
        <el-select v-model="form.region" placeholder="请输入您的面料类型" style="width:100%">
          <el-option label="针织" value="zhengzhi"></el-option>
          <el-option label="梭织" value="suozhi"></el-option>
          <el-option label="毛衫" value="maoshan"></el-option>
          <el-option label="牛仔" value="liuzai"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="面料克重">
      <el-input v-model="form.name" placeholder="请输入克重">
        克/平方米
      </el-input>

    </el-form-item>
</el-form>
</div> 
</template>

<script>
export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    watch:{
      diffKind:{
        handler(curVal,oldVal){
    　　　　　　　　//console.log(curVal)
            // colorNumber = curVal
            this.$emit("setColor",curVal)
    　　　　　　},
    　　　　deep:true
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>