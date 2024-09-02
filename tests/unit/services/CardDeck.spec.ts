import CardDeck from '@/services/CardDeck'
import { expect } from 'chai'

describe('services/CardDeck', () => {
  it('new', () => {
    const deck = CardDeck.new()

    expect(deck.actionCard, 'actionCard').to.undefined
    expect(deck.supportCard, 'supportCard').to.not.undefined
    expect(deck.pile.length, 'pile').to.eq(20)
    expect(deck.discard.length, 'discard').to.eq(0)

    const persistence = deck.toPersistence()
    expect(persistence.pile.length, 'pile').to.eq(20)
    expect(persistence.discard.length, 'discard').to.eq(0)
  })
})
