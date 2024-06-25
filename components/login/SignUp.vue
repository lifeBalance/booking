<script setup lang="ts">
import { z } from 'zod'
import { useUserStore } from '~/stores'

const router = useRouter()
const userStore = useUserStore()

const { switchAccessType } = defineProps(['switchAccessType'])

const formInitialState = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

// Let's define a reactive reference for our form data.
const form = ref(formInitialState)

const formSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: 'Must be at least 3 characters long' }),
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
  confirmPassword: z
    .string()
    .min(6, { message: 'Confirm Password can not be empty' }),
})

// In order to get the validateField function to work, we need to create a
// second PARTIAL schema based on the first one, and add refine there.
const refinedFormSchema = formSchema
  .pick({ password: true, confirmPassword: true })
  .refine(
    (data) => {
      console.log('data', data)

      // IMPORTANT: my goal is to FAIL validation when the password and
      // confirmPassword fields are not equal, so I have to return true
      // when they are equal, to cause validation fail (bit counterintuitive).
      return data.password === data.confirmPassword
    },
    {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    }
  )

// Let's infer the type of our form from the schema.
type TFormSchema = z.infer<typeof refinedFormSchema>

// Let's define a reactive reference to our form errors,
// based on the type of the form schema.
// const formError = ref<z.ZodFormattedError<TFormSchema | null>>(null)
const formError = ref<z.ZodFormattedError<TFormSchema>>(null)

const handleSwitchAccessType = (accessType) => {
  switchAccessType(accessType)
}

const validateField = (fieldName: string, value) => {
  // Backup the current form errors. That's necessary because once the
  // partial schema is parsed, the formError will be updated with only the
  // errors for the specific field, smashing the other ones.
  const errorsBackup = formError.value

  // Depending on the input field, we'll validate against one or another schema.
  const result =
    fieldName === 'confirmPassword'
      ? refinedFormSchema.safeParse({ [fieldName]: value })
      : formSchema.safeParse({ [fieldName]: value })

  if (!result.success) {
    // If validation fails, safely update formError with the errors for this field
    const fieldErrors = result.error.format()[fieldName]?._errors || []

    console.log('fieldErrors:', fieldErrors)

    // Update only the errors for the specific field, preserving other field errors
    formError.value = {
      ...errorsBackup,
      [fieldName]: { _errors: fieldErrors },
    }
  } else {
    // If validation succeeds, clear any errors ONLY for this field.
    formError.value[fieldName] = formError.value[fieldName] = []
  }
}

// Modals
const loading = ref(false)
const confirmationEmailModal = ref(false)

function signUp() {
  // Validate ALL the form fields (use formSchema).
  const result = formSchema.safeParse(form.value)

  if (!result.success) {
    const errors = result.error.format() || []
    console.log('signup errors', errors)

    formError.value = errors
    // Early return
    return
  } else {
    formError.value = null

    console.log(
      'user:',
      form.value.fullName,
      form.value.email,
      form.value.password
    )

    // Save the user data in the store
    userStore.setUser({
      name: form.value.fullName,
      email: form.value.email,
      password: form.value.password,
      isLoggedIn: false,
    })
  }

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

    <form @submit.prevent="onSubmit">
      <div class="field full-name">
        <label for="full-name">Full Name</label>
        <input
          name="full-name"
          type="text"
          v-model="form.fullName"
          @blur="() => validateField('fullName', form.fullName)"
        />

        <div class="errors">
          <p class="error" v-for="error in formError?.fullName?._errors">
            {{ error }}
          </p>
        </div>
      </div>

      <div class="field email">
        <label for="email">Email</label>
        <input
          name="email"
          type="email"
          v-model="form.email"
          @blur="() => validateField('email', form.email)"
        />

        <div class="errors">
          <p class="error" v-for="error in formError?.email?._errors">
            {{ error }}
          </p>
        </div>
      </div>

      <div class="field password">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          v-model="form.password"
          @blur="() => validateField('password', form.password)"
        />

        <div class="errors">
          <p class="error" v-for="error in formError?.password?._errors">
            {{ error }}
          </p>
        </div>
      </div>

      <div class="field confirm-password">
        <label for="confirm-password">Confirm Password</label>
        <input
          type="password"
          name="confirm-password"
          v-model="form.confirmPassword"
          @blur="() => validateField('confirmPassword', form.confirmPassword)"
        />

        <div class="errors">
          <p class="error" v-for="error in formError?.confirmPassword?._errors">
            {{ error }}
          </p>
        </div>
      </div>

      <button @click="signUp">Submit</button>
    </form>

    <div class="other-options">
      <p class="forgot-password" @click="handleSwitchAccessType('reset')">
        <span>Forgot your password?</span>
      </p>

      <div class="have-account">
        <p>Already have an account?</p>
        <p class="login" @click="handleSwitchAccessType('login')">
          Log In Here!
        </p>
      </div>
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

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;

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
  }

  .full-name,
  .email {
    height: 6rem;
    // border: 1px solid yellow;
  }

  .password {
    height: 10rem;
    // border: 1px solid green;
  }

  .confirm-password {
    height: 8rem;
    // border: 1px solid yellow;
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

    .have-account {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding-top: 1rem;

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
</style>
