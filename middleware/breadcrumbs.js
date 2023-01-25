export default ({ route, store, redirect }) => {
  // add page title
  let pageTitle = ''

  if (route.matched && route.matched.length > 0) {
    pageTitle = route.matched.reduce((pre, current) => {
      return pre || current.components.default.options.pageTitle
    }, '')
  }

  store.commit('breadcrumbs/SET_PAGE_TITLE', pageTitle)
}
