<template>	
<div>
	<b-nav tabs>
	  <b-nav-item :active="(displayOrNot == 'thd')"						  
	  @click="toPayPage('thd')">第三方支付</b-nav-item>
	  <b-nav-item :active=" (displayOrNot == 'bank') " 						  
	  @click="toPayPage('bank')">银行卡/信用卡支付</b-nav-item>
	</b-nav>
	<div class="pay-type">
		<div v-if="displayOrNot == 'thd'" class="padding-left-right padding-top-bottom">
			<ul class="padding-top">
				<li class="inline selected margin-right">
					<img :src="item.logo" />
				</li>
				<li class="inline selected margin-right">
					<img :src="item.logo" />
				</li>
			</ul>
			<div class="padding-top-bottom"><button class="next btn"> 下一步 </button></div>
		</div>
		<div v-if="displayOrNot == 'bank'">
			<div class="bank-box">
				<label v-for="(item, index) in bankList"
		      			:key="'bank'+ index"
		       			:label="item.id" 
		       			@click="selected(index)"
		       			:class="{checked: item.check}"
		       			class="inputLabel size1">
					<input type="radio" name="bank" :value="index" v-model="bank">
					<span class="banklogo"> <img :src="item.logo" /></span>
				</label>
				<div class="padding-top-bottom"><button class="next btn"> 下一步 </button></div>
			</div>
		</div>
	</div>
</div>
</template>
<script >

export default{
	data(){
		return{
			displayOrNot: 'thd',
			bank: "",
			thirdParty:[
				{
					name:,
					id:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/gongshang.jpg')
				},
				{
					name:'建设银行',
					id:'2',
					check:false,
					flag: false,
					logo: require('../assets/bank/jianshe.jpg')
				}
			],
			bankList:[
				{
					name:'工商银行',
					id:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/gongshang.jpg')
				},
				{
					name:'建设银行',
					id:'2',
					check:false,
					flag: false,
					logo: require('../assets/bank/jianshe.jpg')
				},
				{
					name:'农业银行',
					id:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/nongye.jpg')
				},
				{
					name:'招商银行',
					id:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/zhaoshang.jpg')
				},
				{
					name:'光大银行',
					id:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/guangda.jpg')
				},
				{
					name:'民生银行',
					id:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/minsheng.jpg')
				},
				{
					name:'中兴银行',
					id:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/zhongxing.jpg')
				},
				{
					name:'兴业银行',
					id:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/xingye.jpg')
				},
				{
					name:'浦东银行',
					id:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/shanghaipudong.jpg')
				},
				{
					name:'平安银行',
					id:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/pingan.jpg')
				},
				{
					name:'华夏银行',
					id:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/huaxia.jpg')
				},
				{
					name:'宁波银行',
					id:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/ningbo.jpg')
				},
				{
					name:'东亚银行',
					id:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/dongya.jpg')
				},
				{
					name:'上海银行',
					id:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/shanghai.jpg')
				},
				{
					name:'邮政银行',
					id:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/youzheng.jpg')
				},
				{
					name:'南京银行',
					id:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/nanjing.jpg')
				},
				{
					name:'渤海银行',
					id:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/bohai.jpg')
				},
				{
					name:'上海农商银行',
					id:'1',
					check:false,
					flag: false,
					logo: require('../assets/bank/shanghainongshang.jpg')
				}
			]
		}
	},
	methods:{
		toPayPage(val){
			this.displayOrNot= val
		},
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
<style scoped>
	.bank-box{
		padding: 30px;
	}
	.inputLabel{
		position: relative;
		width: 25%;
		height: 60px;
		margin: 20px 0;
		line-height: 60px;
		text-indent:  30px;
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
		padding: 10px;
		padding-right: 30px;
		border: 2px solid rgba(70, 70, 70, 0.2);
	}
	.banklogo:hover{
		padding: 10px;
		padding-right: 30px;
		border: 2px solid rgb(148, 46, 234);
	}
	.checked .banklogo{
		border: 2px solid rgb(148, 46, 234);	
	}
	
  .selected{
  	position: relative;
  	border: 2px solid rgba(211, 151, 218, 0.18);
  }
  .selected:hover{
  	border: 2px solid rgb(148, 46, 234);
  }

  .size1{
  
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
  .next{
 	width: 139px;
  	height: 36px;
 	background: rgb(148, 46, 234);
 	color: #fff;
 	font-size: 1.1em;
 	font-weight: 600px;
 }
 .pay-type{
		border: 2px solid rgb(148, 46, 234);
		border-top: none;
	}
	.nav-tabs {
	    border-bottom: 2px solid #942eea;
	}
	.nav-tabs .nav-item {
	    margin-bottom: -3px;
	}
.nav-link.active{
    color: rgb(148, 46, 234);
    border-width: 2px;
    border-color: #942eea #942eea #fff;
  }

  .bg-bank{
  	background-image: url(/static/bank/bank-icons.png);
  	background-repeat: no-repeat;
  	cursor: pointer;
  }
  .bg-weichat{
	background-position: 0px -280px;
  }
  .bg-ali{
	background-position: -164px -280px;
  }
/*.selected{
  	position: relative;
  	border: 2px solid rgba(211, 201, 218, 0.18);
  }
  .selected:hover{
  	border: 2px solid rgb(148, 46, 234);
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

 .next{
 	width: 139px;
  	height: 36px;
 	background: rgb(148, 46, 234);
 	color: #fff;
 	font-size: 1.1em;
 	font-weight: 600px;
 }*/
</style>