<script setup>
import { useUserStore } from '~/stores'

const router = useRouter()

const { switchAccessType } = defineProps(['switchAccessType'])

const handleSwitchAccessType = (accessType) => {
  switchAccessType(accessType)
}

const emailInputValue = ref('')
const passwordInputValue = ref('')

// Get the user store
const userStore = useUserStore()
console.log('userStore', userStore) // testing

function loginHandler(credentials) {
  // Log in the user with the provided credentials (email and password)
  const isLoggedIn = userStore.login(
    emailInputValue.value,
    passwordInputValue.value
  )

  console.log('isLoggedIn', isLoggedIn) // testing

  if (isLoggedIn) {
    router.push('/')
  }
}
</script>

<template>
  <section class="login">
    <h2>login into your account</h2>

    <Input
      label="Email"
      inputType="email"
      inputName="email"
      :inputValue="emailInputValue"
      :setInputValue="(e) => (emailInputValue = e.target.value)"
    />

    <div class="password">
      <Input
        label="Password"
        inputType="password"
        inputName="password"
        :inputValue="passwordInputValue"
        :setInputValue="(e) => (passwordInputValue = e.target.value)"
      />

      <p class="forgot-password">
        <span class="forgot-password" @click="handleSwitchAccessType('reset')"
          >Forgot your password?</span
        >
      </p>
    </div>

    <button
      @click="
        loginHandler({
          email: emailInputValue,
          password: passwordInputValue,
        })
      "
    >
      Log in
    </button>

    <div class="no-account">
      <p>Don't have an account yet?</p>
      <p class="sign-up" @click="handleSwitchAccessType('signUp')">
        Sign up Here!
      </p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.login {
  background-color: rgb(var(--color-bg-2));
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  margin: 4rem 0 2rem;
  border-radius: var(--radius-default);

  h2 {
    color: rgb(var(--color-accent-1));
    text-transform: uppercase;
  }

  .forgot-password {
    text-align: right;
    padding-top: 0.7rem;

    span {
      color: rgb(var(--color-accent-1));
      text-align: right;
      padding-top: 1rem;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      border-bottom: 2px solid transparent;

      &:hover {
        border-bottom: 2px solid rgb(var(--color-accent-1));
      }
    }
  }

  .no-account {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    color: rgb(var(--color-text-1));

    p:last-child {
      cursor: pointer;
      color: rgb(var(--color-accent-1));
      transition: all 0.3s ease-in-out;
      border-bottom: 2px solid transparent;

      &:hover {
        border-bottom: 2px solid rgb(var(--color-accent-1));
      }
    }
  }

  button {
    all: unset;
    cursor: pointer;
    padding: 1rem 2rem;
    color: rgb(var(--color-accent-1));
    border: 1px solid rgb(var(--color-accent-1));
    border-radius: 5px;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    font-size: clamp(1.2rem, 4vw, 2rem);
    font-weight: 500;
    transition: all 0.3s ease-in-out;

    &:hover,
    &:active {
      background-color: rgba(var(--color-accent-1), 0.2);
      scale: 1.01;
    }
  }
}
</style>
