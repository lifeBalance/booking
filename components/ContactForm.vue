<script setup>
const selectOptions = [
  { value: '', label: 'Please Select an Option' },
  { value: 'booking', label: 'Booking' },
  { value: 'courses', label: 'Courses' },
  { value: 'anything', label: 'Anything' },
]
</script>

<template>
  <section class="contact-form">
    <div class="form-box">
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

          <CustomSelect
            label="What is your message about?"
            :options="selectOptions"
          />
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
    </div>
    <!-- .form-box -->

    <div class="img-box"></div>
  </section>
</template>

<style lang="scss" scoped>
.contact-form {
  display: flex;
  margin: 6rem auto;

  & .form-box {
    background-color: rgb(var(--color-bg-2));
    padding: 1rem;
    border-radius: var(--radius-default);
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 90%;
    min-width: 50%;
    margin: 0 auto;
    padding: 2rem;

    p {
      color: rgb(var(--color-text-1), 0.8);
      line-height: 1.4;
    }

    h2 {
      color: rgb(var(--color-accent-1));
      margin-bottom: 1rem;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 2rem;

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

      .select {
        grid-column: 1 / -1;
      }

      input,
      textarea {
        padding: 0.5rem;
        font-size: 1.2rem;
        font-family: inherit;
        color: rgb(var(--color-text-2));
        border: 1px solid rgba(var(--color-text-1), 0.2);
        background-color: rgba(var(--color-bg), 0.9);
        border-radius: var(--radius-default);
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
  } // & .form-box

  & .img-box {
    display: none;
  }
}

/* MEDIA QUERIES */
@media (min-width: 350px) {
  .contact-form {
    & .form-box {
      border-radius: var(--radius-default);
    }
  }
}

@media (min-width: 480px) {
}

@media (min-width: 768px) {
  .contact-form {
    padding-left: 7%;
    padding-right: 7%;

    & .form-box {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    } // & .form-box

    & .img-box {
      display: block;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-top-right-radius: var(--radius-default);
      border-bottom-right-radius: var(--radius-default);
      min-width: 50%;
      background-image: url('~/assets/images/contact-form.jpg');
      background-size: cover;
      background-position: center;
    } // & .img-box
  } // .contact-form
}

@media (min-width: 992px) {
  .contact-form {
    padding-left: 10%;
    padding-right: 10%;
  }
}

@media (min-width: 1200px) {
}
</style>
