<template>
  <base-form-select
    v-model="selection"
    :required="required"
    :error="error"
    v-bind="$attrs"
    :multiple="multiple"
    :label="label"
    :data-vv-as="label"
    :options="options"
    placeholder="Chọn một hoạt động..."
    id-field="id"
    text-field="text"
    name="selection"
  />
</template>

<script>
import permissions from '~/constants/permission-action.constant'
import BaseFormSelectMixin from '~/components/base/form/SelectMixin'

export default {
  name: 'PermissionActionSelect',
  mixins: [BaseFormSelectMixin],
  data() {
    return {
      options: permissions,
    }
  },
}
</script>
