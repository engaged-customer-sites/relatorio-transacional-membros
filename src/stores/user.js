import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
  }),

  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
  },

  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },

    removeToken() {
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});
