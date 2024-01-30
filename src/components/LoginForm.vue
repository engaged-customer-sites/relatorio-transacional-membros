<template>
  <div
    class="q-pa-md"
    style="min-width: 300px; max-width: 400px; margin-top: 10%"
  >
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="username"
        label="E-Mail"
        autocomplete="username"
        lazy-rules
        :rules="[
          (val) => (val && val.length > 0) || 'Este campo é obrigatório',
        ]"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Senha"
        autocomplete="current-password"
        :rules="[
          (val) => (val && val.length > 0) || 'Este campo é obrigatório',
        ]"
      />

      <br />

      <div v-if="buttonVisible">
        <q-btn label="Entrar" type="submit" color="primary" />
        <!-- <a href="https://campli.com.br/" target="_blank">
          <q-btn label="Registrar" color="primary" flat class="q-ml-sm" />
        </a>-->
      </div>
      <div v-if="!buttonVisible">
        <q-spinner color="primary" size="3em" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "stores/user";
import { useRouter } from "vue-router";
import routers from "../../config/routers.json";

export default {
  setup() {
    const $q = useQuasar();
    const username = ref(null);
    const password = ref(null);
    const authStore = useAuthStore();
    const router = useRouter();
    const buttonVisible = ref(true);

    const onSubmit = async (event) => {
      event.preventDefault();
      buttonVisible.value = false;

      const graphqlQuery = {
        query: `
        mutation {
          adminUserSignIn(email: "${username.value}", password: "${password.value}") {
            sessionToken
          }
        }
      `,
      };
      try {
        const response = await axios.post(
          "https://api.online.engaged.com.br/graphql",
          graphqlQuery
        );

        const token = response.data.data.adminUserSignIn.sessionToken;
        authStore.setToken(token);
        router.push({ path: "/" });
      } catch (error) {
        showErrorNotification("Login Failed", "Invalid username or password");
        buttonVisible.value = true;
      }
    };

    const onReset = () => {
      username.value = null;
      password.value = null;
    };

    const showErrorNotification = (message, caption) => {
      $q.notify({
        message: message,
        caption: caption,
        icon: "error",
        color: "red",
      });
    };

    return {
      username,
      password,
      onSubmit,
      buttonVisible,
      onReset,
      routers,
    };
  },
};
</script>
