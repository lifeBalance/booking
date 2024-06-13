<script setup>
const basket = ref([
  {
    name: 'Shooting range - 11-12-2024',
    qty: 1,
    price: 70,
  },
  {
    name: 'Instructor - per hour',
    qty: 1,
    price: 30,
  },
  {
    name: 'Glock 19 - per hour',
    qty: 1,
    price: 30,
  },
  {
    name: '9mm Luger',
    qty: 25,
    price: 10,
  },
])
</script>

<template>
  <section class="order">
    <h2><Icon name="material-symbols:shopping-cart" />Your Order</h2>
    <ul class="order-items">
      <li class="order-item">
        <p>Product Description</p>
        <p>Qty</p>
        <p>Price</p>
      </li>

      <li v-for="(item, idx) in basket" class="order-item">
        <p>{{ item.name }}</p>
        <p>{{ item.qty }}</p>
        <p>{{ item.price }}</p>
      </li>

      <li class="order-item">
        <p></p>
        <p>Total</p>
        <p>{{ basket.reduce((acc, item) => acc + item.price, 0) }}</p>
      </li>
    </ul>
  </section>
</template>

<style lang="scss">
.order {
  // margin: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    color: rgb(var(--color-accent-1));
    font-size: 1.5rem;
    font-weight: 500;
    padding-bottom: 1rem;
  }

  .order-items {
    width: 100%;
    color: rgba(var(--color-text-2));

    .order-item {
      display: grid;
      grid-template-columns: 4fr 1fr 1fr;
      padding: 1rem 0.2rem;
      // border-bottom: 1px solid rgba(var(--color-text-3));

      &:first-child {
        font-weight: 700;
        border-bottom: 1px solid rgba(var(--color-text-3));
      }

      &:nth-child(even) {
        border-bottom: none;
        background-color: rgba(var(--color-text-3), 0.1);
      }

      &:last-child {
        border-top: 1px solid rgba(var(--color-text-3));
        font-weight: 700;
      }
      
      & p {
        text-align: center;
      }

      & p:first-child {
        text-align: left;
      }
    }
  }
}
</style>
