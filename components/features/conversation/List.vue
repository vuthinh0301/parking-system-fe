<template>
  <div class="conversation-list mt-5">
    <b-form-group label="Nội dung chi tiết hội thoại" class="mb-2">
      <draggable
        :list="innerValue"
        handle=".btn-collapse-draggable"
        animation="250"
      >
        <transition-group type="transition" name="conversation-list">
          <b-card
            v-for="(conversation, index) in innerValue"
            :key="conversation.key"
            no-body
            class="mb-1"
          >
            <b-card-header header-tag="header" class="p-1" role="tab">
              <div class="d-flex">
                <b-button
                  v-b-toggle="`conversation-${conversation.key}`"
                  block
                  size="sm"
                  class="btn-collapse-draggable text-left"
                >
                  [{{
                    conversation.type === 'narration'
                      ? 'Cảnh dẫn chuyện'
                      : 'Cảnh hội thoại'
                  }}] {{ conversation.name }}
                </b-button>

                <b-button
                  size="sm"
                  variant="danger"
                  class="ml-2"
                  @click="removeConversation(conversation)"
                  >Xóa</b-button
                >
              </div>
            </b-card-header>
            <b-collapse
              :id="`conversation-${conversation.key}`"
              visible
              accordion="conversation-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <conversation-narration-item
                  v-if="conversation.type === 'narration' || !conversation.type"
                  v-model="innerValue[index]"
                />

                <conversation-item v-else v-model="innerValue[index]" />
              </b-card-body>
            </b-collapse>
          </b-card>
        </transition-group>
      </draggable>
    </b-form-group>

    <b-dropdown block variant="primary" menu-class="w-100">
      <template #button-content>
        <i class="flaticon2-plus"></i> Thêm phân cảnh
      </template>

      <b-dropdown-item
        v-for="option in options"
        :key="option.type"
        href="javascript:;"
        @click="addConversation(option.type)"
        >{{ option.label }}</b-dropdown-item
      >
    </b-dropdown>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { v4 as uuid } from 'uuid'

const options = [
  {
    type: 'narration',
    label: 'Cảnh dẫn chuyện',
  },
  {
    type: 'conversation',
    label: 'Cảnh hội thoại',
  },
]

export default {
  name: 'ConversationList',
  components: { draggable },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      innerValue: [],
      options,
    }
  },
  watch: {
    innerValue: {
      deep: true,
      handler(val) {
        this.$emit('input', val)
      },
    },
    value(val) {
      if (val) {
        this.innerValue = val
      } else {
        this.innerValue = this.generateDefault()
      }
    },
  },
  created() {
    if (this.value) {
      this.innerValue = this.value
    } else {
      this.innerValue = this.generateDefault()
    }
  },
  methods: {
    addConversation(type) {
      const item = this.generateDefault(type)
      this.innerValue.push(item)
    },
    removeConversation(conversation) {
      const index = this.innerValue.findIndex(
        (item) => item.key === conversation.key
      )

      if (index !== -1) {
        this.innerValue.splice(index, 1)
      }
    },
    generateDefault(type) {
      return {
        key: uuid(),
        type,
        name: type === 'narration' ? 'Cảnh dẫn chuyện' : 'Cảnh hội thoại',
        asset_url: '',
        figure: null,
        background: null,
        content: [],
      }
    },
  },
}
</script>
