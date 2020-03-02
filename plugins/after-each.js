export default ({ app }) => {

  app.router.afterEach((to, from) => {
    $(document).trigger('router-loaded');
    console.log('load here');
  })

}
