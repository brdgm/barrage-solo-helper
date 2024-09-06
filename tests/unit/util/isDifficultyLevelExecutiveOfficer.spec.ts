import { expect } from 'chai'
import mockState from '../helper/mockState'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import ExecutiveOfficer from '@/services/enum/ExecutiveOfficer'
import isDifficultyLevelExecutiveOfficer from '@/util/isDifficultyLevelExecutiveOfficer'

describe('util/isDifficultyLevelExecutiveOfficer', () => {
  it('isDifficultyLevelExecutiveOfficer', () => {
    const state = mockState({difficultyLevels:[DifficultyLevel.MEDIUM],botExecutiveOfficers:[ExecutiveOfficer.WILHELM_ADLER]})

    expect(isDifficultyLevelExecutiveOfficer(1, DifficultyLevel.MEDIUM, ExecutiveOfficer.WILHELM_ADLER, state)).to.true
    expect(isDifficultyLevelExecutiveOfficer(1, DifficultyLevel.MEDIUM, ExecutiveOfficer.JILL_MCDOWELL, state)).to.false
  })
})
