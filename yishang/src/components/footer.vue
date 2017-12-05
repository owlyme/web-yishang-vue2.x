<template>
 <div >  
   <div class="container footer" >
      <div class="foot-info">
        <span v-for="item in certificate" key="index">{{item}}</span>
      </div>
      <div class="foot-info">
        <span v-for="item in records" key="index">{{item}}</span>
      </div>
    </div>
 </div>
</template>

<script>
export default {
  name: 'footer',
  data () {
    return {
      certificate: [
      "增值电信业务经营许可证：浙B2-20110446",
      "网络文化经营许可证：浙网文[2015]0295-065号",
      "12318举报"],
      records:[ 
      "互联网药品信息服务资质证书编号：浙-（经营性）-2017-0005",
      "浙公网安备：33010002000120号"],
      }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.foot-info{
  text-align: center;
  font-size: 12px;
  font-family: "Microsoft YaHei";
  color: rgba(135, 132, 132, 0.77);
}
.foot-info span{
  display: inline-block;
  height: 1.2em;
  margin: 10px;
  font-weight: 700;
}

</style>