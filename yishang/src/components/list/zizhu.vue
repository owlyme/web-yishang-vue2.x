<template>
	<div id="zizhu">
		<h3>加工单编辑</h3>
		<b-container fluid>
		    <b-row class="my-1" v-for="type in types" :key="type">
		      <b-col cols="3"><label :for="`type-${type}`">Type {{ type }}:</label></b-col>
		      <b-col cols="9"><b-form-input :id="`type-${type}`" :type="type"></b-form-input></b-col>
		    </b-row>
		</b-container>
		<hr>
		<h5>颜色数量</h5>
		<el-collapse v-model="activeNames" @change="handleChange">
		  <el-collapse-item title="一致性 Consistency" name="1">
		    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
		    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
		  </el-collapse-item>
		  <el-collapse-item title="反馈 Feedback" name="2">
		    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
		    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
		  </el-collapse-item>
		  <el-collapse-item title="效率 Efficiency" name="3">
		    <div>简化流程：设计简洁直观的操作流程；</div>
		    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
		    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
		  </el-collapse-item>
		  <el-collapse-item title="可控 Controllability" name="4">
		    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
		    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
		  </el-collapse-item>
		</el-collapse>
		<hr>

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
		      v-model="value1"
				      type="date"
				      placeholder="选择日期">
				    </el-date-picker>
				  </div>
		</el-upload>
	</div>
</template>

<script>


export default {
name: "upload",
data () {
	return {
		imageUrl: null,
		types: [
	        'text', 'password', 'email', 'number', 'url',
	        'tel', 'date', `time`, 'range', 'color'
	      ],
	   	activeNames: ['1']
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
      handleChange(){
      	
      }

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