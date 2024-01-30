import { useAuthStore } from "src/stores/user";
import { ref } from "vue";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/MembersTransacional.vue") },
    ],
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      const userLoggedIn = ref(authStore.isAuthenticated);
      if (!userLoggedIn.value) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  {
    path: "/login",
    children: [{ path: "", component: () => import("pages/LoginPage.vue") }],
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      authStore.removeToken();
      next();
    },
  },
];

export default routes;
