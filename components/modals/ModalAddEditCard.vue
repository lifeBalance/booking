<script>
import { IMaskDirective } from 'vue-imask'
const dayjs = useDayjs()

export default {
  name: 'ModalAddEditCard',
  // props: ['title', 'modalOpen', 'card', 'handlers'],
  // setup(props) {
  //   // setup() receives props as the first argument.
  //   console.log('PROPS: ', props)
  // },
  props: {
    title: {
      type: String,
      required: true,
    },
    modalOpen: {
      type: Boolean,
      required: true,
    },
    card: {
      type: Object,
      validator: (card) => {
        if (Object.keys(card).length === 0) return true

        return (
          'cardId' in card &&
          typeof card.cardId === 'string' &&
          'cardBrand' in card &&
          typeof card.cardBrand === 'string' &&
          'cardName' in card &&
          typeof card.cardName === 'string' &&
          'cardNumber' in card &&
          typeof card.cardNumber === 'string' &&
          'cardExpiry' in card &&
          typeof card.cardExpiry === 'string' &&
          'cardCvc' in card &&
          typeof card.cardCvc === 'string'
        )
      },
      required: true,
    },
    handlers: {
      type: Object,
      default: () => ({
        cancelHandler: () => {},
        saveCard: () => {},
      }),
    },
  },
  setup(props) {
    // setup() receives props as the first argument.
    onActivated(() => {
      console.log('SETUP PROPS', props)
    })
    // console.log('SETUP PROPS', props)

    const title = ref(props.title)
    const cardId = ref(props.card?.cardId)
    const cardBrand = ref(props.card?.cardBrand)
    const cardName = ref(props.card?.cardName)
    const cardNumber = ref(props.card?.cardNumber)
    const cardExpiry = ref(props.card?.cardExpiry)
    const cardCvc = ref(props.card?.cardCvc)
    const unmaskedCardNumber = ref('')

    const error = ref({
      cardName: '',
      cardNumber: '',
      cardExpiry: '',
      cardCvc: '',
    })
    const cardBrands = ref([
      'fa6-brands:cc-visa',
      'fa6-brands:cc-mastercard',
      'fa6-brands:cc-amex',
      'fa6-brands:cc-jcb',
    ])
    const cardMask = ref({
      mask: '0000{ }0000{ }0000{ }0000',
      // lazy: false,
    })
    const cardExpiryMask = ref({
      mask: 'MM{/}YY',
      blocks: {
        MM: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
        },
        YY: {
          mask: IMask.MaskedRange,
          from: dayjs().format('YY'),
          to: dayjs().add(10, 'year').format('YY'),
        },
      },
      // lazy: false,
    })
    const cardCvcMask = ref({
      mask: '000',
      // lazy: false,
    })

    return {
      title,
      cardId,
      cardBrand,
      cardName,
      cardNumber,
      cardExpiry,
      cardCvc,
      unmaskedCardNumber,
      cardBrands,
      cardMask,
      cardExpiryMask,
      cardCvcMask,
      error,
    }
  },
  methods: {
    onAccept(e) {
      // console.log('onAccept', e)
      const value = e.detail.value
      const unmaskedValue = e.detail.unmaskedValue
      console.log(`onAccept - value: |${value}|`)
      console.log(`onAccept - unmasked value: |${unmaskedValue}|`)

      // Let's store both values
      this.cardNumber = value
      // Remove spaces from the unmasked value so we can validate it
      this.unmaskedCardNumber = unmaskedValue.replace(/\s/g, '')

      // this.isValidCardNumber()
    },
    onComplete(e) {
      const value = e.detail.value
      const unmaskedValue = e.detail.unmaskedValue
      console.log(`onComplete - value: |${value}|`)
      console.log(`onComplete - unmasked value: |${unmaskedValue}|`)

      // Validate the card number on completion
      this.isValidCardNumber()
      // If the component doesn't receive a car, use the unmasked card number
      // as the cardId (it contains no spaces).
      // this.cardId ||= this.unmaskedCardNumber.replace(/\s/g, '')
    },
    isValidCardNumber() {
      const n = this.unmaskedCardNumber
      console.log(`isValidCardNumber: |${n}| ${n.length}`)

      let sum = 0
      let shouldDouble = false
      for (let i = n.length - 1; i >= 0; i--) {
        let digit = parseInt(n.charAt(i), 10)

        if (shouldDouble) {
          if ((digit *= 2) > 9) digit -= 9
        }

        sum += digit
        shouldDouble = !shouldDouble
      }

      console.log(`isValidCardNumber: |${n}| ${n.length}`)
      if (n.length < 16) {
        console.log('Card number must be 16 digits')
        this.error = {
          ...this.error,
          cardNumber: 'Card number must be 16 digits',
        }
      } else if (sum % 10 !== 0) {
        this.error = { ...this.error, cardNumber: 'Invalid card number' }
      } else {
        this.error = { ...this.error, cardNumber: '' }
      }
    },
    onAcceptExpiry(e) {
      // console.log('onAcceptExpiry', e)
      const value = e.detail.value
      console.log(`onAcceptExpiry - value: |${value}|`)
      this.cardExpiry = value
    },
    isValidExpiry() {
      const n = this.cardExpiry.replace('/', '')
      console.log(`isValidExpiry: |${n}| ${n.length}`)
      if (n.length !== 4) {
        this.error = {
          ...this.error,
          cardExpiry: 'Expiry must be 4 digits (MM/YY)',
        }
      } else {
        this.error = { ...this.error, cardExpiry: '' }
      }
    },
    onAcceptCvc(e) {
      // console.log('onAcceptCvc', e)
      const value = e.detail.value
      console.log(`onAcceptCvc - value: |${value}|`)
      this.cardCvc = value
    },
    isValidCvc() {
      const n = this.cardCvc.replace('_', '')
      console.log(`isValidCvc: |${n}| ${n.length}`)
      if (n.length !== 3) {
        this.error = { ...this.error, cardCvc: 'CVC must be 3 digits' }
      } else {
        this.error = { ...this.error, cardCvc: '' }
      }
    },
    handleSaveCard() {
      console.log('saving')
      if (
        this.error.cardNumber ||
        this.error.cardExpiry ||
        this.error.cardCvc
      ) {
        console.log('Cannot save card')
        // Close the modal
        this.$props.handlers.cancelHandler()
        // Early return without saving the card
        return
      }

      // Call the function passed from the parent component
      this.$props.handlers.saveCard(
        {
          cardId: this.cardId,
          cardBrand: this.cardBrand,
          cardNumber: this.cardNumber,
          cardName: this.cardName,
          cardExpiry: this.cardExpiry,
          cardCvc: this.cardCvc,
        },
        this.cardId
      )
    },
  },
  directives: {
    imask: IMaskDirective,
  },
  watch: {
    unmaskedCardNumber(newVal) {
      const number = this.unmaskedCardNumber
      console.log('card changed:', newVal)

      // Check the card brand
      if (number.startsWith('4')) {
        this.cardBrand = 'visa'
      } else if (number.startsWith('5')) {
        this.cardBrand = 'mastercard'
      } else if (number.startsWith('3')) {
        this.cardBrand = 'amex'
      } else if (number.startsWith('35')) {
        this.cardBrand = 'jcb'
      } else {
        this.cardBrand = 'unknown'
      }
    },
  },
  watch: {
    card(newVal) {
      console.log('card changed:', newVal)
      this.cardId = newVal.cardId
      this.cardBrand = newVal.cardBrand
      this.cardName = newVal.cardName
      this.cardNumber = newVal.cardNumber
      this.cardExpiry = newVal.cardExpiry
      this.cardCvc = newVal.cardCvc
    },
  },
}
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <section
        class="modal"
        :class="{ open: modalOpen }"
        :modalOpen="modalOpen"
      >
        <section class="modal-card">
          <header>
            <h4>{{ title }}</h4>

            <div class="icons">
              <Icon v-for="brand in cardBrands" :name="brand" />
            </div>
          </header>

          <div class="modal-content">
            <div class="card-number">
              <label for="card-number">Card Number</label>
              <input
                name="card-number"
                :value="cardNumber"
                v-imask="cardMask"
                @accept="onAccept"
                @complete="onComplete"
                placeholder="1234 5678 9012 3456"
                @blur="isValidCardNumber"
              />
              <span class="error">{{ error?.cardNumber }}</span>
            </div>

            <div class="card-name">
              <label for="card-name">Name on Card</label>
              <input
                name="card-name"
                type="text"
                placeholder="Your name on the card"
                required
                autocomplete="off"
                v-model="cardName"
                @blur="error.cardName = cardName ? '' : 'Name is required'"
              />
              <span class="error">{{ error?.cardName }}</span>
            </div>

            <div class="expiry-code">
              <div class="expiry">
                <label for="expiry">Expiry date</label>
                <input
                  name="expiry"
                  placeholder="01/11"
                  required
                  autocomplete="off"
                  :value="cardExpiry"
                  v-imask="cardExpiryMask"
                  @accept="onAcceptExpiry"
                  @complete="isValidExpiry"
                  @blur="isValidExpiry"
                />
                <span class="error">{{ error?.cardExpiry }}</span>
              </div>

              <div class="cvc">
                <label for="cvc">CVC</label>
                <input
                  name="cvc"
                  type="text"
                  placeholder="123"
                  required
                  autocomplete="off"
                  :value="cardCvc"
                  v-imask="cardCvcMask"
                  @accept="onAcceptCvc"
                  @complete="isValidCvc"
                  @blur="isValidCvc"
                />
                <span class="error">{{ error?.cardCvc }}</span>
              </div>
            </div>
          </div>

          <div class="btn-box">
            <button class="btn btn-cancel" @click="handlers.cancelHandler">
              Cancel
            </button>
            <button class="btn" @click="handleSaveCard">Save</button>
          </div>
        </section>
      </section>
    </Teleport>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  opacity: 0;
  visibility: hidden;
  transition: all 0.5s ease-in-out;
  background-color: var(--color-bg-modal);
  color: white;
}

.modal.open {
  opacity: 1;
  visibility: visible;
}

.modal-card {
  font-family: 'Inter', sans-serif;
  background-color: rgb(var(--color-bg));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  padding: 1rem;
  margin: 0 2.5%;
  border-radius: var(--radius-default);
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
  border-radius: var(--radius-default);
  width: 100%;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(var(--color-accent-1), 0.9);
  }
}

.error {
  display: block;
  color: rgba(var(--color-accent-2), 0.9);
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

  &:disabled {
    border-color: rgb(var(--color-text-3));
    color: rgb(var(--color-text-3));
    cursor: not-allowed;
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
