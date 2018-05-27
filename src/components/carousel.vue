<template>
  <div>
    <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                img-width="1024"
                img-height="480"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
               
    >
      <b-carousel-slide 
            v-for="(item, index) in banners"
            :key="'banners'+ index"                 
            :img-src="item.picture"
      > 
        <div @click="toNewspage( item.url )" class="bannerLink"></div>
       <!--  <router-link v-else  :to="{name:'News', params: { newsId: item.url.replace('news://','') }}" class="bannerLink"> </router-link> -->
 
      </b-carousel-slide>
      <!-- :caption="item.title"     -->
      <!-- Text slides with image -->
      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
    </b-carousel>

    <p class="mt-4">
     
    </p>

  </div>
</template>

<script>
export default {
  props: ["banners"],
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    },
    toNewspage(url){

      if(url.match('http')){
        window.location.href= url;
      } else {
        let newsId= url.replace('news://','')
        window.location.href = window.location.href+'news/'+newsId;
      };
    }
  }
}
</script>

<style scoped>
  #carousel1{
    height: 400px;
    overflow: hidden;
  }
  .bannerLink{
    display: block;
    width: 100%;
    height: 100%;
  }

</style>