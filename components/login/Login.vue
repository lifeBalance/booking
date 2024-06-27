<script lang="ts" setup>
import { useUserStore } from '~/stores'
import { z } from 'zod'

const { $toast } = useNuxtApp()

const router = useRouter()

// Get the user store
const userStore = useUserStore()
// console.log('userStore', userStore) // testing

const { switchAccessType } = defineProps(['switchAccessType'])

const handleSwitchAccessType = (accessType: string) => {
  switchAccessType(accessType)
}

const formInitialState = {
  email: '',
  password: '',
}
// Let's define a reactive reference for our form data.
const form = ref(formInitialState)

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Must be at least 6 characters long' })
    .regex(/[A-Z]/, {
      message: 'Must contain at least one uppercase letter',
    })
    .regex(/[0-9]/, { message: 'Must contain at least one number' })
    .regex(/[\W_]/, {
      message: 'Must contain at least one special character',
    }),
})

// Let's infer the type of our form from the schema.
type TFormSchema = z.infer<typeof formSchema>
type TFormError = z.inferFormattedError<typeof formSchema>

// Let's define a reactive reference to our form errors,
// based on the type of the form schema.
// const formError = ref<z.ZodFormattedError<TFormSchema | null>>(null)
const formError = ref<TFormError>({ _errors: [] })

function submitHandler(credentials: { email: string; password: string }) {
  // Validate the data before submitting the form
  const valid = formSchema.safeParse(form.value)
  if (valid.success) {
    console.log('Form is valid!')
    // Clear any previous errors
    formError.value = { _errors: [] }

    const { email, password } = credentials
    console.log('credentials', email, password) // testing

    // Log in the user with the provided credentials (email and password)
    const isLoggedIn = userStore.login(email, password)

    console.log('isLoggedIn', userStore.isLoggedIn()) // testing
    if (isLoggedIn) {
      router.push('/')
    } else {
      console.log('Wrong credentials, login failed!')
      $toast.warning('Wrong credentials, login failed!')
    }
  } else {
    console.log('Form is invalid!')

    formError.value = valid.error.format()
    console.log('formError', formError.value)
  }
}

const validateField = (
  fieldName: keyof typeof formInitialState,
  value: string
) => {
  console.log(`fieldName: ${fieldName}, value: ${value}`) // testing;

  // Validate the "blurred" field value.
  const result = formSchema.safeParse({ [fieldName]: value })

  if (!result.success) {
    console.log('lala', result.error.format())

    // If validation fails, update formError with the errors for this field
    const errors = result.error.format()[fieldName]?._errors || []
    console.log('errors', errors)

    // Update only the errors for the specific field, preserving other field errors
    formError.value = {
      ...formError.value,
      [fieldName]: { _errors: errors },
    }
  } else {
    // If validation succeeds, clear any errors ONLY for this field.
    formError.value[fieldName] = { _errors: [] }
  }
}
</script>

<template>
  <section class="login">
    <h2>login into your account</h2>

    <form
      @submit.prevent="
        submitHandler({ email: form.email, password: form.password })
      "
    >
      <div class="email">
        <div class="field">
          <label for="email">Email</label>
          <input
            name="email"
            type="email"
            v-model="form.email"
            @blur="() => validateField('email', form.email)"
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
      </div>

      <div class="password">
        <div class="field">
          <label for="password">Password</label>
          <input
            name="password"
            type="password"
            v-model="form.password"
            @blur="() => validateField('password', form.password)"
          />

          <div
            class="errors"
            :class="{
              active:
                formError?.password?._errors &&
                formError?.password?._errors?.length > 0,
            }"
          >
            <p class="error" v-for="error in formError?.password?._errors">
              {{ error }}
            </p>
          </div>
        </div>
      </div>

      <button>Log in</button>
    </form>

    <div class="other-options">
      <p class="forgot-password" @click="handleSwitchAccessType('reset')">
        <span>Forgot your password?</span>
      </p>

      <div class="no-account">
        <p>Don't have an account yet?</p>

        <p class="sign-up" @click="handleSwitchAccessType('signUp')">
          Sign up Here!
        </p>
      </div>
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

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  h2 {
    color: rgb(var(--color-accent-1));
    text-transform: uppercase;
  }

  .field {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    // position: relative;

    label {
      color: rgb(var(--color-text-1));
      display: block;
      font-weight: 500;
      margin-bottom: 0.8rem;
      margin-left: 0.8rem;
    }

    input {
      padding: 0.5rem;
      font-size: 1.2rem;
      font-family: inherit;
      color: rgb(var(--color-text-2));
      border: 1px solid rgba(var(--color-text-1), 0.2);
      background-color: rgba(var(--color-bg), 0.9);
      border-radius: var(--radius-default);
      box-shadow: 0 1px 2px rgba(var(--color-bg), 0.1);
      width: 100%;

      &:focus {
        outline: none;
        box-shadow: 0 0 0 0.2rem rgba(var(--color-accent-1), 0.9);
      }
    }
  }

  // .email .field {
  //   height: 6rem;
  //   // border: 1px solid yellow;
  // }

  // .password .field {
  //   height: 10rem;
  //   // border: 1px solid green;
  // }

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

  .other-options {
    .forgot-password {
      span {
        cursor: pointer;
        color: rgb(var(--color-accent-1));
        transition: all 0.3s ease-in-out;
        padding-bottom: 0.2rem;
        border-bottom: 2px solid transparent;

        &:hover {
          border-bottom: 2px solid rgb(var(--color-accent-1));
        }
      }
    }

    .no-account {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding-top: 1.8rem;

      p:first-child {
        color: rgb(var(--color-text-1));
        border-bottom: 2px solid transparent;
        padding-bottom: 0.2rem;
      }

      p:last-child {
        color: rgb(var(--color-accent-1));
        padding-bottom: 0.2rem;

        cursor: pointer;
        transition: all 0.3s ease-in-out;
        border-bottom: 2px solid transparent;

        &:hover {
          border-bottom: 2px solid rgb(var(--color-accent-1));
        }
      }
    }
  }

  button {
    all: unset;
    cursor: pointer;
    padding: 1rem 2rem;
    flex: 1;
    color: rgb(var(--color-accent-1));
    border: 1px solid rgb(var(--color-accent-1));
    border-radius: 5px;
    text-align: center;
    display: inline-block;
    text-decoration: none;
    font-size: clamp(1.2rem, 2vw, 2rem);
    font-weight: 500;
    transition: all 0.3s ease-in-out;

    &:hover,
    &:active {
      background-color: rgba(var(--color-accent-1), 0.2);
      scale: 1.01;
    }
  }
}

@media (min-width: 480px) {
  .login {
    .other-options {
      .no-account {
        flex-direction: row;
        gap: 1rem;
      }
    }
  }
}
</style>
