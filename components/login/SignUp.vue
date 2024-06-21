<script setup>
import { useUserStore } from '~/stores'

const router = useRouter()
const userStore = useUserStore()

const { switchAccessType } = defineProps(['switchAccessType'])

const handleSwitchAccessType = (accessType) => {
  switchAccessType(accessType)
}

const fullNameInputValue = ref('')
const emailInputValue = ref('')
const passwordInputValue = ref('')

// Modals
const loading = ref(false)
const confirmationEmailModal = ref(false)

function signUp() {
  // set loading state to mimic backend payment processing
  loading.value = true

  // When modal is up, avoid scrolling
  document.body.style.overflow = 'hidden'

  setTimeout(() => {
    // Oh, we're done!
    loading.value = false

    userStore.setUser({
      name: fullNameInputValue,
      email: emailInputValue,
      password: passwordInputValue,
      isLoggedIn: false,
    })

    // Open confirmation email modal
    confirmationEmailModal.value = true
  }, 2500)
}

const closeModalHandler = () => {
  console.log('signup: close modal')
  confirmationEmailModal.value = false

  // Allow scrolling
  document.body.style.overflow = 'auto'

  // Redirect to home page
  router.push('/')
}
</script>

<template>
  <section class="sign-up">
    <h2>create a new account</h2>

    <div class="full-name">
      <label for="full-name">Full Name</label>
      <input type="text" id="full-name" v-model="fullNameInputValue" />
    </div>

    <div class="email">
      <label for="email">Email</label>
      <input type="email" id="email" v-model="emailInputValue" />
    </div>

    <div class="password">
      <label for="password">Password</label>
      <input type="password" id="password" v-model="passwordInputValue" />
      <p class="forgot-password">
        <span class="forgot-password" @click="handleSwitchAccessType('reset')"
          >Forgot your password?</span
        >
      </p>
    </div>

    <button @click="signUp">Submit</button>

    <div class="have-account">
      <p>Already have an account?</p>
      <p class="login" @click="handleSwitchAccessType('login')">Log In Here!</p>
    </div>

    <Modal :modalOpen="loading || confirmationEmailModal">
      <LoadingModal v-if="loading" msg="We're creating your account..." />

      <ConfirmationEmailModal
        v-else-if="confirmationEmailModal"
        :closeModalHandler="closeModalHandler"
        title="Congratulations! 🎉"
      />
    </Modal>
  </section>
</template>

<style lang="scss" scoped>
.sign-up {
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

  .have-account {
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

  & label {
    color: rgb(var(--color-text-1));
    display: block;
    font-weight: 500;
    margin-bottom: 0.8rem;
  }

  & input {
    padding: 0.5rem;
    font-size: 1.2rem;
    font-family: inherit;
    color: rgb(var(--color-text-2));
    border: 1px solid rgba(var(--color-text-1), 0.2);
    background-color: rgba(var(--color-bg), 0.9);
    border-radius: var(--radius-default);
    box-shadow: 0 1px 2px rgba(var(--color-bg), 0.1);
    width: 100%;
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
