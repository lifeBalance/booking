<script setup lang="ts">
import { z } from 'zod'

const router = useRouter()

const { switchAccessType } = defineProps(['switchAccessType'])

const handleSwitchAccessType = (accessType: string) => {
  switchAccessType(accessType)
}

// Let's define a reactive reference for our form data.
const form = ref({
  email: '',
})

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

type TFormSchema = z.infer<typeof formSchema>

const formError = ref<z.ZodFormattedError<TFormSchema>>({ _errors: [] })

// Modals
const loading = ref(false)
const confirmationEmailModal = ref(false)

function validateForm() {
  // Validate the field
  const result = formSchema.safeParse(form.value)
  console.log('form.value', form.value)
  console.log('result', result)

  if (!result.success) {
    const errors = result.error.format() || []
    console.log('errors', errors)

    formError.value = errors
  } else {
    console.log('form is valid')

    formError.value = { _errors: [] }
  }
}

function submit() {
  // Validate ALL the form fields (use formSchema).
  const result = formSchema.safeParse(form.value)

  if (!result.success) {
    const errors = result.error.format() || []
    console.log('reset errors', errors)

    formError.value = errors
    // Early return
    return
  } else {
    // set loading state to mimic backend signup processing
    loading.value = true

    // When modal is up, avoid scrolling
    document.body.style.overflow = 'hidden'

    // Simulate a backend signup process
    setTimeout(() => {
      // Turn off the loading state
      loading.value = false

      // Open confirmation email modal
      confirmationEmailModal.value = true
    }, 2500)
  }
}
</script>

<template>
  <section class="reset">
    <h2>reset your password</h2>

    <form @submit.prevent="submit">
      <div class="field">
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          v-model="form.email"
          @blur="validateForm"
        />

        <div
          class="errors"
          :class="{
            active:
              formError?.email?._errors &&
              formError?.email?._errors?.length > 0,
          }"
        >
          <p class="error" v-for="error in formError?.email?._errors">
            {{ error }}
          </p>
        </div>
      </div>
    </form>

    <button @click="submit">Reset Password</button>

    <div class="other-options">
      <div class="no-account">
        <p>Don't have an account yet?</p>
        <p @click="handleSwitchAccessType('signUp')">Sign up Here!</p>
      </div>

      <div class="have-account">
        <p>Already have an account?</p>
        <p @click="handleSwitchAccessType('login')">Log In Here!</p>
      </div>
    </div>
  </section>

  <Modal :modalOpen="loading || confirmationEmailModal">
    <LoadingModal v-if="loading" msg="Wait a second please..." />

    <ConfirmationEmailModal
      v-else-if="confirmationEmailModal"
      :closeModalHandler="
        () => {
          confirmationEmailModal = false
          // Redirect to home page
          router.push('/')
        }
      "
      title="Congratulations! 🎉"
      line1="You have successfully reset your password."
      line2="Check your email for the reset link."
    />
  </Modal>
</template>

<style lang="scss" scoped>
.reset {
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

  .other-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .no-account,
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
    font-size: clamp(1.2rem, 1vw, 2rem);
    font-weight: 500;
    transition: all 0.3s ease-in-out;

    &:hover,
    &:active {
      background-color: rgba(var(--color-accent-1), 0.2);
      scale: 1.01;
    }
  }

  .errors {
    margin-top: 0.4rem;
    margin-left: 0.4rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    p {
      color: red;
      font-size: 0.8rem;
    }
    // Apply transition when errors show up (not when they disappear though)
    transition: all 0.3s ease;
    max-height: 0;
    opacity: 0;
  }

  .errors.active {
    max-height: 6rem;
    opacity: 1;
  }
}
</style>
