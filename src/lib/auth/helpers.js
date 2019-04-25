import VueCookie from 'vue-cookie'
import JwtDecode from 'vue-jwt-decode'

const authHelpers = {
  setCookie(token) {
    VueCookie.set('jwt', token, 1)
    return JwtDecode.decode(token)
  },
  retrieveToken() {
    let token = VueCookie.get('jwt')
    if (!token) { return }
    return JwtDecode.decode(token)
  }
}

export { authHelpers }