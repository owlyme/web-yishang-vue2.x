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
            :caption="item.title"         
            :img-src="item.picture"
      ></b-carousel-slide>
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
    }
  }
}
</script>

<style scoped>
  #carousel1{
    height: 400px;
    overflow: hidden;
  }

</style>