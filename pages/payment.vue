<script setup>
import { useUserStore } from '~/stores'

// Call the user store to get the goodies
const userStore = useUserStore()
const router = useRouter()

// Get the user's login status as computed property (see comments in ModalNav.vue)
const isLoggedIn = computed(() => userStore.isLoggedIn())
console.log('armory page - isLoggedIn', isLoggedIn.value)

if (!isLoggedIn.value) {
  router.push('/login')
}

// Edit/Add card modal
const modalName = ref('')

const loading = ref(false)
const paymentConfirmation = ref(false)

let cards = ref([
  {
    cardBrand: 'visa',
    cardNumber: '1234 4321 5678 1122',
    cardName: 'John Doe',
    cardExpiry: '08/28',
    cardCvc: '059',
  },
  {
    cardBrand: 'mastercard',
    cardNumber: '1234 4321 5678 3344',
    cardName: 'John Doe',
    cardExpiry: '05/29',
    cardCvc: '059',
  },
])
let editedCard = ref(null)

const otherMethods = [
  { brand: 'MobilePay', details: 'Pay with the MobilePay app' },
  { brand: 'PayTrail', details: 'Pay with the PayTrail app' },
]

const deleteCard = (number) => {
  console.log('delete card', number)
  cards.value = cards.value.filter((item) => item.cardNumber !== number)
  console.log('cards:', cards)
}

const editCard = (cardNumber) => {
  console.log('edit card:', cardNumber)
  editedCard.value = cards.value.find((item) => item.cardNumber === cardNumber)
  modalName.value = 'editCard'
}

const handleCloseCardModal = () => {
  console.log('payment: close modal')
  modalName.value = ''
  document.body.style.overflow = 'auto' // Allow scrolling
  if (editedCard.value) {
    editedCard.value = null
  } else if (paymentConfirmation.value) {
    paymentConfirmation.value = false
    // Redirect to home page
    router.push('/')
  }
}

const handleSelectPayment = (paymentMethod) => {
  console.log('selected payment:', paymentMethod)
  loading.value = true // set loading state to mimic backend payment processing
  document.body.style.overflow = 'hidden' // When modal is up, avoid scrolling

  setTimeout(() => {
    loading.value = false
    paymentConfirmation.value = true
  }, 2500)
}

const handleAddCard = () => {
  console.log('add card')
  // modalOpen.value = true
  modalName.value = 'addCard'
}

const saveCard = (card) => {
  console.log('saving card', card)

  cards.value.push(card)
  // Close the modal when added
  modalName.value = ''
  if (editedCard.value) {
    // Update the card
    cards.value = cards.value.map((item) => {
      if (item.cardNumber === editedCard.value.cardNumber) {
        return card
      }
      return item
    })
    editedCard.value = null
  }
}
</script>

<template>
  <section class="payment">
    <Stepper activeStep="3" />

    <YourOrder />

    <div class="payment-methods">
      <h2><Icon name="ic:baseline-credit-card" /> Payment Methods</h2>

      <PaymentMethod title="Credit / Debit">
        <p class="no-cards" v-if="cards.length === 0">
          You haven't added any Card
        </p>
        <div v-else>
          <CardPayment
            v-for="(card, idx) in cards"
            :card="card"
            :class="{ separator: idx < cards.length - 1 }"
            :deleteCard="deleteCard"
            :editCard="editCard"
            @selectCard="handleSelectPayment"
          />
        </div>
      </PaymentMethod>

      <div class="add-card" @click="handleAddCard">
        <div class="btn">
          <Icon class="icon" name="ic:outline-add-card" />
          <h3>Add Credit / Debit Card</h3>
        </div>
      </div>

      <PaymentMethod title="Other">
        <OtherMethod
          v-for="(method, idx) in otherMethods"
          :brand="method.brand"
          :details="method.details"
          :class="{ separator: idx < otherMethods.length - 1 }"
          @selectPayment="handleSelectPayment"
        />
      </PaymentMethod>
    </div>

    <Modal :modalOpen="modalName !== ''" @closeModal="handleCloseCardModal">
      <ModalAddEditCard
        v-if="modalName === 'addCard'"
        title="Add New Credit / Debit Card"
        :card="{
          cardNumber: '',
          cardName: '',
          cardExpiry: '',
          cardCvc: '',
          cardBrand: '',
        }"
        :handlers="{ cancelHandler: handleCloseCardModal, saveCard }"
      />

      <ModalAddEditCard
        v-else-if="modalName === 'editCard'"
        title="Edit Credit / Debit Card"
        :card="editedCard"
        :handlers="{ cancelHandler: handleCloseCardModal, saveCard }"
      />
    </Modal>

    <Modal :modalOpen="loading || paymentConfirmation">
      <LoadingModal v-if="loading" msg="We're processing your payment..." />

      <PaymentConfirmation
        v-else-if="paymentConfirmation"
        :closeModal="handleCloseCardModal"
      />
    </Modal>
  </section>
</template>

<style lang="scss" scoped>
.payment {
  width: 90%;
  padding: 6rem 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;

  .add-card {
    margin-left: auto;
    margin-right: 1rem;
    padding-bottom: 1rem;

    .btn {
      display: flex;
      width: max-content;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      color: rgb(var(--color-accent-1));
      border: 1px solid rgb(var(--color-accent-1));
      border-radius: var(--radius-default);
      padding: 0.5rem 1rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background-color: rgba(var(--color-accent-1), 0.3);
        scale: 1.01;
      }
    }

    .icon {
      font-size: 1.5rem;
    }
  }

  .payment-methods {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;

    h2 {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      text-align: center;
      color: rgb(var(--color-accent-1));
      padding-bottom: 1rem;
    }

    .no-cards {
      color: rgb(var(--color-text-2));
      padding: 1rem;
    }
  }
}

/* MEDIA QUERIES */
@media (min-width: 350px) {
}

@media (min-width: 480px) {
  .payment {
    // padding: 6rem 8%;
  }
}

@media (min-width: 768px) {
  .payment {
    // padding: 6rem 10%;
    width: 80%;
  }
}

@media (min-width: 992px) {
  .payment {
    // padding: 6rem 12%;
  }
}

@media (min-width: 1200px) {
  .payment {
    // padding: 6rem 12%;
  }
}
</style>