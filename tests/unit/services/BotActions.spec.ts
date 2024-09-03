import { expect } from 'chai'
import mockState from '../helper/mockState'
import Cards from '@/services/Cards'
import BotActions from '@/services/BotActions'
import Expansion from '@/services/enum/Expansion'

describe('services/BotActions', () => {
  it('5-10A-12', () => {
    const state = mockState()
    const items = new BotActions(Cards.get('5-10A-12'), state).items
    expect(items.length).to.equal(5)  // without construction/Building and patent office/building
  })

  it('5-10A-12.expansion', () => {
    const state = mockState({expansions:[Expansion.LEEGHWATER_PROJECT]})
    const items = new BotActions(Cards.get('5-10A-12'), state).items
    expect(items.length).to.equal(7)
  })

  it('3-6A-9', () => {
    const state = mockState()
    const items = new BotActions(Cards.get('3-6A-9'), state).items
    expect(items.length).to.equal(6)  // without external work
  })

  it('3-6A-9.expansion', () => {
    const state = mockState({expansions:[Expansion.LEEGHWATER_PROJECT]})
    const items = new BotActions(Cards.get('3-6A-9'), state).items
    expect(items.length).to.equal(7)
  })
})
