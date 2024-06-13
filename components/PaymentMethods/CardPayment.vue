<script setup>
const props = defineProps({
  card: Object,
  deleteCard: Function,
  editCard: Function,
})
const emits = defineEmits(['selectCard'])
const { cardBrand, cardNumber, cardExpiry } = props.card
console.table(props.card)

const hideDigits = (cardNumber, numCharsToHide) => {
  // Split string into array
  const arr = cardNumber.split('')
  // Map digits to an array of spans
  const masked = arr.map((char) => {
    if (char !== ' ' && numCharsToHide) {
      numCharsToHide = numCharsToHide - 1
      return '<span class="dot">&#183;</span>'
    } else {
      return char
    }
  })
  return masked.join('')
}

const iconName = (cardBrand) => {
  if (cardBrand === 'visa') return 'fa6-brands:cc-visa'
  else if (cardBrand === 'mastercard') return 'fa6-brands:cc-mastercard'
  else if (cardBrand === 'jcb') return 'fa6-brands:cc-jcb'
  else if (cardBrand === 'amex') return 'fa6-brands:cc-amex'
  else return 'ic:baseline-credit-card'
}
</script>

<template>
  <section class="card-method">
    <div class="card-details" @click="emits('selectCard', cardNumber)">
      <h3><Icon :name="iconName(cardBrand)" />{{ cardBrand }}</h3>
      <p>
        <span v-html="hideDigits(cardNumber, 12)"></span> ({{ cardExpiry }})
      </p>
    </div>

    <div class="btn-box">
      <button class="edit" @click="props.editCard(props.card.cardNumber)">
        <Icon class="icon" name="ph:pencil" />
      </button>
      <button class="delete" @click="props.deleteCard(props.card.cardNumber)">
        <Icon class="icon" name="ph:trash" />
      </button>
    </div>
  </section>
</template>

<style>
.card-method {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(var(--color-text-1));
  padding: 1rem;
  transition: all 0.3s ease-in-out;

  .card-details {
    cursor: pointer;
    &:hover * {
      color: rgb(var(--color-accent-1));
    }

    h3 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding-bottom: 0.2rem;
      text-transform: capitalize;
      font-weight: 400;
      color: rgb(var(--color-text-2));
    }

    .dot {
      font-size: 1.2rem;
      letter-spacing: 1px;
      font-weight: 700;
    }
  }

  .btn-box {
    display: flex;
    gap: 0.5rem;

    button {
      all: unset;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;
      border: 1px solid rgb(var(--color-text-2));
      border-radius: 3px;
      background-color: transparent;
      color: rgb(var(--color-text-2));
      transition: all 0.3s ease;
      
      .icon {
        font-size: 1.2rem;
        color: rgb(var(--color-text-2));
        transition: all 0.3s ease;
      }

      &.edit:hover {
        .icon {
          color: rgb(var(--color-accent-1));
        }
        border-color: rgb(var(--color-accent-1));
      }

      &.delete:hover {
        .icon {
          color: rgb(var(--color-accent-2));
        }
        border-color: rgb(var(--color-accent-2));
      }
    }
  }
}
.card-method.separator {
  border-bottom: 1px solid rgba(var(--color-text-3));
}
</style>
