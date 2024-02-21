// Function to handle user login.
export async function login(email, password) {
  try {
    // Attempt to log in with the provided credentials.
    const response = await fetch('http://localhost:3000/api/v1/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await response.json()

    // Store the received token in localStorage.
    localStorage.setItem('token', data.token)

    return data.token
  } catch (err) {
    console.error('Error on login:', err)
    throw err
  }
}

// Retrieves the stored login token from localStorage.
export function getToken() {
  const token = localStorage.getItem('token')

  if (!token) {
    throw new Error('No token found in localStorage')
  }

  return token
}
