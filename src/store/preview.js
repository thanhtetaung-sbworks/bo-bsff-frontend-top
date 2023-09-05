export default {
    state() {
      return {
        subscriptionId: null,
        courseId: null,
        courseParentId: null,
        previewDate: null,
        previewMode: false
      };
    },
    mutations: {
      isSubscriptionId(state, params) {
        state.subscriptionId = params;
      },
      isCourseId(state, params) {
        state.courseId = params;
      },
      isCourseParentId(state, params) {
        state.courseParentId = params;
      },
      isPreviewDate(state, params) {
        state.previewDate = params;
      },
      isPreviewMode(state, params) {
        state.previewMode = params;
      }
    },
    getters: {
      getSubscriptionId: (state) => state.subscriptionId,
      getCourseId: (state) => state.courseId,
      getCourseParentId: (state) => state.courseParentId,
      getPreviewDate: (state) => state.previewDate,
      getPreviewMode: (state) => state.previewMode,
    },
  };