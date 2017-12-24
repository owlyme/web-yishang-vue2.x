import Vue from 'vue'
import VueCookies from 'vue-cookies'


Vue.use(VueCookies)




var date = new Date;
date.setDate(date.getDate() + 1);
this.$cookies.set("token","GH1.1.1689020474.1484362313", date);

this.$cookies.set("token","GH1.1.1689020474.1484362313", Infinity);  // never expire
// never expire , only -1,Other negative Numbers are invalid
this.$cookies.set("token","GH1.1.1689020474.1484362313", -1); 


this.$cookies.get(keyName)       // return value  
this.$cookies.remove(keyName [, path [, domain]])