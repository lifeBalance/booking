<script setup>
import { useUserStore } from '~/stores'

// Call the user store to get the goodies
const userStore = useUserStore()
const router = useRouter()

onMounted(() => {
  console.log('Payment mounted')

  // Get the user's login status as computed property (see comments in ModalNav.vue)
  const isLoggedIn = computed(() => userStore.isLoggedIn())
  console.log('armory page - isLoggedIn', isLoggedIn.value)

  // Redirect to login page if user is not logged in
  if (!isLoggedIn.value) {
    router.push('/login')
  }
})

const cardNumberNoSpaces = (n) => n.replace(/\s/g, '')
const state = reactive({
  loading: false,
  cards: [
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
  ].map((card) => {
    return { ...card, cardId: cardNumberNoSpaces(card.cardNumber) }
  }),
  cardModal: false,
  editedCard: {},
  paymentConfirmation: false,
})

const otherMethods = [
  { brand: 'MobilePay', details: 'Pay with the MobilePay app' },
  { brand: 'PayTrail', details: 'Pay with the PayTrail app' },
]

const deleteCard = (cardId) => {
  console.log('delete card', cardId) // testing
  state.cards = state.cards.filter((item) => {
    return item.cardId !== cardId
  })
  console.log('cards:', state.cards)
}

const editCard = (card) => {
  console.log('edit card:', card) // testing
  // Set the card to be edited
  state.editedCard = { ...card }
  // and open the modal
  state.cardModal = true
  console.log('edited card:', state.editedCard) // testing
}

const handleCloseCardModal = () => {
  console.log('payment: close modal')
  // Close the modal
  state.cardModal = false
  state.editedCard = {}
  document.body.style.overflow = 'auto' // Allow scrolling

  if (state.paymentConfirmation) {
    state.paymentConfirmation = false
    // Redirect to home page
    router.push('/')
  }
}

const handleSelectPayment = (paymentMethod) => {
  console.log('selected payment:', paymentMethod)
  state.loading = true // set loading state to mimic backend payment processing
  document.body.style.overflow = 'hidden' // When modal is up, avoid scrolling

  setTimeout(() => {
    state.loading = false
    state.paymentConfirmation = true
  }, 2500)
}

const handleAddCard = () => {
  console.log('add card')
  // modalOpen.value = true
  state.cardModal = true
  state.editedCard = {}
}

// This method is used for saving a card (either new or edited)
const saveCard = (card, cardId) => {
  console.log(`saving card: ${JSON.stringify(card)}, cardId: ${cardId}`)

  const cardIds = state.cards.map((item) => item.cardId)

  if (
    !card?.cardNumber?.length ||
    !card?.cardName?.length ||
    !card?.cardExpiry?.length ||
    !card?.cardCvc?.length
  ) {
    console.log('invalid card: can NOT save!')
  } else if (!cardId) {
    // If the user is ADDING a card, check if the card already exists
    if (cardIds.includes(cardId)) {
      console.log('card already exists:', cardId)
    } else {
      state.cards = [...state.cards, card]
    }
  } else if (cardId) {
    // If the user is EDITING a card, update the card
    console.log('editing card:', cardId)
    const newCards = []
    for (let existingCard of state.cards) {
      // Traverse the array, and replace the card with the new details
      if (existingCard.cardId === cardId) {
        console.log('replacing card:', cardId)
        newCards.push(card)
      } else {
        console.log('adding card:', cardId)
        newCards.push(existingCard)
      }
    }
    // New array (should trigger reactivity)
    state.cards = newCards
    console.log('new cards:', state.cards)
  }

  // Reset the modal and edited card
  state.cardModal = false
  state.editedCard = {}
}
</script>

<template>
  <section class="payment">
    <Stepper activeStep="3" />

    <YourOrder />

    <div class="payment-methods">
      <h2><Icon name="ic:baseline-credit-card" /> Payment Methods</h2>

      <PaymentMethod title="Credit / Debit">
        <p class="no-cards" v-if="state.cards.length === 0">
          You haven't added any Card
        </p>
        <div v-else>
          <CardPayment
            v-for="(card, idx) in state.cards"
            :key="card.cardId"
            :card="card"
            :class="{ separator: idx < state.cards.length - 1 }"
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

    <!-- <Modal :modalOpen="state.cardModal" @closeModal="handleCloseCardModal"> -->
    <ModalAddEditCard
      :modalOpen="state.cardModal"
      @closeModal="handleCloseCardModal"
      :title="
        state.editedCard?.cardId
          ? 'Edit Credit / Debit Card'
          : 'Add New Credit / Debit Card'
      "
      :card="state.editedCard"
      :handlers="{ cancelHandler: handleCloseCardModal, saveCard }"
    />
    <!-- </Modal> -->

    <Modal :modalOpen="state.loading || state.paymentConfirmation">
      <LoadingModal
        v-if="state.loading"
        msg="We're processing your payment..."
      />

      <PaymentConfirmation
        v-else-if="state.paymentConfirmation"
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
