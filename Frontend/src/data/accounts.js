import axios from 'axios'

// Axios stuff, will make sure that things are consistent etc
// Also handles all of the HTTP requests easily
const client = axios.create({
  baseURL: 'http://localhost:4000/api/users'
})

// Verifies the user via login
const verifyUser = async (email, password) => {
  // Return format: If it was successful, error message to be shown to the user
  // Sends the user to the backend
  try {
    const res = await client.post('/login', { email, password })

    // If there was success
    if (res.status === 200) {
      document.cookie = res.data.token
      return [true, '']
    }

    // Fallback, in case the code reaches here
    return [false, 'Something went wrong, try again']
  } catch (e) {
    // If there was a 4xx/5xx response, it throws an error
    return [false, e.response.data.error]
  }
}

// Registers the user
// TODO: Add tag information here when that has been implemented
const registerUser = async (email, password, first_name, last_name) => {
  // Return format: If it was successful, error message to be shown to the user
  // Sends the user to the backend
  try {
    const res = await client.post('/register', {
      email,
      password,
      first_name,
      last_name
    })

    // If there was success
    if (res.status === 200) {
      document.cookie = res.data.token
      return [true, '']
    }

    // Fallback, in case the code reaches here
    return [false, 'Something went wrong, try again']
  } catch (e) {
    // If there was a 4xx/5xx response, it throws an error
    return [false, e.response.data.error]
  }
}

const getUserInfo = async (email) => {
  try {
    const res = await client.post('/todo', {
      email
    })

    // If there was success
    if (res.status === 200) {
      console.log(res.data)
      return res.data
    }

    // Fallback, in case the code reaches here
    return 'Something went wrong, try again'
  } catch (e) {
    // If there was a 4xx/5xx response, it throws an error
    return e.response.data.error
  }
}

export { verifyUser, registerUser, getUserInfo }
