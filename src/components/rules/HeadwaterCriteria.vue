<template>
  <template v-for="(basin,index) of criteriaCard.waterManagementBasinColumns" :key="basin">
    <span v-if="index > 0"> - </span>
    <span>{{basin}}</span>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Card from '@/services/Card'

export default defineComponent({
  name: 'HeadwaterCriteria',
  props: {
    criteriaCard: {
      type: Object as PropType<Card>,
      required: true
    }
  }
})
</script>
