<template>
  <content-card title="Danh sách bài học">
    <template #body>
      <base-table
        ref="table"
        :columns="columns"
        hide-action-column
        remote-url="admin/lessons"
      />

      <lesson-modal ref="modal" :on-action-success="reloadData" />
    </template>
  </content-card>
</template>

<script>
import { MANAGE } from '~/constants/permission-action.constant'
import { LESSON } from '~/constants/permission-object.constant'
import { ACTIVE, PENDING } from '~/constants/lesson-status.constant'

export default {
  name: 'LessonPage',
  pageTitle: 'Quản lý bài học',
  permission: [MANAGE, LESSON],
  data() {
    return {
      columns: [
        {
          field: 'name',
          key: 'a',
          title: 'Tên bài học',
          align: 'left',
          sortBy: 'asc',
          width: 150,
          renderBodyCell: ({ row, column }, h) => {
            return (
              <a href={`${process.env.webUrl}/lessons/${row.slug}`}>
                {row.name}
              </a>
            )
          },
        },
        {
          field: 'author',
          key: 'b',
          title: 'Tác giả',
          align: 'left',
          sortBy: 'asc',
          width: 150,
          renderBodyCell: ({ row, column }, h) => {
            return <span>{row.author.fullName}</span>
          },
        },
        {
          field: 'status',
          key: 'd',
          title: 'Trạng thái',
          align: 'left',
          width: 100,
          renderBodyCell: ({ row, column }, h) => {
            if (row.status === ACTIVE) {
              return <span class="text-success">Đang hoạt động</span>
            } else if (row.status === PENDING) {
              return <span class="text-secondary">Chờ duyệt</span>
            } else {
              return <span class="text-danger">Khóa</span>
            }
          },
        },
        {
          field: 'blockReason',
          key: 'c',
          title: 'Lý do bị khóa',
          align: 'left',
          width: 250,
        },
        {
          field: '',
          key: 'action',
          title: 'Hành động',
          width: 100,
          align: 'center',
          fixed: 'right',
          renderBodyCell: ({ row, column, rowIndex }, h) => {
            return (
              <span>
                <button
                  class="btn btn-sm btn-primary"
                  on-click={() => this.editLesson(row)}
                >
                  Phê duyệt
                </button>
              </span>
            )
          },
        },
      ],
    }
  },
  methods: {
    reloadData() {
      this.$refs.table.loadData()
    },
    editLesson(lesson) {
      this.$refs.modal.show(lesson)
    },
  },
}
</script>
