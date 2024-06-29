// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "Build Real-World Backend Projects | Masteringbackend",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "Build Real-World Backend Projects. Access a catalog of 200+ advanced backend projects, backend project ideas, backend projects for portfolio, backend development projects and backend developer projects to help you practice and belong great backend engineer.",
        },

        {
          hid: "keywords",
          name: "keywords",
          content: `laravel project tutorial, laravel example project, backend project ideas, nodejs tutorial and projects course, laravel project, backend projects, backend projects for portfolio, nestjs project, back end development projects, django example project, create laravel project, django project, laravel projects, laravel project example, back end developer projects, backend developer projects, advanced node js projects, backend development projects, advanced backend projects, example laravel project, laravel full project, laravel simple project, laravel projects for beginners, learn django by building projects, nest js project, laravel full project tutorial, laravel create project, backend project, laravel complete project tutorial, best backend projects, laravel project demo, laravel basic project, create django project, laravel demo project, laravel build project, django project tutorial, django machine learning projects, laravel sample project, laravel 6 project tutorial, laravel project sample, create a laravel project, laravel tutorial with project	, start django project, nestjs projects, create project laravel, spring boot backend project	, spring boot project from scratch, laravel new project, nest js project structure, django projects tutorials, nestjs project structure, docker python project`,
        },

        {
          hid: "og:title",
          property: "og:title",
          content: `Build Real-World Backend Projects | Masteringbackend`,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: `Build Real-World Backend Projects. Access a catalog of 200+ advanced backend projects, backend project ideas, backend projects for portfolio, backend development projects and backend developer projects to help you practice and belong great backend engineer.`,
        },

        {
          hid: "og:url",
          property: "og:url",
          content: `https://projects.masteringbackend.com`,
        },

        {
          hid: "og:image",
          property: "og:image",
          content: `/hero.png`,
        },
        {
          hid: "og:image:width",
          property: "og:image:width",
          content: "100",
        },
        {
          hid: "og:image:height",
          property: "og:image:height",
          content: "100",
        },
        {
          hid: "og:type",
          property: "og:type",
          content: "website",
        },

        {
          hid: "twitter:creator",
          property: "twitter:creator",
          content: "@master_backend",
        },

        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  ssr: true,

  css: ["~/assets/css/main.css"],

  modules: ["nuxt-monaco-editor"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      {
        path: "~/components",
        pathPrefix: false,
      },
    ],
  },

  runtimeConfig: {
    public: {
      STRAPI_TOKEN: process.env.STRAPI_TOKEN,
      BASE_ENDPOINT_URL: process.env.BASE_ENDPOINT_URL,
    },
  },

  monacoEditor: {
    // These are default values:
    locale: "en",
    componentName: {
      codeEditor: "MonacoEditor",
      diffEditor: "MonacoDiffEditor",
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
