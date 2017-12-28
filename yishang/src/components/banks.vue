<template>
	<div>
		<!-- <el-form-item label="是否支付定金:" >
		    <el-radio-group v-model="bank" style="padding-top:8px">
		      <el-radio  
		       v-for="(item, index) in bankList"
		       :key="'bank'+ index"
		       :label="item.id">
		       			{{item.name}}       
		       		<img :src="item.logo" class="banklogo">		
		       </el-radio>
		    </el-radio-group>
		</el-form-item> -->
			<div class="bank-box">
				<label v-for="(item, index) in bankList"
		      			:key="'bank'+ index"
		       			:label="item.id" 
		       			@click="selected(index)"
		       			:class="{checked: item.check}"
		       			class="inputLabel">
					<input type="radio" name="bank" :value="index" v-model="bank">
					<span class="banklogo">{{item.name}}</span>
				</label>
			</div>		
	</div>
</template>
<script >

export default{
	data(){
		return{
			bank: "",
			bankList:[
				{
					name:'工商银行',
					id:'1',
					check:false,
					flag: false,
					// logo: require('../assets/banks/gongshang.jpg')
				},
				{
					name:'建设银行',
					id:'2',
					check:false,
					flag: false,
					// logo: require('../assets/banks/gongshang.jpg')
				},
				{
					name:'农业银行',
					id:'1',
					check:false,
					flag: false,
					// logo: require('../assets/banks/gongshang.jpg')
				},
				{
					name:'招商银行',
					id:'1',
					check:false,
					flag: false,
					// logo: require('../assets/banks/gongshang.jpg')
				},
				{
					name:'光大银行',
					id:'1',
					check:false,
					flag: false,
					// logo: require('../assets/banks/gongshang.jpg')
				},
				{
					name:'民生银行',
					id:'1',
					check:false,
					flag: false,
					// logo: require('../assets/banks/gongshang.jpg')
				},
				{
					name:'中兴银行',
					id:'1',
					check:false,
					flag: false,
					// logo: require('../assets/banks/gongshang.jpg')
				},
				{
					name:'兴业银行',
					id:'1',
					check:false,
					flag: false,
					// logo: require('../assets/banks/gongshang.jpg')
				},
				{
					name:'浦东银行',
					id:'1',
					check:false,
					flag: false,
					// logo: require('../assets/banks/gongshang.jpg')
				},
				{
					name:'平安银行',
					id:'1',
					check:false,
					flag: false,
					// logo: require('../assets/banks/gongshang.jpg')
				},
				{
					name:'华夏银行',
					id:'1',
					check:false,
					flag: false,
					// logo: require('../assets/banks/gongshang.jpg')
				},
				{
					name:'宁波银行',
					id:'1',
					check:false,
					flag: false,
					// logo: require('../assets/banks/gongshang.jpg')
				},
				{
					name:'东亚银行',
					id:'1',
					check:false,
					flag: false,
					// logo: require('../assets/banks/gongshang.jpg')
				},
				{
					name:'上海银行',
					id:'1',
					check:false,
					flag: false,
					// logo: require('../assets/banks/gongshang.jpg')
				},
				{
					name:'邮政银行',
					id:'1',
					check:false,
					flag: false,
					// logo: require('../assets/banks/gongshang.jpg')
				},
				{
					name:'南京银行',
					id:'1',
					check:false,
					flag: false,
					// logo: require('../assets/banks/gongshang.jpg')
				},
				{
					name:'渤海银行',
					id:'1',
					check:false,
					flag: false,
					// logo: require('../assets/banks/gongshang.jpg')
				},
				{
					name:'上海农商银行',
					id:'1',
					check:false,
					flag: false,
					// logo: require('../assets/banks/gongshang.jpg')
				}
			]
		}
	},
	methods:{
		selected(index){
			this.bankList.forEach((item, _index)=>{
				if(index == _index){
					this.$set(item, "check", true)
					this.$emit('update:bankVal', index)
				}else{
					this.$set(item, "check", false)
				}
			})
		}
	}
}
</script>
<style scpoed>

	.bank-box{
		padding: 30px;
	}
	.inputLabel{
		position: relative;
		width: 25%;
		height: 60px;
		line-height: 60px;
		text-indent:  20px;
	}
	.inputLabel:before{
		display: inline-block;
		position: absolute;
		left: 0;
    	top: 20px;
		content: '';
		width: 20px;
		height: 20px;
		border-radius: 10px;
		border:1px solid rgb(148, 46, 234);
	}
	.inputLabel:after{
		display: none;
		position: absolute;
		content: '';
		left: 3px;
    	top: 23px;
		width: 14px;
		height: 14px;
		border-radius: 7px;
		background: rgb(148, 46, 234);
		border:1px solid rgb(148, 46, 234);
	}
	.inputLabel input{
		display: none;
	}
	.checked.inputLabel:after{
		display: inline-block;
	}
	.banklogo{
		border: 2px solid rgba(70, 70, 70, 0.2);
	}
	.checked .banklogo{
		border: 2px solid rgb(148, 46, 234);	
	}
	.bg-gongshang{
	background-position: 1px 1px;
  }
  .bg-jianshe{
	background-position: 1px 1px;
  }
  .bg-nongye{
	background-position: 1px 1px;
  }
  .bg-zhaoshang{
	background-position: 1px 1px;
  }
  .bg-guangda{
	background-position: 1px 1px;
  }
  .bg-mingsheng{
	background-position: 1px 1px;
  }
  .bg-zhongxin{
	background-position: 1px 1px;
  }
  .bg-xingye{
	background-position: 1px 1px;
  }
  .bg-pudong{
	background-position: 1px 1px;
  }
  .bg-pingan{
	background-position: 1px 1px;
  }
  .bg-huaxia{
	background-position: 1px 1px;
  }
  .bg-ningbo{
	background-position: 1px 1px;
  }
  .bg-beijing{
	background-position: 1px 1px;
  }
  .bg-dongya{
	background-position: 1px 1px;
  }
  .bg-shanghai{
	background-position: 1px 1px;
  }
  .bg-youzheng{
	background-position: 1px 1px;
  }
  .bg-nanjin{
	background-position: 1px 1px;
  }
  .bg-bohai{
	background-position: 1px 1px;
  }
  .bg-shanghainongshang{
	background-position: 1px 1px;
  }
  .bg-weichat{
	background-position: 0px -280px;
  }
  .bg-ali{
	background-position: -164px -280px;
  }
  .selected{
  	position: relative;
  	border: 2px solid rgba(211, 151, 218, 0.18);
  }
  .selected:hover{
  	border: 2px solid rgb(148, 46, 234);
  }

  .size1{
  	width: 196px;
  	height: 46px;
  }
  .size2{
  	width: 139px;
  	height: 48px;
  }
  .inline{  	
  	display: inline-block;  	
  	padding: 2px;
  }
  .is-selected{
  	position: absolute;
  	width: 6px;
  	height:6px;
  	right: 0;
  	bottom: 0;
  }
</style>