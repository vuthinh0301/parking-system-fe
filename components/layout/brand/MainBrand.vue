<template>
  <!-- begin:: Aside -->
  <div id="kt_brand" ref="kt_brand" class="brand flex-column-auto">
    <div class="brand-logo">
      <nuxt-link to="/">
        <!--        <img :src="siteLogo()" alt="Logo" />-->
      </nuxt-link>
    </div>
    <div v-if="allowMinimize" class="brand-tools">
      <button
        id="kt_aside_toggle"
        ref="kt_aside_toggle"
        class="brand-toggle btn btn-sm px-0"
      >
        <span class="svg-icon svg-icon svg-icon-xl">
          <inline-svg
            class="svg-icon"
            :src="
              require('~/assets/media/svg/icons/Navigation/Angle-double-left.svg')
            "
          />
        </span>
      </button>
    </div>
  </div>
  <!-- end:: Aside -->
</template>

<script>
import { mapGetters } from 'vuex'
import objectPath from 'object-path'
import KTLayoutBrand from '@/assets/js/layout/base/brand.js'
import KTLayoutAsideToggle from '@/assets/js/layout/base/aside-toggle.js'

export default {
  name: 'MainBrand',
  computed: {
    ...mapGetters({
      layoutConfig: 'config/layoutConfig',
    }),

    allowMinimize() {
      return !!this.layoutConfig('aside.self.minimize.toggle')
    },
  },
  mounted() {
    // Init Brand Panel For Logo
    KTLayoutBrand.init(this.$refs.kt_brand)

    // Init Aside Menu Toggle
    KTLayoutAsideToggle.init(this.$refs.kt_aside_toggle)
  },
  methods: {
    siteLogo() {
      const menuAsideLeftSkin = this.layoutConfig('brand.self.theme')
      // set brand logo
      const logoObject = this.layoutConfig('self.logo')

      let logo
      if (typeof logoObject === 'string') {
        logo = logoObject
      }
      if (typeof logoObject === 'object') {
        logo = objectPath.get(logoObject, menuAsideLeftSkin + '')
      }
      if (typeof logo === 'undefined') {
        const logos = this.layoutConfig('self.logo')
        logo = logos[Object.keys(logos)[0]]
      }
      return logo
    },
  },
}
</script>

<style lang="scss" scoped>
.aside-toggle {
  outline: none;
}
</style>
