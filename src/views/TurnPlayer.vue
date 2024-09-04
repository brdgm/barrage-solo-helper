<template>
  <SideBar :navigationState="navigationState"/>

  <h1>
    <PlayerColorIcon :playerColor="playerColor" class="playerColorIcon"/>
    {{t('turnPlayer.title',{player:player},playerCount)}}
  </h1>

  <p v-html="t('turnPlayer.takeTurn')" class="mt-4 mb-4"></p>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>
  <button class="btn btn-secondary btn-sm mt-4 ms-2" data-bs-toggle="modal" data-bs-target="#modalPassInfo">
    {{t('action.pass')}}
  </button>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="abortGame"/>

  <ModalDialog id="modalPassInfo" :title="t('turnPlayer.pass.title')">
    <template #body>
      <p v-html="t('turnPlayer.pass.confirm')"></p>
    </template>
    <template #footer>
      <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="pass()">{{t('action.pass')}}</button>
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
    </template>
  </ModalDialog>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import { useStateStore } from '@/store/state'
import RouteCalculator from '@/services/RouteCalculator'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import PlayerNavigationState from '@/util/PlayerNavigationState'
import PlayerColorIcon from '@/components/structure/PlayerColorIcon.vue'
import SideBar from '@/components/turn/SideBar.vue'

export default defineComponent({
  name: 'TurnPlayer',
  components: {
    FooterButtons,
    ModalDialog,
    PlayerColorIcon,
    SideBar
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new PlayerNavigationState(route, state)
    const { playerCount, round, turn, player, playerColor } = navigationState
    const routeCalculator = new RouteCalculator({round, turn, player})

    return { t, state, playerCount, round, turn, player, playerColor, routeCalculator, navigationState }
  },
  data() {
    return {
      claimFirstPlayer: false
    }
  },
  computed: {
    backButtonRouteTo() : string {
      return this.routeCalculator.getBackRouteTo(this.state)
    }
  },
  methods: {
    next() : void {
      this.nextWithPassed(false)
    },
    pass() : void {
      this.nextWithPassed(true)
    },
    nextWithPassed(passed : boolean) {
      this.state.storeTurn({
        round:this.round,
        turn:this.turn,
        player:this.player,
        passed: passed ? true : undefined
      })
      this.$router.push(this.routeCalculator.getNextRouteTo(this.state))
    },
    firstPlayerClaimed() : void {
      this.claimFirstPlayer = true
    }
  }
})
</script>

<style lang="scss" scoped>
.playerColorIcon {
  width: 2rem;
  height: 2rem;
  margin-top: -0.5rem;
}
</style>
