const Storage = (function(){
  const globalInfo = {
    token: '',
    user: null,
    isAuthenticated: false,
    tokenBlob: true
  }
  return {
    logIn(token){
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
    },
    isAuthenticated(){
      return globalInfo.isAuthenticated
    },
    logOut(){
      localStorage.removeItem('token')
      globalInfo.isAuthenticated = false;
      globalInfo.token = '';
    }

  }
})()
export default Storage
