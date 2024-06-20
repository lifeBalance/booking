export default function useLogin() {
  const isLoggedIn = useState('isLoggedIn', () => false)

  // This function receives the entered credentials as an object, and compares
  // them with the stored credentials (in localStorage). If they match, it sets
  // the user as logged in in GLOBAL state (also in local storage).
  function login(enteredCredentials) {
    console.log('enteredCredentials', enteredCredentials) // testing

    const credentials = localStorage.getItem('booking-demo-user-accounts')
    const { email, password } = JSON.parse(credentials)
    console.log(`email: ${email}, password: ${password}`) // testing

    if (
      email === enteredCredentials.email &&
      password === enteredCredentials.password
    ) {
      console.log('login successful')

      // LOCAL STORAGE: Set user as logged in
      localStorage.setItem(
        'booking-demo-user-accounts',
        JSON.stringify({ email, password, isLoggedIn: true })
      )

      // GLOBAL STATE: Set user as logged in
      isLoggedIn.value = true

      // Returns a boolean value to indicate if the login was successful
      return true
    } else {
      console.log('login failed')
      // Returns a boolean value to indicate if the login was successful
      return false
    }
  }

  return { isLoggedIn, login }
}
