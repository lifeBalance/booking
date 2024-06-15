export default function useTheme() {
  // We'll use this ref to keep track of the checkbox state (theme switcher)
  const isDark = ref(false)

  // 1. Check if the user has a theme preference set in localStorage
  const localStorageTheme = localStorage.getItem('theme')
  // 2. Check if the user has a  system's theme preference
  const theme = window.matchMedia('(prefers-color-scheme: dark)')

  // Set the theme based on the user's preference, giving priority to
  // the setting stored in local storage over the system's preference.
  if (localStorageTheme) {
    document.documentElement.setAttribute('data-theme', localStorageTheme)
    isDark.value = localStorageTheme === 'dark'
  } else if (theme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark')
    isDark.value = true
  } else {
    document.documentElement.setAttribute('data-theme', 'light')
    isDark.value = false
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    console.log('toggleTheme', isDark.value) // testing

    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    document.documentElement.setAttribute(
      'data-theme',
      isDark.value ? 'dark' : 'light'
    )
  }

  return { isDark, toggleTheme }
}
