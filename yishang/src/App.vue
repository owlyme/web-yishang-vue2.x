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
</style>
