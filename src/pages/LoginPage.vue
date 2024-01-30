<template>
  <div class="login-page">
    <div class="login-container">
      <br />
      <img src="/relatorio-transacional-membros/icons/icon.png" />

      <LoginForm />
    </div>
  </div>
</template>

<script>
import LoginForm from "src/components/LoginForm.vue";

export default {
  name: "LoginPage",
  components: { LoginForm },
};
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #d9d8d8;
}

.login-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
