<template>
  <div ref="datatable" class="base-datatable d-flex flex-column">
    <div class="d-flex justify-content-between mb-4">
      <ve-pagination
        :total="totalRecord"
        :page-index="currentPage"
        :page-size="limit"
        :layout="['sizer']"
        @on-page-number-change="pageNumberChange"
        @on-page-size-change="pageSizeChange"
      />

      <b-input-group style="width: 300px">
        <template #prepend>
          <b-input-group-text>
            <i class="flaticon-search"></i>
          </b-input-group-text>
        </template>
        <b-form-input
          v-model="keyword"
          placeholder="Tìm kiếm..."
          debounce="500"
        ></b-form-input>
      </b-input-group>
    </div>

    <ve-table
      :style="{ 'word-break': 'break-all' }"
      :columns="tableColumns"
      :sort-option="sortOption"
      :table-data="tableData"
      :row-style-option="rowStyleOption"
      :max-height="650"
      border-y
    />

    <div
      v-if="totalRecord > 0"
      class="mt-4 d-flex justify-content-between tb-pagination"
    >
      <p>
        {{ 1 + limit * (currentPage - 1) }} -
        {{ limit * (currentPage - 1) + tableData.length }} của
        {{ totalRecord }} bản ghi
      </p>
      <ve-pagination
        :total="totalRecord"
        :page-index="currentPage"
        :page-size="limit"
        :layout="['prev', 'pager', 'next', 'jumper']"
        @on-page-number-change="pageNumberChange"
        @on-page-size-change="pageSizeChange"
      />
    </div>

    <div v-show="tableData.length === 0 && firstLoading" class="empty-data">
      Không có dữ liệu!
    </div>
  </div>
</template>

<script>
import 'vue-easytable/libs/theme-default/index.css'
import { VeTable, VePagination, VeLocale, VeLoading } from 'vue-easytable'
import vi from './table-locale-vi_VN'

VeLocale.use(vi)

export default {
  name: 'BaseTable',
  components: {
    VeTable,
    VePagination,
  },
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    remoteUrl: {
      type: String,
      required: true,
    },
    hideActionColumn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      keyword: '',
      loadingInstance: null,
      loading: true,
      firstLoading: false,
      rowStyleOption: {
        stripe: true,
        hoverHighlight: true,
      },
      tableData: [],
      totalRecord: 0,
      currentPage: 1,
      limit: 10,
      sortObj: null,
      sortOption: {
        sortAlways: true,
        sortChange: (params) => {
          this.sortChange(params)
        },
      },
    }
  },
  computed: {
    tableColumns() {
      const actionCol = {
        field: '',
        key: 'defaultAction',
        title: 'Hành động',
        width: 200,
        align: 'center',
        fixed: 'right',
        renderBodyCell: ({ row, column, rowIndex }, h) => {
          return (
            <span>
              <button
                class="btn btn-sm btn-primary"
                on-click={() => {
                  this.editRow(row)
                }}
              >
                Cập nhật
              </button>
              &nbsp;
              <button
                class="btn btn-sm btn-danger"
                on-click={() => this.deleteRow(row)}
              >
                Xóa
              </button>
            </span>
          )
        },
      }

      let cols = [
        {
          field: '',
          key: 'stt',
          title: 'STT',
          width: 50,
          align: 'center',
          fixed: 'left',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return ++rowIndex + this.limit * (this.currentPage - 1)
          },
        },
        ...this.columns,
      ]

      if (!this.hideActionColumn) {
        cols = [...cols, actionCol]
      }

      return cols
    },
    queryUrl() {
      let url = this.remoteUrl

      const params = new URLSearchParams({
        limit: this.limit,
        offset: (this.currentPage - 1) * this.limit,
      })

      if (this.sortObj) {
        params.append('sortBy', this.sortObj.sortBy)
        params.append('sortType', this.sortObj.sortType)
      }

      if (this.keyword.trim()) {
        params.append('keyword', this.keyword)
      }

      const paramsStr = params.toString()

      url += '?' + paramsStr

      return url
    },
  },
  watch: {
    keyword() {
      this.currentPage = 1
    },
    loading(val) {
      if (val) {
        this.loadingInstance.show()
      } else {
        this.loadingInstance.close()
      }
    },
    queryUrl() {
      this.loadData()
    },
  },
  created() {
    this.sortObj = this.getFirstSortObj()
  },
  mounted() {
    this.loadingInstance = VeLoading({
      target: this.$refs.datatable,
      name: 'wave',
    })

    this.loadData()
  },
  methods: {
    async loadData() {
      this.loadingInstance.show()

      try {
        const { data } = await this.$axios.get(this.queryUrl)

        this.tableData = data.results
        this.totalRecord = data.total
      } catch (e) {
        this.tableData = []
        this.totalRecord = 0
      } finally {
        this.loadingInstance.close()
        this.firstLoading = true
      }
    },
    editRow(row) {
      this.$emit('editRow', row)
    },
    deleteRow(row) {
      this.$emit('deleteRow', row)
    },
    pageNumberChange(pageIndex) {
      this.currentPage = pageIndex
    },
    pageSizeChange(pageSize) {
      this.currentPage = 1
      this.limit = pageSize
    },
    sortChange(params) {
      const prop = Object.keys(params)[0]

      this.sortObj = {
        sortBy: prop,
        sortType: params[prop],
      }
    },
    getFirstSortObj() {
      const sortCol = this.columns.find((item) => item.sortBy)

      if (sortCol) {
        return {
          sortBy: sortCol.field,
          sortType: sortCol.sortBy,
        }
      }

      return null
    },
  },
}
</script>

<style lang="scss">
.base-datatable {
  .empty-data {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    width: 100%;
    color: #666;
    font-size: 16px;
    border: 1px solid #eee;
    border-top: 0;
  }

  .ve-pagination {
    .ve-pagination-goto {
      margin-right: -10px;
    }

    .ve-pagination-select {
      margin-left: -4px;
    }

    .ve-dropdown-dt-selected {
      width: 160px !important;
    }
  }

  .ve-table
    .ve-table-container
    table.ve-table-content
    thead.ve-table-header
    tr.ve-table-header-tr
    th.ve-table-header-th {
    font-weight: 700;
  }
}

.ve-dropdown-items {
  min-width: 160px !important;
}

.ve-select {
  .ve-select-selected-span {
    font-weight: 500;
  }
}
</style>
