<template>
        <select
            :class="['c-select__control opacity-100', wrapperClass]"
            class="content_select text-pc-base text-sp-base"
            v-model="selectedValue"
            @change="change"
            :disabled="!options || disabled"
        >
            <option v-if="firstOption" selected value="" class="default" :disabled="disabledFirstOption">
            {{  firstOption }}
            </option>
            <option
            v-for="(option, i) in options"
            :key="`large-${i}`"
            :value="option.id"
            >
            {{ option.label }}
            </option>
        </select>
  </template>
  
  <script>
  export default {
  name: 'SelectBox',
  props: {
    options: Array,
    value: [String, Number],
    firstOption: [String, Number],
    disabledFirstOption: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    wrapperClass: {
        type: String,
        default: ''
    },
  },
  data() {
    return {
      selectedValue: this.value
    }
  },
  methods: {
    change(event) {
    //   this.$emit('input', event.target.value);
      this.$emit('changed', event);
    }
  },
  watch: {
    value(newValue) {
      this.selectedValue = newValue;
    }
  }
  };
  </script>
  
<style scoped lang="scss">
select {
  color: #1F2021 !important;
  &:disabled {
    color: #b5b5b5 !important;
  }
}

.text-pc-base {
  font-size: 15px !important;
}

@media only screen and (max-width: 639px) {
  .content {
    &_select {
      padding: 9px 10px !important;
      height: auto;
    }
  }

  .text-sp-base {
    font-size: 13px !important;
  }
}
</style>