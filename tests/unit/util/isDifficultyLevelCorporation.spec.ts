import { expect } from 'chai'
import mockState from '../helper/mockState'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Corporation from '@/services/enum/Corporation'
import isDifficultyLevelCorporation from '@/util/isDifficultyLevelCorporation'

describe('util/isDifficultyLevelCorporation', () => {
  it('isDifficultyLevelCorporation', () => {
    const state = mockState({difficultyLevels:[DifficultyLevel.MEDIUM],botCorporations:[Corporation.FRANCE]})

    expect(isDifficultyLevelCorporation(1, DifficultyLevel.MEDIUM, Corporation.FRANCE, state)).to.true
    expect(isDifficultyLevelCorporation(1, DifficultyLevel.MEDIUM, Corporation.GERMANY, state)).to.false
  })
})
