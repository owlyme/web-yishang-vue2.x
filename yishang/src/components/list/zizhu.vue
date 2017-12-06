<template>
	<div id="ss">
		<input type="date" name=""> \

		<div>
		    <label for="theinput">provide http upload link</label><br/>
		    <input id="theinput" v-model="url" style="width:100%"/> <br/>
		    <vue-img-upload width="300px" resize="10%,10%" :url="url" @onupload="gotupload" @onuploaderror="goterror">	</vue-img-upload>
		  </div>

		
	</div>
</template>
<script>
// import VueImgUpload from 'vue-img-upload'
export default {
name: "upload",
// components: {
// 	'vue-img-upload' :VueImgUpload
// },
data () {
	return {
		show: true,
		date: '',
		url:"http://localhost:8080/static"
	}
},
methods:{
	gotchange(img){
		console.log(img)
	},
	gotupload(ret){
		console.log(ret)
	},
	goterror(ret){
		console.log(ret)
	}
}

}

</script>
<style>
	
</style>