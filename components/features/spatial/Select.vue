<template>
  <base-form-select
    v-model="selection"
    :required="required"
    :error="error"
    :multiple="multiple"
    v-bind="$attrs"
    placeholder="Chọn nhân vật..."
    label="Nhân vật"
    data-vv-as="Nhân vật"
    id-field="_id"
    text-field="name"
    ajax="/spatial"
    name="selection"
  />
</template>

<script>
import BaseFormSelectMixin from '@/components/base/form/SelectMixin'

export default {
  name: 'CharacterSelect',
  mixins: [BaseFormSelectMixin],
}
</script>
