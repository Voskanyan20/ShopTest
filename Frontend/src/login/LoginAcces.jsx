const userRole = async name => {
  let role = name;
  return role;
}

const setCookie = async (name, jwt, time) => {
  let currentTime = new Date().getTime()
  let expirationTime = currentTime + time
  document.cookie = `${name}=${jwt}; expires="${new Date(
    expirationTime
  ).toUTCString()}"; path=/`
}

const getCookie = name => {
  let cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim()
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1)
    }
  }
}

const getCookieForReturn = name => {
  let cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim()
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1)
    }
  }
  // return null
}

export { setCookie, getCookie, getCookieForReturn , userRole }
