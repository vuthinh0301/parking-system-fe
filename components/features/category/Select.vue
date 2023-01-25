<template>
  <base-form-select
    v-model="selection"
    :required="required"
    :error="error"
    :multiple="multiple"
    v-bind="$attrs"
    placeholder="Chọn danh mục cha..."
    label="Danh mục cha"
    data-vv-as="Danh mục cha"
    id-field="_id"
    text-field="name"
    ajax="/categories"
    name="selection"
  />
</template>

<script>
import BaseFormSelectMixin from '@/components/base/form/SelectMixin'
export default {
  name: 'CategorySelect',
  mixins: [BaseFormSelectMixin],
}
</script>
