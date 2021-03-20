const home = {
    state: {
    	userInfo: {},
		myInfo :{}
    },
    mutations: {
    	SET_USER_INFO: (state, userInfo) => {
    	    	state.userInfo = userInfo
    	    },
		SET_MY_INFO: (state, myInfo) => {
		    	state.myInfo =  myInfo
		    },
			
    },
    actions: {
    	  // 缓存用户信息
    	    setUserInfo({
    	        commit
    	    }, userInfo) {
    	    	commit('SET_USER_INFO', userInfo)
    	    },
			// 获取全部信息
			setMyInfo({
			    commit
			}, myInfo) {
				commit('SET_MY_INFO', myInfo)
			}
    },
    getters: {
    	  userInfo: state => state.userInfo,
		  myInfo:state => state.myInfo,
    }
}
export default home