<template>
  <div class="form-group m-form__group mt-4">
    <b-input-group>
      <template #prepend>
        <b-input-group-text>
          <i class="flaticon-search"></i>
        </b-input-group-text>
      </template>
      <b-form-input
        v-model="search"
        placeholder="Tìm kiếm..."
        debounce="500"
      ></b-form-input>
    </b-input-group>

    <perfect-scrollbar class="mt-4" style="height: 200px; margin-top: 20px">
      <b-form-group label="" label-size="lg">
        <b-form-checkbox-group v-model="permissionChecked" size="lg">
          <div class="row container-fluid">
            <div
              v-for="item in filteredList"
              :key="item._id"
              class="col-md-6 mb-1"
            >
              <b-form-checkbox :value="item._id">
                {{ item.name }}
              </b-form-checkbox>
            </div>
          </div>
        </b-form-checkbox-group>
      </b-form-group>
    </perfect-scrollbar>
  </div>
</template>

<script>
export default {
  name: 'PermissionSelection',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      permissionList: [],
      permissionChecked: [],
      search: '',
    }
  },
  computed: {
    filteredList() {
      return this.permissionList.filter((item) => {
        return item.name.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  watch: {
    permissionChecked(newVal) {
      this.$emit('input', newVal)
    },
    value(newVal) {
      this.permissionChecked = newVal
    },
  },
  created() {
    this.permissionChecked = this.value
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        const res = await this.$axios.get('/permissions/all')
        const { data } = res
        this.permissionList = data.results
      } catch (e) {}
    },
  },
}
</script>
