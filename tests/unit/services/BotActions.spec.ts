import { expect } from 'chai'
import mockState from '../helper/mockState'
import Cards from '@/services/Cards'
import BotActions from '@/services/BotActions'
import Expansion from '@/services/enum/Expansion'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import ExecutiveOfficer from '@/services/enum/ExecutiveOfficer'
import Action from '@/services/enum/Action'

describe('services/BotActions', () => {
  it('5-10A-12', () => {
    const state = mockState()
    const items = new BotActions(Cards.get('5-10A-12'), 1, 1, state).items
    expect(items.length).to.equal(5)  // without construction/Building and patent office/building
  })

  it('5-10A-12.expansion', () => {
    const state = mockState({expansions:[Expansion.LEEGHWATER_PROJECT]})
    const items = new BotActions(Cards.get('5-10A-12'), 1, 1, state).items
    expect(items.length).to.equal(7)
  })

  it('5-10A-12.expansion.round-5', () => {
    const state = mockState({expansions:[Expansion.LEEGHWATER_PROJECT]})
    const items = new BotActions(Cards.get('5-10A-12'), 5, 1, state).items
    expect(items.length).to.equal(6)  // no machinery shop
  })

  it('3-6A-9', () => {
    const state = mockState()
    const items = new BotActions(Cards.get('3-6A-9'), 1, 1, state).items
    expect(items.length).to.equal(6)  // without external work
  })

  it('3-6A-9.expansion', () => {
    const state = mockState({expansions:[Expansion.LEEGHWATER_PROJECT]})
    const items = new BotActions(Cards.get('3-6A-9'), 1, 1, state).items
    expect(items.length).to.equal(7)
  })

  it('5-9A-8.expansion.gennaro-grasso', () => {
    const state = mockState({expansions:[Expansion.LEEGHWATER_PROJECT],
      difficultyLevels:[DifficultyLevel.VERY_HARD],botExecutiveOfficers:[ExecutiveOfficer.GENNARO_GRASSO]})
    const items = new BotActions(Cards.get('5-9A-8'), 1, 1, state).items
    expect(items.map(item => item.action)).to.eql([
      // 2nd column
      Action.CONSTRUCTION,
      Action.CONSTRUCTION,
      // 1st column
      Action.PRODUCTION,
      Action.WATER_MANAGEMENT,
      // rest
      Action.WORKSHOP,
      Action.MACHINERY_SHOP,
      Action.BANK
    ])
  })

})
