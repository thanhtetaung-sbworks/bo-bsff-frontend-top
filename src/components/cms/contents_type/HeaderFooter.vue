<template>
  <div class="HeaderFooter" v-model="readcms">
    <template v-if="view_area === 'header'">
      <div v-html="headerFooter.field_header" />
    </template>
    <template v-else-if="view_area === 'footer'">
      <div v-html="headerFooter.field_footer" />
    </template>
  </div>
</template>

<script>
export default {
  name: "HeaderFooter",
  props: {
    view_area: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      error: null,
      headerFooter: {},
    };
  },
  watch: {},
  computed: {
    async readcms() {
      const APIres = await this.$repositories("cms").getHeaderFooter({
        bsCode: await process.env.VUE_APP_CMS_BS_CODE,
        subscriptionId: await this.$store.getters['preview/getSubscriptionId'],
        courseId: await this.$store.getters['preview/getCourseId'],
        courseParentId: await this.$store.getters['preview/getCourseParentId'],
        previewDate: await this.$store.getters['preview/getPreviewDate'],
        previewMode: await this.$store.getters['preview/getPreviewMode']
      });
      return this.setResponse(APIres);
    },
  },
  methods: {
    setResponse(obj) {
      if (
          !obj ||
          !obj.data ||
          !obj.data.data ||
          !obj.data.data[0]
      ) {
        return;
      }
      this.headerFooter = {
        field_footer : obj.data.data[0].attributes.field_footer.value,
        field_header : obj.data.data[0].attributes.field_header.value
      }
    },
  },
  created() {
  },
  mounted() {
  },
  updated() {
  },
  destroyed() {
  },
}
</script>

<style scoped>

</style>