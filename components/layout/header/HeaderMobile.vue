<template>
  <div
    id="kt_header_mobile"
    class="header-mobile align-items-center"
    :class="headerClasses"
  >
    <!--begin::Logo-->
    <a href="/">
      <img alt="Logo" :src="headerLogo" />
    </a>
    <!--end::Logo-->
    <!--begin::Toolbar-->
    <div class="d-flex align-items-center">
      <!--begin::Aside Mobile Toggle-->
      <button
        v-if="asideEnabled"
        id="kt_aside_mobile_toggle"
        class="btn p-0 burger-icon burger-icon-left"
      >
        <span></span>
      </button>
      <!--end::Aside Mobile Toggle-->
      <!--begin::Header Menu Mobile Toggle-->
      <button
        id="kt_header_mobile_toggle"
        ref="kt_header_mobile_toggle"
        class="btn p-0 burger-icon ml-4"
      >
        <span></span>
      </button>
      <!--end::Header Menu Mobile Toggle-->
      <!--begin::Topbar Mobile Toggle-->
      <button
        id="kt_header_mobile_topbar_toggle"
        ref="kt_header_mobile_topbar_toggle"
        class="btn btn-hover-text-primary p-0 ml-2"
      >
        <span class="svg-icon svg-icon-xl">
          <!--begin::Svg Icon | path:svg/icons/General/User.svg-->
          <inline-svg
            class="svg-icon"
            :src="require('@/assets/media/svg/icons/General/User.svg')"
          />
          <!--end::Svg Icon-->
        </span>
      </button>
      <!--end::Topbar Mobile Toggle-->
    </div>
    <!--end::Toolbar-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import KTLayoutHeaderTopBar from '@/assets/js/layout/base/header-topbar.js'

export default {
  name: 'HeaderMobile',
  components: {},
  computed: {
    ...mapGetters({
      layoutConfig: 'config/layoutConfig',
      getClasses: 'htmlclass/getClasses',
    }),

    /**
     * Get header logo
     * @returns {string}
     */
    headerLogo() {
      return this.layoutConfig('self.logo.dark')
    },

    /**
     * Get classes for mobile header
     * @returns {null|*}
     */
    headerClasses() {
      const classes = this.getClasses('header_mobile')
      if (typeof classes !== 'undefined') {
        return classes.join(' ')
      }
      return null
    },

    /**
     * Check if the left aside menu is enabled
     * @returns {boolean}
     */
    asideEnabled() {
      return !!this.layoutConfig('aside.self.display')
    },
  },
  mounted() {
    KTLayoutHeaderTopBar.init(this.$refs.kt_header_mobile_topbar_toggle)
  },
}
</script>
