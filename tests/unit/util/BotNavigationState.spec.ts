import { expect } from 'chai'
import BotNavigationState from '@/util/BotNavigationState'
import mockRouteLocation from '../helper/mockRouteLocation'
import mockState from '../helper/mockState'
import mockRound from '../helper/mockRound'
import mockTurn from '../helper/mockTurn'
import mockCardDeck from '../helper/mockCardDeck'
import Cards from '@/services/Cards'
import { CardDeckPersistence } from '@/store/state'
import { RouteParams } from 'vue-router'

const cardIds = Cards.getAll().map(card => card.id)
const state = mockState({playerCount:1, botCount:2, initialCardDeck:cardDeck([0,1,2,3,4,5,6,7,8],[]), rounds:[
  mockRound({round:1, playerOrder:[{player:1},{bot:1},{bot:2}], turns:[
    mockTurn({round:1,turn:1,player:1}),
    mockTurn({round:1,turn:1,bot:1,cardDeck:cardDeck([1,2,3,4,5,6,7,8],[0]),workerUsed:1}),
    mockTurn({round:1,turn:1,bot:2,cardDeck:cardDeck([2,3,4,5,6,7,8],[1,0]),workerUsed:2}),
    mockTurn({round:1,turn:2,player:1,passed:true}),
    mockTurn({round:1,turn:2,bot:1,cardDeck:cardDeck([3,4,5,6,7,8],[2,1,0]),workerUsed:1,}),
    mockTurn({round:1,turn:2,bot:2,cardDeck:cardDeck([4,5,6,7,8],[3,2,1,0]),workerUsed:2,passed:true}),
    mockTurn({round:1,turn:3,bot:1,cardDeck:cardDeck([5,6,7,8],[4,3,2,1,0]),workerUsed:1,passed:true})
  ]}),
  mockRound({round:2, playerOrder:[{player:1},{bot:2},{bot:1}], turns:[
    mockTurn({round:2,turn:1,player:1}),
    mockTurn({round:2,turn:1,bot:2,cardDeck:cardDeck([6,7,8],[5,4,3,2,1,0]),workerUsed:1}),
    mockTurn({round:2,turn:1,bot:1,cardDeck:cardDeck([7,8],[6,5,4,3,2,1,0]),workerUsed:3}),
    mockTurn({round:2,turn:2,player:1}),
    mockTurn({round:2,turn:2,bot:2,cardDeck:cardDeck([8],[7,6,5,4,3,2,1,0]),workerUsed:1})
  ]})
]})

describe('util/BotNavigationState', () => {
  it('getCardDeck', () => {
    expect(botNavigationState({round:'1',turn:'1',bot:'1'}).cardDeck.toPersistence())
        .to.eql(cardDeck([1,2,3,4,5,6,7,8],[0]), 'round1-turn1-bot1')
    expect(botNavigationState({round:'1',turn:'2',bot:'2'}).cardDeck.toPersistence())
        .to.eql(cardDeck([4,5,6,7,8],[3,2,1,0]), 'round1-turn2-bot2')
    expect(botNavigationState({round:'2',turn:'1',bot:'2'}).cardDeck.toPersistence())
        .to.eql(cardDeck([6,7,8],[5,4,3,2,1,0]), 'round2-turn1-bot2')
    expect(botNavigationState({round:'2',turn:'1',bot:'1'}).cardDeck.toPersistence())
        .to.eql(cardDeck([7,8],[6,5,4,3,2,1,0]), 'round2-turn1-bot1')
  })

  it('workerCount', () => {
    expect(botNavigationState({round:'1',turn:'1',bot:'1'}).workerCount).to.eq(12)
    expect(botNavigationState({round:'1',turn:'1',bot:'2'}).workerCount).to.eq(12)
    expect(botNavigationState({round:'1',turn:'2',bot:'1'}).workerCount).to.eq(11)
    expect(botNavigationState({round:'1',turn:'2',bot:'2'}).workerCount).to.eq(10)
    expect(botNavigationState({round:'1',turn:'3',bot:'1'}).workerCount).to.eq(10)
    expect(botNavigationState({round:'1',turn:'3',bot:'2'}).workerCount).to.eq(8)

    expect(botNavigationState({round:'2',turn:'1',bot:'2'}).workerCount).to.eq(12)
    expect(botNavigationState({round:'2',turn:'1',bot:'1'}).workerCount).to.eq(12)
    expect(botNavigationState({round:'2',turn:'2',bot:'2'}).workerCount).to.eq(11)
    expect(botNavigationState({round:'2',turn:'2',bot:'1'}).workerCount).to.eq(9)
  })
})

/**
 * Simplified method to build card deck based on card index (of all cards).
 */
function cardDeck(pile:number[], discard:number[]) : CardDeckPersistence {
  return mockCardDeck({
    pile: pile.map(i => cardIds[i]),
    discard: discard.map(i => cardIds[i])
  }).toPersistence()
}

function botNavigationState(params:RouteParams) : BotNavigationState {
  return new BotNavigationState(mockRouteLocation({params}), state)
}
