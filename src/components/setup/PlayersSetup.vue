<template>
  <h3 class="mt-4 mb-3">{{t('setup.players.title')}}</h3>

  <div class="row mt-3">
    <div class="col-5 col-lg-3">
      <label for="botCount" class="form-label">{{t('setup.players.botCount')}}</label>
    </div>
    <div class="col-6 col-sm-5 col-lg-3">
      <select class="form-select" id="botCount" v-model="botCount">
        <option v-for="i in maxBotCount" :key="i" :value="i">{{t('setup.players.botCountItem', {count:i}, i)}}</option>
      </select>
    </div>
  </div>  
  <div class="row mt-3" v-for="botColorIndex in botCount" :key="botColorIndex+playerColors[botColorIndex-1]">
    <div class="col-5 col-lg-3">
      <label class="form-label">{{t('setup.players.botColor', {index:botColorIndex}, botCount)}}</label>
    </div>
    <div class="col-5 col-lg-3">
      <PlayerColorPicker :model-value="playerColors[botColorIndex-1]" @update:model-value="color => playerColorChanged(botColorIndex-1, color)"/>
    </div>
  </div>  

  <div class="row mt-3">
    <div class="col-5 col-lg-3">
      <label for="playerCount" class="form-label">{{t('setup.players.playerCount')}}</label>
    </div>
    <div class="col-6 col-sm-5 col-lg-3">
      <select class="form-select" id="playerCount" v-model="playerCount">
        <option v-for="i in maxPlayerCount" :key="i" :value="i">{{t('setup.players.playerCountItem', {count:i}, i)}}</option>
      </select>
    </div>
  </div>  
  <div class="row mt-3" v-for="playerColorIndex in playerCount" :key="playerColorIndex+playerColors[botCount+playerColorIndex-1]">
    <div class="col-5 col-lg-3">
      <label class="form-label">{{t('setup.players.playerColor', {index:playerColorIndex}, playerCount)}}</label>
    </div>
    <div class="col-5 col-lg-3">
      <PlayerColorPicker :model-value="playerColors[botCount+playerColorIndex-1]" @update:model-value="color => playerColorChanged(botCount+playerColorIndex-1, color)"/>
    </div>
  </div>  

</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import PlayerColorPicker from './PlayerColorPicker.vue'
import PlayerColor from '@/services/enum/PlayerColor'
import isPlayerColorAvailable from '@/util/isPlayerColorAvailable'

export default defineComponent({
  name: 'PlayersSetup',
  components: {
    PlayerColorPicker
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const expansions = state.setup.expansions

    const botCount = ref(state.setup.playerSetup?.botCount || 1)
    const playerCount = ref(state.setup.playerSetup?.playerCount || 1)
    const playerColors = ref(state.setup.playerSetup?.playerColors || [PlayerColor.WHITE, PlayerColor.BLACK, PlayerColor.TURQUOISE, PlayerColor.RED])

    watch(
      () => state.setup.expansions,
      () => {
        // available player colors depend on expansion selection - fallback to available color if expansion selection changes
        for (let i=0; i<playerColors.value.length; i++) {
          if (!isPlayerColorAvailable(playerColors.value[i], expansions)) {
            const firstAvailableColor = Object.values(PlayerColor).find(color => !playerColors.value.includes(color) && isPlayerColorAvailable(color, expansions))
            playerColors.value[i] = firstAvailableColor || PlayerColor.WHITE
          }
        }
      },
      { deep: true}
    )

    return { t, state, playerCount, botCount, playerColors }
  },
  computed: {
    maxPlayerCount() : number {
      return 4 - this.botCount
    },
    maxBotCount() : number {
      return 4 - this.playerCount
    }
  },
  watch: {
    playerCount() {
      if (this.botCount > this.maxBotCount) {
        this.botCount = this.maxBotCount
      }
      this.storePlayerSetup()
    },
    playerColors() {
      this.storePlayerSetup()
    },
    botCount() {
      if (this.playerCount > this.maxPlayerCount) {
        this.playerCount = this.maxPlayerCount
      }
      this.storePlayerSetup()
    }
  },
  methods: {
    storePlayerSetup() {
      this.state.setup.playerSetup = {
        playerCount: this.playerCount,
        botCount: this.botCount,
        playerColors: this.playerColors
      }
    },
    playerColorChanged(index : number, color : PlayerColor) {
      const newPlayerColors = [...this.playerColors]
      newPlayerColors[index] = color
      for (let i=0; i<this.playerColors.length; i++) {
        if (i!=index && newPlayerColors[i]==color) {
          const newColor = Object.values(PlayerColor).find(c => !newPlayerColors.includes(c))
          if (newColor) {
            newPlayerColors[i] = newColor
          }
        }
      }
      this.playerColors = newPlayerColors
    }
  }
})
</script>
