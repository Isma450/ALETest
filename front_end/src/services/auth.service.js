export async function login(email, password) {
  try {
    const response = await fetch('http://localhost:3000/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    const data = await response.json()

    const token = data.token
    localStorage.setItem('token', token)

    console.log('Got login data:', data)
    return data.token
  } catch (err) {
    console.error('Error on login:', err)
    throw err
  }
}

export function getToken() {
  const token = localStorage.getItem('token')

  // check if token is present in localStorage
  if (!token) {
    throw new Error('Token manquant dans le localStorage')
  }

  return token
}
