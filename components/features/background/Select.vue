<template>
  <base-form-select
    v-model="selection"
    :required="required"
    :error="error"
    :multiple="multiple"
    v-bind="$attrs"
    placeholder="Chọn bối cảnh..."
    label="Bối cảnh"
    data-vv-as="Bối cảnh"
    id-field="_id"
    text-field="name"
    ajax="/backgrounds"
    name="selection"
  />
</template>

<script>
import BaseFormSelectMixin from '@/components/base/form/SelectMixin'
export default {
  name: 'BackgroundSelect',
  mixins: [BaseFormSelectMixin],
}
</script>
