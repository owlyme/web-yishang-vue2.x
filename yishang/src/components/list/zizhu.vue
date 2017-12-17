<template>
	<div id="zizhu" >
		<!-- 加工单编辑 -->
		<h3 class="text-center padding-top-bottom">加工单编辑</h3>
		<el-form ref="form" label-width="25%" >
	
			<Sheet v-on:setWorkSheet="getWorkSheet" 
				:category = "receiptContent.category" 
				:cate="receiptContent.cate" 
				:mode="receiptContent.mode"
	
				></Sheet>
			<!-- 颜色数量 -->		
			<ColorAndNumber class="padding-left-right border-top padding-top-bottom" v-on:setColor="getColornumber"></ColorAndNumber>
			<!-- 加工详情与信息-->
			<Date class="padding-left-right border-top padding-top-bottom" v-on:setPeriod="getPeriod"></Date>
			<!-- 上传图片 -->
			<Imgupload class="padding-left-right border-top padding-top-bottom" v-on:setClothePic="getClothePic"></Imgupload>		
			<!-- 品质要求 quality -->
			<Quality class="padding-left-right border-top padding-top-bottom" 
				v-on:setQuality="getQuality"
				:check="receiptContent.check" 
				:error="receiptContent.error" 
			></Quality>	
			<!-- 面料 -->
			<Fabric class="padding-left-right border-top padding-top-bottom" 
				v-on:setFabric="getFabric"
				:component = "receiptContent.component"
				:category = "receiptContent.category"
			></Fabric>
			<!-- 其他要求1 -->
			<About class="padding-left-right border-top padding-top-bottom" v-on:setAbout="getAbout"></About>
			<!-- 收货人信息 -->
			<Pay class="padding-left-right border-top padding-top-bottom" 
				zizhu='true'
				:addressList="receiptContent.address"
				v-on:setNewAddr="getNewAddr"
			></Pay>
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



const receiptContent={
	cate: {// true array[object] 商品类别下拉
		cate_id:null,// true string
		cate_name:null// true string
	},
	mode:{//true array[object]  加工模式下拉
		mode_id: null,//true string
		mode_name:null// true string 
	},
	style:{// true array[object]服装类型下拉
		style_id:null,// true string
		style_name:null// true string
	},
	check:{ //true array[object]查货模式下拉
		check_id:null,// true string
		check_name:null// true string
	},
	error:{//true array[object]误差标准下拉
		error_id:null,// true string
		value:null// true string
	},
	component:{//true array[object]面料成分下拉
		component_id:null,// true string
		component_name:null,// true string
	},
	category:{//true array[object]面料类别下拉
		category_id:null,// true string
		category_name:null,// true string
	},
	address:{//true array[object]
		id:null,// true string收货人id
		receiver:null,// true string收货人
		phone:null,// true string手机号
		province:null,// true string省city true string市
		county:null,// true string区
		street:null,// true string
	}	
}	


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
		   	receiptContent:{}
		}
	},
  computed:{
      ...mapGetters([
         'getUrl'
      ]),
  },
  mounted(){
    //console.log( 'zhizhu')
    if( getCookie('phone') == ''){
      this.$router.push("/login")
    }

    let url = this.getUrl
    this.axios.post(url+'/Home/Receipt/Index?type=1').then((res)=>{
        console.log(res.data.content)
        if(res.data.status == 200){
        	this.receiptContent = res.data.content
        }else{

        }          
    }) 
  },
methods:{  
    onSubmit(){
    	//console.log(this.zizhuIndent)
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
    	console.log(val)
    },
    getClothePic(val){
    	let self = this;
    	self.$set(self.zizhuIndent, 'clothePic', val)
    	//console.log(val)
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
    	//console.log(val)
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