// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },
  css: ["@/assets/style/main.scss"],
  modules: ["@nuxt/image-edge", "@vueuse/nuxt"],
  imports: {
    dirs: ["./composables", "./utils", "./types"],
  },
  components: [
    {
      path: "~/components",
      extensions: [".vue"],
    },
  ],
});
