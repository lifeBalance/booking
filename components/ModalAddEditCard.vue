<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  card: {
    type: Object,
    default: () => ({
      cardNumber: '',
      cardName: '',
      cardExpiry: '',
      cardCvc: '',
      cardBrand: '',
    }),
  },
  handlers: {
    type: Object,
    default: () => ({
      cancelHandler: () => {},
      saveCard: () => {},
    }),
  },
})

const state = reactive({
  card: {
    cardNumber: { number: props.card.cardNumber, error: '' },
    cardName: { name: props.card.cardName, error: '' },
    cardExpiry: { expiry: props.card.cardExpiry, error: '' },
    cardCvc: { cvc: props.card.cardCvc, error: '' },
    cardBrand: { brand: props.card.cardBrand },
  },
})

const cardBrands = [
  'fa6-brands:cc-visa',
  'fa6-brands:cc-mastercard',
  'fa6-brands:cc-amex',
  'fa6-brands:cc-jcb',
]

const handleSaveCard = () => {
  console.log('saving')
  console.log(state.card)
  // Call the function passed from the parent component
  props.handlers.saveCard({
    cardBrand: state.card.cardBrand.brand,
    cardNumber: state.card.cardNumber.number,
    cardName: state.card.cardName.name,
    cardExpiry: state.card.cardExpiry.expiry,
    cardCvc: state.card.cardCvc.cvc,
  })
}

watch(
  state.card,
  (newVal) => {
    const number = newVal.cardNumber.number
    // console.log('card changed:', newVal)

    // Check the card brand
    if (number.startsWith('4')) {
      state.card.cardBrand.brand = 'visa'
    } else if (number.startsWith('5')) {
      state.card.cardBrand.brand = 'mastercard'
    } else if (number.startsWith('3')) {
      state.card.cardBrand.brand = 'amex'
    } else if (number.startsWith('35')) {
      state.card.cardBrand.brand = 'jcb'
    } else {
      state.card.cardBrand.brand = 'unknown'
    }
  },
  { deep: true }
)

const isValidCardNumber = () => {
  const cardNumber = state.card.cardNumber.number.replace(/\s/g, '')

  let sum = 0
  let shouldDouble = false
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10)

    if (shouldDouble) {
      if ((digit *= 2) > 9) digit -= 9
    }

    sum += digit
    shouldDouble = !shouldDouble
  }

  if (sum % 10 === 0) {
    state.card.cardNumber.error = ''
  } else {
    state.card.cardNumber.error = 'Invalid card number'
  }
}

// CARD NUMBER HANDLERS
const handleCardNumberKeydown = (event) => {
  const noWhiteSpace = state.card.cardNumber.number.replace(/\s/g, '')
  const regex = /^\d+$/

  // Clear the whitespace from the card number
  // Prevent input when the entered string contains 16 digits and the key pressed is not a backspace
  if (noWhiteSpace.length >= 16 && event.key !== 'Backspace') {
    event.preventDefault()
  } else if (event.key !== 'Backspace' && !regex.test(event.key)) {
    // Check if the entered string contains only digits
    // Prevent non-numeric input
    event.preventDefault()
  }
}

const handleCardNumberInput = (event) => {
  console.log('card number input:', event.target.value)
  // Remove spaces from the card number
  let noWhiteSpace = event.target.value.replace(/\s/g, '')

  // // Add a space after every 4 digits
  state.card.cardNumber.number = noWhiteSpace.replace(/(.{4})(?=\d)/g, '$1 ')

  if (noWhiteSpace.length === 16) {
    isValidCardNumber()
  }
}

