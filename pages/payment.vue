<script setup>
import { reactive } from 'vue'

const state = reactive({
  cards: [
    {
      cardBrand: 'visa',
      cardNumber: '1234 4321 5678 1122',
      cardExpiry: '08/28',
    },
    {
      cardBrand: 'mastercard',
      cardNumber: '1234 4321 5678 3344',
      cardExpiry: '05/29',
    },
  ],
})

const otherMethods = [
  { brand: 'MobilePay', details: 'Pay with the MobilePay app' },
  { brand: 'PayTrail', details: 'Pay with the PayTrail app' },
]

const handleSelectCard = (cardNumber) => {
  console.log('select card:', cardNumber)
}

const handleEditCard = (cardNumber) => {
  console.log('edit card:', cardNumber)
}

const handleDeleteCard = (cardNumber) => {
  console.log('delete card', cardNumber)
  state.cards = state.cards.filter((card) => card.cardNumber !== cardNumber)
}
</script>

<template>
  <section class="payment">
    <Stepper activeStep="3" />

    <div class="payment-methods">
      <h2><Icon name="ic:baseline-credit-card" /> Payment Methods</h2>

      <PaymentMethod title="Credit / Debit">
        <CardPayment
          v-for="(card, idx) in state.cards"
          :card="card"
          :class="{ separator: idx < state.cards.length - 1 }"
          @selectCard="handleSelectCard"
          @deleteCard="handleDeleteCard"
          @editCard="handleEditCard"
        />
      </PaymentMethod>

      <div class="add-card" @click="() => console.log('adding card')">
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
        />
      </PaymentMethod>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.payment {
  padding: 6rem 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.add-card {
  margin-left: auto;
  .btn {
    display: flex;
    width: max-content;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    color: rgb(var(--color-accent-1));
    border: 1px solid rgb(var(--color-accent-1));
    border-radius: 7px;
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
  padding: 4rem 0;

  h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    text-align: center;
    color: rgb(var(--color-accent-1));
  }
}

/* MEDIA QUERIES */
@media (min-width: 350px) {
}

@media (min-width: 480px) {
  .payment {
    padding: 6rem 8%;
  }
}

@media (min-width: 768px) {
  .payment {
    padding: 6rem 10%;
  }
}

@media (min-width: 992px) {
  .payment {
    padding: 6rem 12%;
  }
}

@media (min-width: 1200px) {
  .payment {
    padding: 6rem 12%;
  }
}
</style>
