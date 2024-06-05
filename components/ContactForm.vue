<script setup></script>

<template>
  <section class="contact">
    <div class="text-box">
      <h2>Want to send us a message?</h2>

      <p class="cta-text">
        If you have some <strong>question</strong> about a course, an
        <strong>incidence</strong> regarding your booking, or just at
        <strong>suggestion</strong>, please feel free to send us a message. We
        will be happy to help you.
      </p>
    </div>

    <form action="#" name="sign-up">
      <div class="full-name">
        <label for="full-name">Full name</label>
        <input
          id="full-name"
          type="text"
          placeholder="John Doe"
          name="full-name"
          required
          autocomplete="off"
        />
      </div>

      <div class="email">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="me@example.com"
          name="email"
          required
          autocomplete="off"
        />
      </div>

      <div class="select">
        <label for="select-where">What is your message about?</label>
        <select id="select-where" name="select-where" required>
          <option value="">Please select an option:</option>
          <option value="booking">Incidence during Booking</option>
          <option value="course">Question about a course</option>
          <option value="anything">Anything else</option>
        </select>
      </div>

      <div class="message">
        <label for="email">Your Message</label>
        <textarea
          id="text"
          placeholder="Your message..."
          name="message"
          required
          autocomplete="off"
        ></textarea>
      </div>

      <button class="btn btn--form">Submit</button>
    </form>
  </section>
</template>

<style lang="scss" scoped>
section {
  background-color: #23262d;
  padding: 1rem;
  border-radius: 7px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 90%;
  margin: 0 auto;
  padding: 2rem;

  p {
    color: rgb(var(--color-text-1), 0.8);
    line-height: 1.4;
  }

  h2 {
    color: rgb(var(--color-text-1));
    margin-bottom: 1rem;
  }

  form {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
    column-gap: 1rem;

    label {
      color: rgb(var(--color-text-1));
      display: block;
      font-weight: 500;
      margin-bottom: 0.8rem;
    }

    & *:focus {
      outline: none;
      box-shadow: 0 0 0 0.2rem rgba(var(--color-accent-1), 0.9);
    }

    input,
    textarea,
    select {
      padding: 0.5rem;
      font-size: 1.2rem;
      font-family: inherit;
      color: rgb(var(--color-text-2));
      border: 1px solid rgba(var(--color-text-1), 0.2);
      background-color: rgba(var(--color-bg), 0.9);
      border-radius: 7px;
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
      font-size: clamp(1.2rem, 4vw, 2rem);
      font-weight: 500;
      transition: all 0.3s ease-in-out;

      &:hover,
      &:active {
        background-color: rgba(var(--color-accent-1), 0.2);
        scale: 1.01;
      }
    }
  }
}

/* MEDIA QUERIES */
@media (min-width: 350px) {
}

@media (min-width: 480px) {
  section {
    max-width: 85%;
  }
}

@media (min-width: 768px) {
  section {
    form {
      grid-template-columns: 1fr 1fr;
    }

    .full-name,
    .email {
      grid-row: 1;
    }

    .select {
      grid-column: 1;
      /* grid-row: 1; */
    }
    .message {
      grid-row: 3;
      grid-column: span 2;
    }

    .btn {
      grid-column: 1 / -1;
      /* grid-row: -1; */
    }
  }
}

@media (min-width: 992px) {
}

@media (min-width: 1200px) {
}
</style>
