<template>
  <!-- begin:: Header -->
  <div id="kt_header" ref="kt_header" class="header" :class="headerClasses">
    <div
      class="container-fluid d-flex align-items-center justify-content-between"
    >
      <!-- begin:: Header Menu -->
      <div
        ref="kt_header_menu_wrapper"
        class="header-menu-wrapper header-menu-wrapper-left"
      >
        <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">
          {{ pageTitle }}
        </h5>
      </div>
      <!-- end:: Header Menu -->
      <HeaderTopbar></HeaderTopbar>
    </div>
  </div>
  <!-- end:: Header -->
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import KTLayoutHeader from '@/assets/js/layout/base/header.js'
import KTLayoutHeaderMenu from '@/assets/js/layout/base/header-menu.js'

export default {
  name: 'MainHeader',
  computed: {
    ...mapGetters({
      layoutConfig: 'config/layoutConfig',
      getClasses: 'htmlclass/getClasses',
    }),
    ...mapState({
      pageTitle: (state) => state.breadcrumbs.pageTitle,
    }),

    /**
     * Check if the header menu is enabled
     * @returns {boolean}
     */
    headerMenuEnabled() {
      return !!this.layoutConfig('header.menu.self.display')
    },

    /**
     * Get extra classes for header based on the options
     * @returns {null|*}
     */
    headerClasses() {
      const classes = this.getClasses('header')
      if (typeof classes !== 'undefined') {
        return classes.join(' ')
      }
      return null
    },

    /**
     * Get extra classes for header menu based on the options
     * @returns {null|*}
     */
    headerMenuClasses() {
      const classes = this.getClasses('header_menu')
      if (typeof classes !== 'undefined') {
        return classes.join(' ')
      }
      return null
    },
  },
  mounted() {
    // Init Desktop & Mobile Headers
    KTLayoutHeader.init('kt_header', 'kt_header_mobile')

    // Init Header Menu
    KTLayoutHeaderMenu.init(
      this.$refs.kt_header_menu,
      this.$refs.kt_header_menu_wrapper
    )

    const headerRef = this.$refs.kt_header

    headerRef.querySelectorAll("a[class='menu-link']").forEach((item) => {
      item.addEventListener('click', () => {
        KTLayoutHeaderMenu.getOffcanvas().hide()
      })
    })
  },
}
</script>
