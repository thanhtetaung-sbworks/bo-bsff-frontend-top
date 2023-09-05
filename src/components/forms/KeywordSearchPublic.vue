<template>
  <div class="c-input c-input--group search-text-group">
    <input
        type="text"
        name="input_text"
        :value="value"
        :placeholder="placeholder"
        :class="{
          'c-input__background': background,
          'c-input__background--error': error
        }"
        class="c-input__text content_input text-pc-base text-sp-base"
        @input="input"
        @keypress.enter="onSearch"
        autocomplete="on"
      />
    <button type="submit" class="c-input__button content_button" @click="onSearch">
      <icon name="search_solid" width="22" height="22" />
      <span class="c-input__searchlabel text-pc-base">検索</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'キーワード検索'
    },
    background: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    input(e) {
      this.$emit('input', e.target.value)
    },
    onSearch() {
      this.$emit('onSearch')
    }
  }
}
</script>

<style lang="scss" scoped>
input {
  color: #1F2021 !important;
  &::placeholder {
    color: #b5b5b5 !important;
  }
}

.content {
  &_button {
    svg {
      width: 22px;
      height: 22px;
    }
  }
}

.text-pc-base {
  font-size: 15px !important;
}

@media only screen and (max-width: 639px) {
  .content {
    &_input {
      padding: 9px 10px !important;
      height: auto !important;
      min-height: auto !important;
    }
  }

  .text-sp-base {
    font-size: 13px !important;
  }
}
</style>
