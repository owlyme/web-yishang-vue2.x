<template>
	<div id="zizhu" >
		<!-- 加工单编辑 -->
		<h3 class="text-center padding-top-bottom">加工单编辑</h3>
		<el-form ref="form" label-width="25%" >
	
			<Sheet v-on:setWorkSheet="getWorkSheet"></Sheet>
			<!-- 颜色数量 -->		
			<ColorAndNumber class="padding-left-right border-top padding-top-bottom" v-on:setColor="getColornumber"></ColorAndNumber>
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
			<Pay class="padding-left-right border-top padding-top-bottom" v-on
			zizhu='true'
			:setNewAddr="getNewAddr"></Pay>
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
import Sheet from "../workSheet"
import ColorAndNumber from "../colorAndNumber"
import Quality from "../quality"
import Date from "../date"
import Imgupload from "../imgupload"
import Pay from "../payAndAddr"
import Fabric from "../fabric"
import About from "../about"

import { mapGetters } from 'vuex'
import {setCookie,getCookie} from '../../cookies.js'

export default {
name: "zizhu",
components: { Sheet, ColorAndNumber,Quality, Date, Imgupload, Pay, Fabric, About },
data () {
	return {
		zizhuIndent: {
         	workSheet:{},
			colorNum:{},
			period:{},
			clothePic:{},
			quality:{},
			fabric:{},
			about:{},
			newAddr:{}
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
    console.log( 'zhizhu')
    if( getCookie('phone') == ''){
      this.$router.push("/login")
    }
  },
methods:{	
    // onSubmit() {
    // 	// console.log(url)
    // 	// this.$http.jsonp("http://101.132.187.244:8082/Home/User/qrcode"
	   //  //   // {//请求参数
	   //  //   //   params: {
	   //  //   //     wd:'wo'
	   //  //   //   },
	   //  //   //   jsonp:'cb'
	   //  //   // }
	   //  //   ).then(function(res){
	   //  //   	console.log(res)
	   //  //     // console.log(JSON.parse(res.bodyText).s)
	   //  //     // this.myData = JSON.parse(res.bodyText).s
	   //  //     // console.log(this.myData)
	   //  //   },function(err){
	   //  //     console.log(err)
	   //  //   });

    // // 	this.$http.get('http://www.isqzh.com/ajax')
				// // .then((response) => {
				// // 	console.log(response)
				// // 	// this.$set('gridData', response.data)
				// // })
				// // .catch(function(response) {
				// // 	console.log(response)
				// // })
    //     console.log(this.zizhuForm.colorNumber);
    // },
    onSubmit(){
    	console.log(this.zizhuIndent)
    },
    getWorkSheet(val){
    	let self = this;
    	self.$set(self.zizhuIndent, 'workSheet', val)
    	// console.log(val)
    },    
    getColornumber(val){
    	let self = this;
    	self.$set(self.zizhuIndent, 'colorNum', val)
    	// console.log(val)
    },
    getPeriod(val){
    	let self = this;
    	self.$set(self.zizhuIndent, 'period', val)
    	// console.log(val)
    },
    getClothePic(val){
    	// let self = this;
    	// self.$set(self.zizhuIndent, 'clothePic', val)
    	console.log(val)
    },
    getQuality(val){
    	let self = this;
    	self.$set(self.zizhuIndent, 'quality', val)
    	//console.log(val)
    },
    getFabric(val){
    	let self = this;
    	self.$set(self.zizhuIndent, 'fabric', val)
    	//console.log(val)
    },
    getAbout(val){
    	let self = this;
    	self.$set(self.zizhuIndent, 'about', val)
    	//console.log(val)
    },
    getNewAddr(val){
    	let self = this;
    	self.$set(self.zizhuIndent, 'newAddr', val)
    	// console.log(val)
    }
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