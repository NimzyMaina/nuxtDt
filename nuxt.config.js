const webpack = require("webpack");

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [ //https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "stylesheet",
        href:
          "https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css"
      }
    ],
    script: [
      { src: "https://code.jquery.com/jquery-3.4.1.min.js" },
      // { src: "https://cdn.datatables.net/1.10.20/js/jquery.dataTables.js", body: true },
      // { src: "https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.js", body: true },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    "~/node_modules/bootstrap/dist/css/bootstrap.css",
    // "~/node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css",
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: "~plugins/bstrap.js" },
    { src: "~plugins/vscript.js", mode: 'client'  },
    { src: '~/plugins/after-each', mode: 'client' },
    { src: '~/plugins/employees', mode: 'client' },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    plugins: [
      // new webpack.ProvidePlugin({
      //   $: "jquery",
      //   jQuery: "jquery",
      //   "window.jQuery": "jquery"
      // })
    ],
  }
}
