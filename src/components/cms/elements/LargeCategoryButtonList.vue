<template>
    <div class="large-category-list">
        <select
            class="c-select__control"
            v-model="selectedValue"
            @change="onChangeLargeCat($event)"
            :disabled="!items"
        >
            <option selected value="" class="default">
            大カテゴリ
            </option>
            <option
            v-for="(large, i) in items"
            :key="`large-${i}`"
            :value="large.catClassCd"
            >
            {{ large.name }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
  name: 'LargeCategoryButtonList',
  props: {
    items: Array,
    value: [String, Number]
  },
  data() {
    return {
      selectedValue: this.value
    }
  },
  methods: {
    onChangeLargeCat(event) {
        this.selectedValue = event.target.value;
        this.$emit('changed', event);
    }
  }
};
</script>

<style scoped lang="scss">

</style>
