<template>
  <div class="conversation-list mt-5">
    <b-form-group label="Nội dung hội thoại" class="mb-2">
      <draggable
        :list="innerValue"
        handle=".btn-collapse-draggable"
        animation="250"
      >
        <transition-group type="transition" name="conversation-content-list">
          <b-card
            v-for="(conversation, index) in innerValue"
            :key="conversation.key"
            no-body
            class="mb-1"
          >
            <b-card-header header-tag="header" class="p-1" role="tab">
              <div class="d-flex">
                <b-button
                  v-b-toggle="`conversation-content-${conversation.key}`"
                  block
                  size="sm"
                  class="btn-collapse-draggable text-left"
                >
                  {{ conversation.type === 'figure' ? 'Nhân vật' : 'Tôi' }}
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
              :id="`conversation-content-${conversation.key}`"
              visible
              accordion="conversation-content-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <conversation-content-figure
                  v-if="conversation.type === 'figure' || !conversation.type"
                  v-model="innerValue[index]"
                />

                <conversation-content-me v-else v-model="innerValue[index]" />
              </b-card-body>
            </b-collapse>
          </b-card>
        </transition-group>
      </draggable>
    </b-form-group>

    <b-dropdown block variant="info" menu-class="w-100">
      <template #button-content>
        <i class="flaticon2-plus"></i> Thêm câu hội thoại
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
    type: 'figure',
    label: 'Nhân vật',
  },
  {
    type: 'me',
    label: 'Người học',
  },
]

export default {
  name: 'ConversationContent',
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
        figure: null,
        sentence_en: '',
        sentence_vi: '',
        audio_url: '',
        sentence_practice: [
          {
            sentence_vi: '',
            sentence_en: '',
            audio_url: '',
          },
          {
            sentence_vi: '',
            sentence_en: '',
            audio_url: '',
          },
          {
            sentence_vi: '',
            sentence_en: '',
            audio_url: '',
          },
        ],
      }
    },
  },
}
</script>
