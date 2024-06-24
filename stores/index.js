import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const user = ref({
      name: '',
      email: '',
      password: '',
      isLoggedIn: false,
    })

    // Call this when signing up a new user (it will set the user in localStorage)
    const setUser = (newUser) => {
      user.value = newUser
    }

    // For login
    const login = (email, password) => {
      // console.log('login sum biatch:', email, password) // 
      
      if (user.value.email === '') {
        return false
      } else if (
        user.value.email === email &&
        user.value.password === password
      ) {
        setUser({
          ...user.value,
          isLoggedIn: true
        })
        return true
      }
    }

    // For logout
    const logout = () => {
      if (user.value.email === '') {
        return
      } else {
        user.value.isLoggedIn = false
      }
    }

    const isLoggedIn = () => {
      if (user.value.email === '') {
        return null
      } else {
        return user.value.isLoggedIn
      }
    }

    return {
      user,
      setUser,
      login,
      logout,
      isLoggedIn,
    }
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
)
