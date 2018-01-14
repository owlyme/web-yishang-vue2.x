<template>
	<div>
		test
		<form id="formImageUpload" name="formImageUpload" method="post" :action="actionUrl"
			enctype="multipart/form-data">
		<input type="file">
		<input type='submit' value="submit">
		</form>

		<form action="http://101.132.187.244:8082/#/wuyou?order_id=111"> 
			<input type='submit' value="submit">
		</form>

		var form = document.createElement('form')
undefined
form
<form>​</form>​
form.setAttribute('method','post')
undefined
form
<form method=​"post">​</form>​
form.setAttribute('action','https://www.baidu.com/')
undefined
form
<form method=​"post" action=​"https:​/​/​www.baidu.com/​">​</form>​
		
	</div>

</template>
<script>

import { mapGetters } from 'vuex'
	export	default{
		name: 'test',
		data(){
			return{
				
			}
		},
		computed:{
			...mapGetters([
			  'getUploadUrl'
			]),
			actionUrl(){
				return this.getUploadUrl +'picture/upload'
			},
	    },

	}
</script>
<style scoped>


</style>