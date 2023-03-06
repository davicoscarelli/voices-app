import { User } from 'src/models/User'

export default {
  async AuthMiddleware(to, _from, next) {
    let authenticated = User.isAuthenticated()

    if (to.name === 'auth.login' && authenticated) {  
      console.log("ENTROUUUU LOGINNN")    
      return next({ name: 'explore' })

    }
    
    
    if (!to.meta.authRequired) return next()
    if (!authenticated) return next({ name: 'auth.login' })

   
    return next()
  }
}
