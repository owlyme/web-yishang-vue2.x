<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
*{
    padding: 0px;
    margin: 0;
    box-sizing: border-box;
    font-size: 1.0em;
  }
  .clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }
  .center{
    text-align: center;
  }
body{
  background: rgb(248,248,248);
}
a:hover{
  text-decoration: none;
}
.container{
  padding:0;
  /*margin: 0;*/
}
.middle-line{
  margin-bottom:20px;
  text-align: center;
}
.circle-btn{
    border-radius: 30px;
    width: 60px;
    height: 60px;
    line-height: -2px;
    font-size: 23px;
    text-indent: -1px;
    text-align: center;
}

/*pagitation */
.owl .page-item{
  margin: auto 5px; 
}
.owl .page-item .page-link{
  height: 27px;
  line-height: 10px;
}
.owl .page-item .page-link.btn-primary{
  border-color: #C44DDC;
  border-radius: 3px;
}
.owl .page-item.active .page-link{
  background: #C44DDC;
}

.el-icon-arrow-up:before {
    content: "▼";
}
.el-upload {
    border: 1px solid #e0e0e0;
    height: 145px;
    width: 145px;
}
.el-menu--horizontal {
    border-right: none;
    border-bottom: solid 0px #e6e6e6;
}
.el-menu--horizontal a {
  font-size: 1.3em;
}
.menubar li a{
    text-decoration: none;
}
.el-menu--horizontal>.el-menu-item.is-active, 
.el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
  border-bottom: 0px solid #C44DDC;
  color:  #C44DDC;
}

.media-body .col{
  font-size: 0.8em;
  border-left: 1px solid #e0e0e0;
}
.media-body .col:first-child{
  border-left: 0px solid #e0e0e0;
}

.el-button--primary{
  background: #C44DDC;  
}
.el-button--primary:focus, .el-button--primary:hover {
    background: #C44DDC;
    border-color:#C44DDC;
    color: #fff;
}


/*steps*/
.el-step__line{
  background-color:#C44DDC;
}
.el-step__line-inner{
      border-color: #C44DDC;
}
.is-finish *{
  color: #C44DDC;
  background: #C44DDC;
  border-color: #C44DDC;
}
.el-step__icon.is-text{
  background: #fff;
  border-color: #C44DDC;
}
.is-finish .el-step__icon-inner{
    display: block;
    height: 15px;
    width: 15px;
    border-radius: 7.5px;
    background: #C44DDC;
}
.el-step__title.is-finish{
    color: #C44DDC;
}

.graph1 .el-step__line,
.graph3 .el-step__line{
    display: none;
  }
.goods-details .el-steps--vertical .el-step__title,
.goods-details .el-steps--vertical .el-step__description{
  display: inline-block;
}
/*.list-nav .el-menu,
.list-nav .el-menu-item,
.list-nav .el-submenu,
.list-nav .el-submenu .el-submenu__title{
  height: 35px;
  line-height: 35px;  
}
.list-nav .el-menu-item{
  padding: 0;
  background: rgb(238,238,238);
  padding:0 5px;
  margin:0 15px;
}
.list-nav .is-active{
  background: ;
}
.list-nav .el-menu--horizontal .el-submenu>.el-menu{
  top: 30px;
} */
/* __web-inspector-hide-shortcut__*/
.nav-item a{
  color: #555;
  font-weight: 600;
}
.border-top{
  border-top: 1px solid rgb(238,238,238);
}
.padding-around{
  padding: 30px;
}
.padding-top{
  padding-top: 30px ;
}
.padding-bottom{
   padding-bottom: 30px;
}
.padding-right{
  padding-right: 30px;
}
.padding-left-right{
  padding-left: 15% ;
   padding-right: 15% ;
}
.padding-top-bottom{
   padding-top: 30px ;
   padding-bottom: 30px ;
}
.text-center{
  text-align: center;
}
.text-right{
  text-align: right;
}
.text-style-sm{
  font-size: 14px;
  color: #5a5e66;
}
/**/
textarea{
  height: 80px;
}
.el-textarea__inner{
  height: 66px;
}
/*lun bo tu*/
.carousel-indicators .active {
    background-color: #e75deb;
}


/* background*/
.bg-icon{
  background-image: url(/static/login/icons.png);
  background-repeat: no-repeat;
}
/*res*/
.err{
  color: #ff0;
}
*{
  font-family: "Microsoft YaHei";
}
.color{
   color: rgb(148, 46, 234);
}
</style>
