<template>
  <base-form-select
    v-model="selection"
    :required="required"
    :error="error"
    :multiple="multiple"
    v-bind="$attrs"
    placeholder="Chọn một nhóm người dùng..."
    label="Nhóm người dùng"
    data-vv-as="Nhóm người dùng"
    id-field="_id"
    text-field="displayName"
    ajax="/roles"
    name="selection"
  />
</template>

<script>
import BaseFormSelectMixin from '@/components/base/form/SelectMixin'
export default {
  name: 'RoleSelect',
  mixins: [BaseFormSelectMixin],
}
</script>