const handleCardExpiryKeydown = (event) => {
  console.log('card number keydown:', event.key)
  // Clear the whitespace from the card number
  const content = state.card.cardExpiry.expiry.replace(/\//g, '')
  console.log('content keydown:', content)
  // Prevent input when the entered string contains 16 digits and the key pressed is not a backspace
  const regex = /^\d+$/
  // Prevent non-numeric input
  if (!regex.test(event.key) && event.key !== 'Backspace') {
    event.preventDefault()
  } else if (content.length === 0 && parseInt(event.key) > 3) {
    event.preventDefault()
  } else if (
    content.length === 1 &&
    parseInt(content + event.key) > 31 &&
    event.key !== 'Backspace'
  ) {
    event.preventDefault()
  } else if (
    content.length === 2 &&
    !regex.test(event.key) &&
    event.key !== 'Backspace'
  ) {
    event.preventDefault()
  } else if (
    content.length === 3 &&
    !regex.test(event.key) &&
    event.key !== 'Backspace'
  ) {
    event.preventDefault()
  } else if (content.length >= 4 && event.key !== 'Backspace') {
    event.preventDefault()
  }
}

const handleCardExpiryInput = (event) => {
  console.log('card number input:', event.target.value)
  // Remove spaces from the card number
  let noWhiteSpace = event.target.value.replace(/\s/g, '')

  // Add a slash after every 2 digits
  state.card.cardExpiry.expiry = noWhiteSpace.replace(/(\d{2})(?=\d)/g, '$1/')
}

const handleCardCvcKeydown = (event) => {
  console.log('card cvc keydown:', event.key)
  // Prevent input when the entered string contains 3 digits and the key pressed is not a backspace
  if (event.target.value.length >= 3 && event.key !== 'Backspace') {
    event.preventDefault()
  }
}
</script>

<template>
  <section class="modal-card">
    <header>
      <h4>{{ props.title }}</h4>

      <div class="icons">
        <Icon v-for="brand in cardBrands" :name="brand" />
      </div>
    </header>

    <div class="modal-content">
      <div class="card-number">
        <label for="card-number">Card Number</label>
        <input
          id="card-number"
          type="text"
          placeholder="1234 5678 9012 3456"
          name="card-number"
          required
          autocomplete="off"
          :value="state.card.cardNumber.number"
          @input="handleCardNumberInput"
          @keydown="handleCardNumberKeydown"
          @blur="isValidCardNumber(state.card.cardNumber.number)"
        />
        <span class="error">{{ state.card.cardNumber.error }}</span>
      </div>

      <div class="card-name">
        <label for="card-name">Name on Card</label>
        <input
          id="card-name"
          type="text"
          placeholder="Your name on the card"
          name="card-name"
          required
          autocomplete="off"
          v-model="state.card.cardName.name"
          @blur="
            state.card.cardName.error = state.card.cardName.name
              ? ''
              : 'Name is required'
          "
        />
        <span class="error">{{ state.card.cardName.error }}</span>
      </div>

      <div class="expiry-code">
        <div class="expiry">
          <label for="expiry">Expiry date</label>
          <input
            id="expiry"
            type="text"
            placeholder="01 / 11"
            name="expiry"
            required
            autocomplete="off"
            :value="state.card.cardExpiry.expiry"
            @input="handleCardExpiryInput"
            @keydown="handleCardExpiryKeydown"
          />
          <span class="error">{{ state.card.cardExpiry.error }}</span>
        </div>

        <div class="cvc">
          <label for="cvc">CVC</label>
          <input
            id="cvc"
            type="text"
            placeholder="123"
            name="cvd"
            required
            autocomplete="off"
            :value="state.card.cardCvc.cvc"
            @keypress="handleCardNumberKeypress"
            @keydown="handleCardCvcKeydown"
          />
          <span class="error">{{ state.card.cardCvc.error }}</span>
        </div>
      </div>
    </div>

    <div class="btn-box">
      <button class="btn btn-cancel" @click="props.handlers.cancelHandler">
        Cancel
      </button>
      <button class="btn" @click="handleSaveCard()">Save</button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.modal-card {
  font-family: 'Inter', sans-serif;
  background-color: rgb(var(--color-bg));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  padding: 1rem;
  margin: 0 2.5%;
  border-radius: 7px;
  border: 0.5px solid rgba(var(--color-text-3), 0.9);

  header {
    h4 {
      color: rgb(var(--color-accent-1));
      text-align: center;
      font-size: 1.4rem;
      font-weight: 400;
      padding-bottom: 0.5rem;
    }

    .icons {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      font-size: 2rem;
      color: rgb(var(--color-text-3));
    }
  }
}

.modal-content {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;

  label {
    display: inline-block;
    margin-left: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
    color: rgb(var(--color-text-2));
  }

  .expiry-code {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
}

input {
  padding: 0.3rem 0.5rem;
  font-size: 1.2rem;
  font-family: inherit;
  color: rgb(var(--color-text-2));
  border: 1px solid rgba(var(--color-text-1), 0.2);
  background-color: rgb(var(--color-bg));
  border-radius: 7px;
  width: 100%;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(var(--color-accent-1), 0.9);
  }
}

.error {
  display: block;
  color: rgb(var(--color-accent-2));
  font-size: 0.8rem;
  padding-left: 0.5rem;
  margin-top: 0.3rem;
  position: absolute;
}

.btn-box {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.btn {
  all: unset;
  color: rgb(var(--color-accent-1));
  padding: 0.5rem 2em;
  border: 1px solid rgb(var(--color-accent-1));
  border-radius: 5px;
  text-align: center;
  display: inline-block;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  min-width: 4rem;

  &:hover {
    background-color: rgb(var(--color-accent-1));
    color: rgb(var(--color-bg));
    scale: 1.05;
  }
}

.btn-cancel {
  color: rgb(var(--color-text-3));
  border: 1px solid rgb(var(--color-text-3));

  &:hover {
    background-color: transparent;
    color: rgb(var(--color-accent-2));
    border: 1px solid rgb(var(--color-accent-2));
  }
}
</style>
