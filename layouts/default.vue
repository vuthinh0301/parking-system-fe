<template>
  <div v-if="$auth.loggedIn" class="d-flex flex-column flex-root">
    <!-- begin:: Header Mobile -->
    <HeaderMobile></HeaderMobile>
    <!-- end:: Header Mobile -->

    <!-- begin::Body -->
    <div class="d-flex flex-row flex-column-fluid page">
      <!-- begin:: Aside Left -->
      <LeftAside v-if="asideEnabled"></LeftAside>
      <!-- end:: Aside Left -->

      <div id="kt_wrapper" class="d-flex flex-column flex-row-fluid wrapper">
        <!-- begin:: Header -->
        <MainHeader></MainHeader>
        <!-- end:: Header -->

        <!-- begin:: Content -->
        <div
          id="kt_content"
          class="content d-flex flex-column flex-column-fluid"
        >
          <!-- begin:: Content Body -->
          <div class="d-flex flex-column-fluid">
            <div
              :class="{
                'container-fluid': contentFluid,
                container: !contentFluid,
              }"
            >
              <transition name="fade-in-up">
                <nuxt />
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ScrollTop></ScrollTop>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HtmlClass from '~/services/htmlclass.service'

export default {
  name: 'DefaultLayout',
  computed: {
    ...mapGetters({
      breadcrumbs: 'breadcrumbs/breadcrumbs',
      pageTitle: 'breadcrumbs/pageTitle',
      layoutConfig: 'config/layoutConfig',
    }),

    /**
     * Check if the page loader is enabled
     * @returns {boolean}
     */
    loaderEnabled() {
      return !/false/.test(this.layoutConfig('loader.type'))
    },

    /**
     * Check if container width is fluid
     * @returns {boolean}
     */
    contentFluid() {
      return this.layoutConfig('content.width') === 'fluid'
    },

    /**
     * Page loader logo image using require() function
     * @returns {string}
     */
    loaderLogo() {
      return process.env.BASE_URL + this.layoutConfig('loader.logo')
    },

    /**
     * Check if the left aside menu is enabled
     * @returns {boolean}
     */
    asideEnabled() {
      return !!this.layoutConfig('aside.self.display')
    },

    /**
     * Set the right toolbar display
     * @returns {boolean}
     */
    toolbarDisplay() {
      // return !!this.layoutConfig("toolbar.display");
      return true
    },

    /**
     * Set the subheader display
     * @returns {boolean}
     */
    subheaderDisplay() {
      return !!this.layoutConfig('subheader.display')
    },
  },
  beforeMount() {
    const htmlClass = new HtmlClass(this.$store)
    htmlClass.init(this.layoutConfig())
  },
}
</script>
