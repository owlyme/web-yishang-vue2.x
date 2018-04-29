<template>
	<div id="indent">
		
		<div class="container">
			<router-view/>
		</div>
	</div>
</template>
<script>
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#indent{
		margin-top: 20px;
		background: rgb(248,248,248);
	}
	li{
		list-style: none;
	}
	.myIndent{
		color: #555;
		height: 54px;
		line-height: 54px;
		/*width: 220px;*/
		background: rgb(238,238,238);
		font-size: 0.8em;
		text-indent: 20px;
	}
	.nav-vertal{
		background: #fff;
	}
	.muneNav{
		color: #555;
		border: 2px solid rgba(255,255,255,0);
		height: 54px;
		line-height: 54px;
		/*width: 220px;*/
		font-size: 0.8em;
		text-indent: 30px;
		cursor: pointer;
	}
	.muneNav:hover{
		background: #C44DDC;
		color: #fff;
	}
	.active{
		color: #C44DDC;
		border-left-color: #C44DDC;
	}
	.col-3 img{
		width: 100%;
	}
	.isloading{
		position: relative;
    	height: 200px;
	}
	.text-style{
		text-indent: 1.5em;
		height: 30px;
	}	
	.container-detail-list{
		height: 345px;		
	}
	.stephidden{
		height: 0px;overflow: hidden;
	}
	.graph{
		position: relative;
		height: 350px;
		padding-top: 50px;
		width: 100%;
	}
	.graph1,
	.graph2,
	.graph3{
		position: relative;		
		height: 100px;
		width: 100%;
		z-index:4;
	}	
	.graph-bg{
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 0;
	}
	.graph-bg .rect{
		position: absolute;
		left: 22.22%;
		top: 10px;
		width: 33.334%;
		height: 201px;
		border: 2px solid #C44DDC;
	}
	.graph-bg .rectp-round{
		position: absolute;
		left: 23.99%;
	    top: -29px;
	    width: 29.22%;
	    height: 300px;
		height: 300px;
		border: 2px dashed #C44DDC;
		border-radius: 20px;
		border-color: #C44DDC;
		background:  rgba(196,77,220,0.07);
	}
	/*detail*/
	.detail-inner{
		padding: 30px;
	}
	.nav-schedule-details li{
		float: left;
		width: 25%;
		height: 55px;
		line-height: 55px;
		text-align: center;
		border-bottom: 2px solid rgba(255,255,255,0);
	}
	.nav-schedule-details li:hover{
		cursor: pointer;
		color: #C44DDC;
		border-bottom: 2px solid #C44DDC;
	}
	.jiben ul li {
		float: left;
		width: 33.33%;
		height: 35px;
		line-height: 35px;
		font-size: 14px;
	}
	.buwei ul,
	.yanseshuliang ul{		
		float: left;
		margin-right: 20px;
	}
	.yanseshuliang .thead li{
		text-align: right;
	}

	.thead li,.tbody li{
		font-size: 14px;
		color: rgb(102, 102, 102);
		margin-bottom: 20px;
	}
	.tbody li{
		text-align: center;
		color: rgb(6, 6, 6);
	}
	.inner-icon{
		float: left;
		margin: 30px 30px 0 0;
		padding:1px;
		text-align: center;
		border: 1px solid #e0e0e0;
	}
	.inner-icon img{
		width: 140px;
		height: 140px;
		padding: 5px;
	}
	.banxing .inner-icon img{
		width: 200px;
	}
</style>