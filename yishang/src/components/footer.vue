<template>
<div style="padding-top: 40px">
   <div class=" footer" >
      <div class="foot-info">
        <span v-for="(item, index)  in certificate" :key="index">{{item}}</span>
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
      "浙 ICP 备 17056291 号",
      "Copyright©2017",
      "杭州亿尚智能科技有限公司"],
      records:[],
      }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.footer{
  padding: 30px 0;
  background: #fff;
}
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