//uni-app内置有区别环境的不同，可以直接通过process.env.NODE_ENV获取
//！！！注意，这里的接口当然是不能访问的.
//封装api模块  请求接口的模块
let BASE_URL = ''
if (process.env.NODE_ENV == 'development') {
<<<<<<< HEAD
//http://8.129.51.225:8080/YouGuang_war
    BASE_URL = 'http://8.129.51.225:8080/YouGuang_war' // qe环境
} else {
    BASE_URL = 'http://8.129.51.225:8080/YouGuang_war' // 生产环境
=======

    BASE_URL = 'http://8.129.51.225:8080/YouGuang_war' // qe环境
} else {
    BASE_URL = 'http://8.129.51.225:8080/YouGuang_war' // 生产环境
	// http://8.129.51.225:8080/YouGuang_war
	// http://youguang.cn.utools.club
>>>>>>> e387507779c4dac417f75c8beed056bc076c7cb6
}
const config = {
	base_url: BASE_URL,
	appId: 'wxbd675765e5ceed38',
	appKey: '085c77674270c121083ded33ddbe22a5'
}

export { config }
