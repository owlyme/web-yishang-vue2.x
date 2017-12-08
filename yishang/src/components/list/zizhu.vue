<template>
	<div id="zizhu">
		<!-- 加工单编辑 -->
		<h3>加工单编辑</h3>
		<el-form ref="form" :model="form" label-width="16.667%">
		  <el-form-item label="订单名称">
		    <el-input v-model="form.name" placeholder="建议类目+面料+公司+日期"></el-input>
		  </el-form-item>
		  <el-form-item label="面料属性大类" >
		    <el-select v-model="form.region" placeholder="面料属性大类" style="width:100%">
		      <el-option label="针织" value="zhengzhi"></el-option>
		      <el-option label="梭织" value="suozhi"></el-option>
		      <el-option label="毛衫" value="maoshan"></el-option>
		      <el-option label="牛仔" value="liuzai"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="服装品类类目" >
		    <el-select v-model="form.region" placeholder="服装品类类目" style="width:100%">
		      <el-option label="针织" value="zhengzhi"></el-option>
		      <el-option label="梭织" value="suozhi"></el-option>
		      <el-option label="毛衫" value="maoshan"></el-option>
		      <el-option label="牛仔" value="liuzai"></el-option>
		    </el-select>
		  </el-form-item>
		  <el-form-item label="加工模式">
		    <el-radio-group v-model="form.resource">
		      <el-radio label="前加工"></el-radio>
		      <el-radio label="全加工"></el-radio>
		      <el-radio label="后加工"></el-radio>
		    </el-radio-group>
		  </el-form-item>
		<!-- 颜色数量 -->		
		<ColorAndNumber ></ColorAndNumber>		
		<!-- 加工详情与信息-->
		<Date></Date>
		<!-- 上传图片 -->
		<Imgupload></Imgupload>		
		<!-- 品质要求 quality -->
		<Quality></Quality>	
		<!-- 面料 -->
		<Fabric></Fabric>
		<!-- 其他要求1 -->
		<About></About>
		<!-- 收货人信息 -->
		<Pay></Pay>
		<!-- 提交订单 -->
		<div class="submit">
			<el-button type="primary" @click="onSubmit">立即创建</el-button>
		    <el-button>取消</el-button>
		  </el-form-item>
		</div>
		   
		</el-form>		

		
	</div>
</template>

<script>

import ColorAndNumber from "../colorAndNumber"
import Quality from "../quality"
import Date from "../date"
import Imgupload from "../imgupload"
import Pay from "../payAndAddr"
import Fabric from "../fabric"
import About from "../about"


export default {
name: "zizhu",
components: { ColorAndNumber,Quality, Date, Imgupload, Pay, Fabric, About },
data () {
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
        },
        formInline: {
          user: '',
          region: ''
        },
       

		imageUrl: null,
		types: [
	        'text', 'password', 'email', 'number', 'url',
	        'tel', 'date', `time`, 'range', 'color'
	      ],
	   	activeNames: ['1'],
	   	value:null,
	}
},
mounted(){
	
},
methods:{
	
      onSubmit() {
        console.log('submit!');
      }
     

}

}

</script>
<style scoped>



</style>