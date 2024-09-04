import { expect } from 'chai'
import mockState from '../helper/mockState'
import Cards from '@/services/Cards'
import BotActions from '@/services/BotActions'
import Expansion from '@/services/enum/Expansion'

describe('services/BotActions', () => {
  it('5-10A-12', () => {
    const state = mockState()
    const items = new BotActions(Cards.get('5-10A-12'), 1, state).items
    expect(items.length).to.equal(5)  // without construction/Building and patent office/building
  })

  it('5-10A-12.expansion', () => {
    const state = mockState({expansions:[Expansion.LEEGHWATER_PROJECT]})
    const items = new BotActions(Cards.get('5-10A-12'), 1, state).items
    expect(items.length).to.equal(7)
  })

  it('5-10A-12.expansion.round-5', () => {
    const state = mockState({expansions:[Expansion.LEEGHWATER_PROJECT]})
    const items = new BotActions(Cards.get('5-10A-12'), 5, state).items
    expect(items.length).to.equal(6)  // no machinery shop
  })

  it('3-6A-9', () => {
    const state = mockState()
    const items = new BotActions(Cards.get('3-6A-9'), 1, state).items
    expect(items.length).to.equal(6)  // without external work
  })

  it('3-6A-9.expansion', () => {
    const state = mockState({expansions:[Expansion.LEEGHWATER_PROJECT]})
    const items = new BotActions(Cards.get('3-6A-9'), 1, state).items
    expect(items.length).to.equal(7)
  })
})
