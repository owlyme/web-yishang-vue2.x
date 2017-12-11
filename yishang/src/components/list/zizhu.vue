<template>
	<div id="zizhu" >
		<!-- 加工单编辑 -->
		<h3 class="text-center padding-top-bottom">加工单编辑</h3>
		<el-form ref="form" :model="zizhuForm" label-width="16.667%" >
			<div class="padding-left-right ">
				<el-form-item label="订单名称">
				    <el-input v-model="zizhuForm.name" placeholder="建议类目+面料+公司+日期"></el-input>
				  </el-form-item>
				  <el-form-item label="面料属性大类" >
				    <el-select v-model="zizhuForm.region" placeholder="面料属性大类" style="width:100%">
				      <el-option label="针织" value="zhengzhi"></el-option>
				      <el-option label="梭织" value="suozhi"></el-option>
				      <el-option label="毛衫" value="maoshan"></el-option>
				      <el-option label="牛仔" value="liuzai"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="服装品类类目" >
				    <el-select v-model="zizhuForm.region" placeholder="服装品类类目" style="width:100%">
				      <el-option label="针织" value="zhengzhi"></el-option>
				      <el-option label="梭织" value="suozhi"></el-option>
				      <el-option label="毛衫" value="maoshan"></el-option>
				      <el-option label="牛仔" value="liuzai"></el-option>
				    </el-select>
				  </el-form-item>
				  <el-form-item label="加工模式">
				    <el-radio-group v-model="zizhuForm.resource">
				      <el-radio label="前加工"></el-radio>
				      <el-radio label="全加工"></el-radio>
				      <el-radio label="后加工"></el-radio>
				    </el-radio-group>
		 		</el-form-item>
			</div>		  
			<!-- 颜色数量 -->		
			<ColorAndNumber class="padding-left-right border-top padding-top-bottom" colorNumber="zizhuForm.colorNumber" v-on:setColor="getColornumber"></ColorAndNumber>	
			<!-- 加工详情与信息-->
			<Date class="padding-left-right border-top padding-top-bottom" v-on:setPeriod="getPeriod"></Date>
			<!-- 上传图片 -->
			<Imgupload class="padding-left-right border-top padding-top-bottom" v-on:setClothePic="getClothePic"></Imgupload>		
			<!-- 品质要求 quality -->
			<Quality class="padding-left-right border-top padding-top-bottom" v-on:setQuality="getQuality"></Quality>	
			<!-- 面料 -->
			<Fabric class="padding-left-right border-top padding-top-bottom" v-on:setFabric="getFabric"></Fabric>
			<!-- 其他要求1 -->
			<About class="padding-left-right border-top padding-top-bottom" v-on:setAbout="getAbout"></About>
			<!-- 收货人信息 -->
			<Pay class="padding-left-right border-top padding-top-bottom" v-on:setNewAddr="getNewAddr"></Pay>
			<!-- 提交订单 -->
			<div class="padding-left-right border-top padding-top-bottom text-center">
				<el-button type="primary" @click="onSubmit">自主发单</el-button>
			    <el-button >保存草稿</el-button>
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

import { mapGetters } from 'vuex'

export default {
name: "zizhu",
components: { ColorAndNumber,Quality, Date, Imgupload, Pay, Fabric, About },
data () {
	return {
		zizhuForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',

          colorNumber: {},


        },
        formInline: {
          user: '',
          region: ''
        },
        imageUrl: null,
		types: [
	        'text', 'password', 'email', 'number', 'url','tel', 'date', `time`, 'range', 'color'
	      ],
	   	activeNames: ['1'],
	   	value:null,
	}
},
mounted(){
	
},
methods:{	
    onSubmit() {
        console.log(this.zizhuForm.colorNumber);
    },
    getWorkSheet(val){
    	console.log(val)
    },    
    getColornumber(val){
    	console.log(val)
    },
    getPeriod(val){
    	console.log(val)
    },
    getUploadImg(val){
    	console.log(val)
    },
    getQuality(val){
    	console.log(val)
    },
    getClothePic(val){
    	console.log(val)
    },
    getFabric(val){
    	console.log(val)
    },
    getAbout(val){
    	console.log(val)
    },
    getNewAddr(val){
    	console.log(val)
    },
   
    
}

}

</script>
<style scoped>
	.submit button{
		width: 188px;
		margin: auto 20px;
	} 
	.submit button:second-child{
		background: rgb(204,204,204);
	}
</style>