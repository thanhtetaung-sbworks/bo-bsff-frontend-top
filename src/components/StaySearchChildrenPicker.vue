<template>
  <div class="stayChild_wrapper">
    <div class="stayChild_container">
      <!-- 小学生 -->
      <div 
        class="stayChild_item stayChild_item__first"
      >
        <!-- ヘッダー -->
        <div class="stayChild_item_head">小学生</div>
        <!-- コンテンツ -->
        <div class="stayChild_item_cont">
          <div             
          v-for="(childDetail, i) in childDetails.slice(0, 2)"
          :key="childDetail.type"
          class="stayChild_item_cont_wrap"
          :class="i === 0 ? 'mb-6' : ''"
          >
            <!-- ラベル名 -->
            <div class="stayChild_item_cont_label">{{ childDetail.label }}</div>
            <div class="stayChild_item_cont_inputs">
              <!-- マイナスアイコン -->
              <div
                class="stayChild_item_cont_minus"
                :class="{ disabled: childDetail.quantity < 1 }"
                @click="handleDecreate(childDetail)"
              >
                <Icon name="action_circle_minus_fill" width="24" height="24" />
              </div>
              <!-- インプット項目：人数 -->
              <input
                class="stayChild_item_cont_input"
                type="text"
                :value="childDetail.quantity | humanUnit"
                disabled
              />
              <!-- プラスアイコン -->
              <div
                class="stayChild_item_cont_plus"
                :class="{ disabled: totalQuantities >= maxQuantities }"
                @click="handleIncreate(childDetail)"
              >
                <Icon name="action_circle_plus_fill" width="24" height="24" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 幼児 -->
      <div
        class="stayChild_item"
      >
        <!-- ヘッダー -->
        <div class="stayChild_item_head">幼児　</div>
        <!-- コンテンツ -->
        <div class="stayChild_item_cont stayChild_item_cont__grid">
          <div
            class="stayChild_item_cont_wrap"
            v-for="childDetail in childDetails.slice(2)" 
            :key="childDetail.type"
          >
            <!-- ラベル名 -->
            <div class="stayChild_item_cont_label">{{ childDetail.label }}</div>
            <div class="stayChild_item_cont_inputs">
              <!-- マイナスアイコン -->
              <div
                class="stayChild_item_cont_minus"
                :class="{ disabled: childDetail.quantity < 1 }"
                @click="handleDecreate(childDetail)"
              >
                <Icon name="action_circle_minus_fill" width="24" height="24" />
              </div>
              <!-- インプット項目：人数 -->
              <input
                class="stayChild_item_cont_input"
                type="text"
                :value="childDetail.quantity | humanUnit"
                disabled
              />
              <!-- プラスアイコン -->
              <div
                class="stayChild_item_cont_plus"
                :class="{ disabled: totalQuantities >= maxQuantities }"
                @click="handleIncreate(childDetail)"
              >
                <Icon name="action_circle_plus_fill" width="24" height="24" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sumBy from "lodash/sumBy";

export default {
  filters: {
    humanUnit(value) {
      return `${value}人`;
    }
  },
  props: {
    rooms: {
      type: [String, Number],
      default: 1
    }
  },
  data() {
    return {
      childDetails: [
        {
          type: "exUpperGradesHeadCnt",
          quantity: 0,
          label: "高学年",
          head: "小学生"
        },
        {
          type: "exLowerGradesHeadCnt",
          quantity: 0,
          label: "低学年"
        },
        {
          type: "youjiAHeadCnt",
          quantity: 0,
          label: "食事・布団付",
          head: "幼児"
        },
        {
          type: "youjiBHeadCnt",
          quantity: 0,
          label: "食事のみ"
        },
        {
          type: "youjiCHeadCnt",
          quantity: 0,
          label: "布団のみ"
        },
        {
          type: "youjiDHeadCnt",
          quantity: 0,
          label: "食事・布団不要"
        }
      ]
    };
  },
  computed: {
    maxQuantities() {
      return this.rooms * 10;
    },
    totalQuantities() {
      return sumBy(this.childDetails, "quantity");
    }
  },
  methods: {
    handleDecreate(childDetail) {
      this.childDetails.map((item) => {
        if (item.type === childDetail.type) {
          item.quantity > 0 ? item.quantity-- : 0;
        }
        return item;
      });
    },
    handleIncreate(childDetail) {
      this.childDetails.map((item) => {
        if (item.type === childDetail.type) {
          this.totalQuantities < this.maxQuantities ? item.quantity++ : null;
        }
        return item;
      });
    }
  },
  watch: {
    totalQuantities(value) {
      this.$emit("input", value);
      let childrenQuantity = {};
      this.childDetails.forEach((item) => {
        childrenQuantity[item.type] = item.quantity;
      });
      this.$emit("changeChildrenQuantity", childrenQuantity);
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.mb-6 {
  margin-bottom: 24px;
}

.stayChild {
  &_wrapper {
    padding: 20px 24px;
  }
  &_container {
    display: flex;
  }
  &_item {
    display: flex;
    align-items: center;
    &__first {
      margin-right: 20px;
      padding-right: 25px;
      border-right: 1px solid #CACCCF;
    }
    &_head {
      margin-right: 20px;
      font-size: 15px;
      font-weight: bold;
    }
    &_cont {
      &__grid {
          display: grid;
          grid-template-columns: 130px 130px;
          row-gap: 24px;
          column-gap: 24px;
      }
      &_label {
        margin-bottom: 2px;
        white-space: nowrap;
        font-size: 13px;
      }
      &_inputs {
        display: flex;
        align-items: center;
      }
      &_minus {
        margin-right: 6px;
        &.disabled {
          opacity: .5;
          pointer-events: none;
        }
      }
      &_input {
        margin-right: 6px;
        padding: 10px 24px;
        width: 74px;
        border: 1px solid #CACCCF;
        border-radius: 4px;
        background-color: white;
        font-size: 15px;
      }
    }
  }
}

@media only screen and (max-width: 640px) {
  .mb-6 {
    margin-bottom: 0;
  }
  .stayChild {
    &_wrapper {
      padding: 16px;
    }
    &_container {
      display: block;
    }
    &_item {
      display: flex;
      align-items: center;
      &__first {
        margin-bottom: 16px;
        margin-right: 0;
        padding-bottom: 16px;
        padding-right: 0;
        border-right: none;
        border-bottom: 1px solid #CACCCF;
      }
      &_head {
        margin-right: 28px;
        font-size: 13px;
        width: 40px;
        text-align: center;
      }
      &_cont {
        display: flex;
        gap: 20px;
        &__grid {
            display: grid;
            grid-template-columns: 120px 120px;
            row-gap: 12px;
            column-gap: 17px;
        }
        &_label {
          margin-bottom: 4px;
        }
        &_minus {
          margin-right: 8px;
          &.disabled {
            opacity: .5;
            pointer-events: none;
          }
        }
        &_input {
          margin-right: 8px;
          padding: 8px 0 8px 12px;
          width: 52px;
          border-radius: 3px;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
