<template>
  <div class="BlockContents" v-model="readcms">
    <template v-if="error">
      <p>{{ error }}</p>
    </template>

    <template v-if="element_type === 'paragraph--image'">
      <ParagraphImage
        :cms_response="this.CMS_response"
        :view_type="view_type"
      />
    </template>

    <template v-else-if="element_type === 'paragraph--full_html'">
      <ParagraphFullhtml :cms_response="this.CMS_response"/>
    </template>

    <template v-else-if="element_type === 'paragraph--heading'">
      <ParagraphHeading :cms_response="this.CMS_response"/>
    </template>

    <template v-else-if="element_type === 'paragraph--hierarchical_block'">
      <ParagraphHierarchicalBlock :cms_response="this.CMS_response"/>
    </template>

    <template v-else-if="element_type === 'paragraph--button'">
      <ParagraphButton :cms_response="this.CMS_response"/>
    </template>

    <template v-else-if="element_type === 'paragraph--list'">
      <ParagraphList :cms_response="this.CMS_response"/>
    </template>

    <template v-else-if="element_type === 'paragraph--imagetext'">
      <ParagraphImageText :cms_response="this.CMS_response"/>
    </template>
  </div>
</template>

<script>
import ParagraphImage from "@/components/cms/elements/ParagraphImage";
import ParagraphFullhtml from "@/components/cms/elements/ParagraphFullhtml";
import ParagraphHeading from "@/components/cms/elements/ParagraphHeading";
import ParagraphHierarchicalBlock from "@/components/cms/elements/ParagraphHierarchicalBlock";
import ParagraphButton from "@/components/cms/elements/ParagraphButton";
import ParagraphList from "@/components/cms/elements/ParagraphList";
import ParagraphImageText from "@/components/cms/elements/ParagraphImageText";

export default {
  name: "BlockContents",
  props: {
    location_code: {
      type: String,
      default: "",
    },
    view_type: {
      type: String,
      default: "",
    },
  },
  components: {
    ParagraphImage,
    ParagraphFullhtml,
    ParagraphHeading,
    ParagraphHierarchicalBlock,
    ParagraphButton,
    ParagraphList,
    ParagraphImageText,
  },

  data() {
    return {
      error: null,
      element_type: null,
      CMS_response: null,
    };
  },
  watch: {},
  computed: {
    async readcms(){
      const APIres = await this.$repositories("cms").getBlockContents({
        locationCode: await this.location_code,
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
      let type = "";

      // obj.dataが2つ以上の場合はreturnを返す
      // if (obj.data.length >= 2) return;

      if(!obj.data.error) {
        this.cmsLoaded(this.location_code);
        if (
            !obj ||
            !obj.data ||
            !obj.data.data ||
            !obj.data.data[0] ||
            !obj.data.included ||
            !obj.data.included[0] ||
            obj.data.data.length >= 2
        ) {
          return;
        } else {
          type = obj.data.data[0].relationships.paragraphs.data[0].type;
          this.element_type = type;
          this.CMS_response = obj.data;
        }
      }
    },
    cmsLoaded(code) {
      this.$nextTick(function () {
        this.$emit('sendComplete', code);
      });
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
};
</script>

<style></style>
