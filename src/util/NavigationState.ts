import { RouteLocation } from 'vue-router'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import { BotPersistence, State } from '@/store/state'
import CardDeck from '@/services/CardDeck'

export default class NavigationState {

  readonly turn : number
  readonly cardDeck : CardDeck

  public constructor(route: RouteLocation, state: State) {
    this.turn = getIntRouteParam(route, 'turn')

    const lastTurn = (route.name == 'EndGameScoring')
    const bot = getLastBotPersistence(state, this.turn, lastTurn)

    if (bot) {
      this.cardDeck = CardDeck.fromPersistence(bot.cardDeck)
    }
    else {
      if (state.setup.initialCardDeck) {
        this.cardDeck = CardDeck.fromPersistence(state.setup.initialCardDeck)
      }
      else {
        this.cardDeck = CardDeck.new()
      }
    }
  }

}

function getLastBotPersistence(state: State, turn: number, lastTurn: boolean) : BotPersistence | undefined {
  return state.turns
      .toSorted((item1,item2) => item1.turn - item2.turn)
      .findLast(item => ((item.turn < turn) || lastTurn) && item.bot)?.bot
}
