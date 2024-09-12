import { State } from '@/store/state'
import { RouteLocation } from 'vue-router'
import PlayerColor from '@/services/enum/PlayerColor'
import AbstractNavigationState from './AbstractNavigationState'
import CardDeck from '@/services/CardDeck'
import getPreviousTurns from './getPreviousTurns'
import getIntRouteParam from '@brdgm/brdgm-commons/src/util/router/getIntRouteParam'
import BotActions from '@/services/BotActions'
import { ActionItem } from '@/services/Card'
import { MAX_TURN } from '@/util/getTurnOrder'

export default class BotNavigationState extends AbstractNavigationState {

  readonly bot : number
  readonly action : number
  readonly workerUsedPreviousAction? : number
  readonly playerColor : PlayerColor
  readonly workerCount : number
  readonly cardDeck : CardDeck
  readonly botActions : BotActions
  readonly actionItem? : ActionItem

  constructor(route : RouteLocation, state : State) {
    super(route, state)
    this.bot = getIntRouteParam(route, 'bot')
    this.action = getIntRouteParam(route, 'action')
    this.workerUsedPreviousAction = this.getIntRouteParamIfPresent(route, 'worker')
    this.playerColor = this.playerColors[this.bot - 1] || PlayerColor.BLACK
    this.workerCount = this.botInfos.find(info => info.bot == this.bot)?.workerCount ?? 0
    this.cardDeck = getCardDeck(state, this.round, this.turn, this.bot)

    // draw next card for bot
    const actionCard = this.cardDeck.draw()
    this.botActions = new BotActions(actionCard, this.round, this.bot, state)
    this.actionItem = this.botActions.get(this.action)
  }

}

function getCardDeck(state:State, round:number, turn:number, bot:number) : CardDeck {
  const previousTurns = getPreviousTurns({state, round, turn, bot})
  for (let i=previousTurns.length-1; i>=0; i--) {
    const previousTurn = previousTurns[i]
    if (previousTurn.cardDeck) {
      return CardDeck.fromPersistence(previousTurn.cardDeck)
    }
  }
  if (round > 1) {
    return getCardDeck(state, round-1, MAX_TURN, bot)
  }
  if (state.setup.initialCardDeck) {
    return CardDeck.fromPersistence(state.setup.initialCardDeck)
  }
  return CardDeck.new()
}
