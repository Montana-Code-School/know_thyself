const Storage = (function(){
  const globalInfo = {
    token: '',
    user: null,
    isAuthenticated: false,
    tokenBlob: true
  }
  return {
    saveToken(token){
      localStorage.setItem('token', token)
      globalInfo.isAuthenticated = true;
      globalInfo.token = token;
    },
    saveUser(user){
      globalInfo.user = user
    },
    getUser(){
      return globalInfo.user
    },
    getToken(){
      if (globalInfo.token){
        return globalInfo.token
      } else {
        return localStorage.getItem('token')
      }
    }
  }
})()
export default Storage
