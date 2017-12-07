<template>
	<div id="zizhu">
		<h3>加工单编辑</h3>
		<b-container fluid>
		    <b-row class="my-1" v-for="type in types" :key="type">
		      <b-col cols="3"><label :for="`type-${type}`">Type {{ type }}:</label></b-col>
		      <b-col cols="9"><b-form-input :id="`type-${type}`" :type="type"></b-form-input></b-col>
		    </b-row>
		</b-container>
	
		<h5>颜色数量</h5>
		<ColorAndNumber></ColorAndNumber>
		
		<el-upload
			class="avatar-uploader"
			action="https://jsonplaceholder.typicode.com/posts/"
			:show-file-list="false"
			:on-success="handleAvatarSuccess"
			:before-upload="beforeAvatarUpload">
			<img v-if="imageUrl" :src="imageUrl" class="avatar">
			<i v-else class="avatar-uploader-icon">点击上传</i>
		</el-upload>

		<div class="block">
		    <span class="demonstration">默认</span>
		    <el-date-picker
		      v-model="value"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
				  </div>
		</el-upload>
	</div>
</template>

<script>

import ColorAndNumber from "../colorAndNumber"

export default {
name: "zizhu",
components: { ColorAndNumber },
data () {
	return {
		imageUrl: null,
		types: [
	        'text', 'password', 'email', 'number', 'url',
	        'tel', 'date', `time`, 'range', 'color'
	      ],
	   	activeNames: ['1'],
	   	value:null,
	}
},
methods:{
     handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
     

}

}

</script>
<style scoped>
	.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>