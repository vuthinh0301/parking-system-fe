<template>
  <!-- begin:: Header Topbar -->
  <div class="topbar">
    <!--begin: Notifications -->
    <b-dropdown
      size="sm"
      variant="link"
      toggle-class="topbar-item text-decoration-none"
      no-caret
      right
      no-flip
    >
      <template #button-content>
        <div
          class="btn btn-icon btn-clean btn-dropdown btn-lg mr-1 pulse pulse-primary"
        >
          <span class="svg-icon svg-icon-xl svg-icon-primary">
            <inline-svg
              :src="require('~/assets/media/svg/icons/Code/Compiling.svg')"
            />
          </span>
          <span class="pulse-ring"></span>
        </div>
      </template>
      <b-dropdown-text tag="div" class="min-w-md-350px">
        <form>
          <DropdownNotification></DropdownNotification>
        </form>
      </b-dropdown-text>
    </b-dropdown>
    <!--end: Notifications -->

    <!--begin: User Bar -->
    <QuickUser></QuickUser>
    <!--end: User Bar -->
  </div>
  <!-- end:: Header Topbar -->
</template>

<script>
export default {
  name: 'HeaderTopbar',
  data() {
    return {
      languageFlag: '',
      // languages: i18nService.languages,
    }
  },
}
</script>

<style lang="scss">
.topbar {
  .dropdown-toggle {
    padding: 0;
    &:hover {
      text-decoration: none;
    }

    &.dropdown-toggle-no-caret {
      &:after {
        content: none;
      }
    }
  }

  .dropdown-menu {
    margin: 0;
    padding: 0;
    outline: none;
    .b-dropdown-text {
      padding: 0;
    }
  }
}
</style>
