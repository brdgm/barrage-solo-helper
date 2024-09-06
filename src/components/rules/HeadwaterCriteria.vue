<template>
  <template v-for="(column,index) of criteriaCard.waterManagementBasinColumns" :key="column">
    <span v-if="index > 0"> - </span>
    <span>{{column}}</span>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import Card from '@/services/Card'

export default defineComponent({
  name: 'HeadwaterCriteria',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    criteriaCard: {
      type: Object as PropType<Card>,
      required: true
    }
  }
})
</script>
