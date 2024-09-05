import { expect } from 'chai'
import mockState from '../helper/mockState'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import hasDifficultyLevelExecutiveOfficer from '@/util/hasDifficultyLevelExecutiveOfficer'
import ExecutiveOfficer from '@/services/enum/ExecutiveOfficer'

describe('util/hasDifficultyLevelExecutiveOfficer', () => {
  it('hasDifficultyLevelExecutiveOfficer', () => {
    const state = mockState({botCount:2,
        difficultyLevels:[DifficultyLevel.VERY_HARD,DifficultyLevel.HARD,DifficultyLevel.VERY_HARD],
        botExecutiveOfficers:[ExecutiveOfficer.AMIR_ZAHIR,ExecutiveOfficer.ANTON_KRYLOV,ExecutiveOfficer.ELON_AUDIA]})

    expect(hasDifficultyLevelExecutiveOfficer(DifficultyLevel.VERY_HARD, ExecutiveOfficer.AMIR_ZAHIR, state)).to.true
    expect(hasDifficultyLevelExecutiveOfficer(DifficultyLevel.VERY_HARD, ExecutiveOfficer.ANTON_KRYLOV, state)).to.false
    expect(hasDifficultyLevelExecutiveOfficer(DifficultyLevel.VERY_HARD, ExecutiveOfficer.ELON_AUDIA, state)).to.false
  })
})
