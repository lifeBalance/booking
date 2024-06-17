export default function useTheme() {
  // We'll store the isDark flag (boolean) as GLOBAL state, so that we can 
  // use it anywhere in our app (mainly for styling purposes).
  const isDark = useState('isDarkG', () => {
    // We need this check because the window object is not available during SSR.
    // I tried using window !== 'undefined' but it didn't work, so I used process.client.
    if (process.client) {
      // 1. Check if the user has a theme preference set in localStorage
      const localStorageTheme = localStorage.getItem('theme')
      // 2. Check if the user has DARK as a system's theme preference
      const theme = window.matchMedia('(prefers-color-scheme: dark)')

      // Set the theme based on the user's preference, giving priority to
      // the setting stored in local storage over the system's preference.
      if (localStorageTheme) {
        document.documentElement.setAttribute('data-theme', localStorageTheme)
        return localStorageTheme === 'dark'
      } else if (theme.matches) {
        document.documentElement.setAttribute('data-theme', 'dark')
        return true
      } else {
        document.documentElement.setAttribute('data-theme', 'dark')
        return true
      }
    } else {
      document.documentElement.setAttribute('data-theme', 'dark')
      return true
    }
  })

  const toggleTheme = () => {
    isDark.value = !isDark.value
    // console.log('toggleTheme', isDark.value) // testing

    // We need this check because the window object is not available during SSR
    if (process.client) {
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
      document.documentElement.setAttribute(
        'data-theme',
        isDark.value ? 'dark' : 'light'
      )
    } else {
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }

  return { isDark, toggleTheme}
}
