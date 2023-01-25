<template>
  <base-form-select
    v-model="selection"
    :required="required"
    :error="error"
    :multiple="multiple"
    v-bind="$attrs"
    placeholder="Chọn một bài học..."
    label="Bài học"
    data-vv-as="Bài học"
    id-field="_id"
    text-field="name"
    ajax="/lessons"
    name="selection"
  />
</template>

<script>
import BaseFormSelectMixin from '@/components/base/form/SelectMixin'
export default {
  name: 'LessonSelect',
  mixins: [BaseFormSelectMixin],
}
</script>
