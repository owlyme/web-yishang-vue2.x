<template>
  <div id="app">
    <router-view/>
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
</style>
