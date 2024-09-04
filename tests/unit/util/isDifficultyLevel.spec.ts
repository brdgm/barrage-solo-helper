import { expect } from 'chai'
import mockState from '../helper/mockState'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import isDifficultyLevel from '@/util/isDifficultyLevel'

describe('util/isDifficultyLevel.spec', () => {
  it('medium', () => {
    const state = mockState({difficultyLevels:[DifficultyLevel.MEDIUM]})

    expect(isDifficultyLevel(1, DifficultyLevel.EASY, state)).to.false
    expect(isDifficultyLevel(1, DifficultyLevel.MEDIUM, state)).to.true
  })

  it('mixed-overlongArray', () => {
    const state = mockState({botCount:2, difficultyLevels:[DifficultyLevel.EASY,DifficultyLevel.HARD,DifficultyLevel.VERY_HARD]})

    expect(isDifficultyLevel(1, DifficultyLevel.EASY, state)).to.true
    expect(isDifficultyLevel(2, DifficultyLevel.HARD, state)).to.true
  })
})
