<template>
  <div class="login-page">
    <div class="form">
      <div class="login-form">
        <input type="text" ref="username" placeholder="username"/>
        <input type="password" ref="password" placeholder="password"/>
        <button @click="validateLogin()">login</button>
      </div>
      <div v-if="tryLogin" :class="['message', loginSuccess ? 'messageSuccess' : 'messageDanger']">{{message}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      tryLogin: false,
      loginSuccess: false
    }
  },
  methods: {
		validateLogin() {
      let self = this;
      const userData = {
        username: self.$refs.username.value,
        password: self.$refs.password.value,
      };
      if (!userData.username || !userData.password) {
        self.tryLogin = true;
        self.message = 'Informe username e password para logar!'
        return;
      }
      self.$store.dispatch('user/login', userData).then((res) => {
        self.loginSuccess = true;
        self.tryLogin = true;
        self.message = 'Login realizado com sucesso';
        setTimeout(function() {
          self.tryLogin = false;
          self.message = '';
          self.$router.push('/');
        },3000)
      }).catch((e) => {
        self.loginSuccess = false;
        self.tryLogin = true;
        self.message = 'Login ou password inválidos'
        setTimeout(function() {
          self.tryLogin = false;
          self.message = '';
        },3000)
      });
		}
  }
}
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.login-page {
  position: absolute;
  display: inline-flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  margin: 0 auto 100px;
  padding: 4vw;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  max-width: 770px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 2vh;
  padding: 2vh;
  box-sizing: border-box;
  font-size: 2rem;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #333;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 2rem;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #333;
}
.message {
  font-family: "Roboto", sans-serif;
  margin: 2vh 0 0 0;
  width: 96%;
  font-size: 2rem;
  border-radius: 5px;
  padding: 2vh;
}
.messageDanger {
  background-color: #f8d7da;
  color: #721c24;
}
.messageSuccess {
  background-color: #d4edda;
  color: #155724;
}
</style>