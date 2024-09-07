import { expect } from 'chai'
import CardDeck from '@/services/CardDeck'
import getDiscardPileAllPreviousActions from '@/util/getDiscardPileAllPreviousActions'
import Action from '@/services/enum/Action'
import ConstructionType from '@/services/enum/ConstructionType'

describe('util/getDiscardPileAllPreviousActions', () => {
  it('getDiscardPileAllPreviousActions', () => {
    const persistence = {pile: ['5-10A-12','5-9A-8'], discard: ['3-6A-9','6-3A-5']}
    const cardDeck = CardDeck.fromPersistence(persistence)
    const actions = getDiscardPileAllPreviousActions(cardDeck)

    expect(actions.length).to.eql(29)
    expect(actions[2]).to.eql({
      action: Action.CONSTRUCTION,
      workerCount: 2,
      constructionType: ConstructionType.CONDUIT
    })
    expect(cardDeck.toPersistence()).to.eql(persistence)
  })
})
