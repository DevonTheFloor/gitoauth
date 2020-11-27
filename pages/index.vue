<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        gitoauth
      </h1>
      <button>
        <a href="https://github.com/login/oauth/authorize?client_id=485307765a002578a888">Github ancor</a>
      </button>
      <p> {{ datas }} </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      datas: ''
    }
  },
  methods: {
    githubcnx () {
      alert('alert')
      axios.get('http://localhost:2222/gotcode/')
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
