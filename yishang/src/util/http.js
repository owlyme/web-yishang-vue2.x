import axios from 'axios' //引用axios

let getCookie = pro =>{
	let arr = document.cookie.split(";")
	let val = ''
	arr.forEach( (item)=>{
		if(item.includes( pro )){
			let index = item.indexOf("=")
			val = item.substring(inde+1) 
		}
	})
	return val 
}
// // axios 配置
// axios.defaults.timeout = 5000; 
// //axios.defaults.baseURL = 'http://localhost/pjm-shield-api/public/v1/'; //这是调用数据接口
 
// http request 拦截器，通过这个，我们就可以把Cookie传到后台
axios.interceptors.request.use(
  config => {
    const token = getCookie('PHPSESSID'); //获取Cookie
    config.data = JSON.stringify(config.data);
    console.log(document.cookie)
    config.headers = {
      'Content-Type':'application/x-www-form-urlencoded' //设置跨域头部
    };
    if (false) {//nlk7969qepf43h4s52kvchaas4
      config.params = {'token': '2l669thjdlb1br0tvdbviuej04'} //后台接收的参数，后面我们将说明后台如何接收
    }
    return config;
  },
  err => {
  	console.log('err')
    return Promise.reject(err);
  }
);
 
 
// // http response 拦截器
// axios.interceptors.response.use(
//   response => {
// //response.data.errCode是我接口返回的值，如果值为2，说明Cookie丢失，然后跳转到登录页，这里根据大家自己的情况来设定
//     if(response.data.errCode == 2) {
//       router.push({
//         path: '/login',
//         query: {redirect: router.currentRoute.fullPath} //从哪个页面跳转
//       })
//     }
//     return response;
//   },
//   error => {
//     // return Promise.reject(error.response.data)
//   });
 
export default axios;
