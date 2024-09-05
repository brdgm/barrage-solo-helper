<template>
  <div>
    <h6>{{t('roundEnd.determinePlayerOrder.currentItems')}}</h6>
    <div class="player-order">
      <div v-for="(item,index) in availableItems" :key="index" @click="selectItem(item)">
        <PlayerColorIcon :playerColor="getPlayerColor(item)" class="icon"/>
      </div>
    </div>

    <h6>{{t('roundEnd.determinePlayerOrder.newItems')}}</h6>
    <div class="player-order">
      <template v-if="newItems.length === 0">
        <div class="row">
          <div class="col">
            <div class="fst-italic alert alert-primary">{{t('roundEnd.determinePlayerOrder.newItemsSelect')}}</div>
          </div>
        </div>
      </template>
      <div v-else v-for="(item,index) in newItems" :key="index" @click="deselectItem(item)">
        <PlayerColorIcon :playerColor="getPlayerColor(item)" class="icon"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { PlayerOrder, useStateStore } from '@/store/state'
import PlayerColor from '@/services/enum/PlayerColor'
import PlayerColorIcon from './PlayerColorIcon.vue'

export default defineComponent({
  name: 'DeterminePlayerOrder',
  components: {
    PlayerColorIcon
  },
  emits: ['newPlayerOrder'],
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    playerOrder: {
      type: Array as PropType<PlayerOrder[]>,
      required: true
    }
  },
  data() {
    return {
      availableItems: [...this.playerOrder],
      newItems: [] as PlayerOrder[]
    }
  },
  methods: {
    selectItem(selectedItem: PlayerOrder) {
      this.newItems.push(selectedItem)
      this.availableItems = this.availableItems.filter(item => item !== selectedItem)
      this.$emit('newPlayerOrder', this.newItems)
    },
    deselectItem(deselectedItem: PlayerOrder) {
      this.availableItems.push(deselectedItem)
      this.newItems = this.newItems.filter(item => item !== deselectedItem)
      this.$emit('newPlayerOrder', this.newItems)
    },
    getPlayerColor(item: PlayerOrder) : PlayerColor {
      const { playerColors, botCount } = this.state.setup.playerSetup
      if (item.bot) {
        return playerColors[item.bot - 1]
      }
      else if (item.player) {
        return playerColors[botCount + item.player - 1]
      }
      return PlayerColor.BLACK
    }
  }
})
</script>

<style lang="scss" scoped>
.player-order {
  display: flex;
  gap: 10px;
  height: 4rem;
}
.icon {
  height: 2.5rem;
  width: 2.5rem;
  filter: drop-shadow(0.15rem 0.15rem 0.15rem #aaa);
  cursor: pointer;
}
</style>