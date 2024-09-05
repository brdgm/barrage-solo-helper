<template>
  <div class="hydroCost">
    <div class="number">-{{hydroCost}}</div>
    <AppIcon name="victory-points" class="icon"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppIcon from './AppIcon.vue'

export default defineComponent({
  name: 'HydroCost',
  components: {
    AppIcon
  },
  props: {
    hydroCost: {
      type: Number,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.hydroCost {
  display: inline-block;
  position: relative;
  .number {
    position: absolute;
    left: 12px;
    top: 2px;
    font-size: 30px;
    font-weight: bold;
    color: red;
    text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  }
  .icon {
    height: 3.5rem;
  }
}
</style>
