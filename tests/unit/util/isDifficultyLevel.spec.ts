import { expect } from 'chai'
import mockState from '../helper/mockState'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import isDifficultyLevel from '@/util/isDifficultyLevel'

describe('util/isDifficultyLevel', () => {
  it('medium', () => {
    const state = mockState({difficultyLevels:[DifficultyLevel.MEDIUM]})

    expect(isDifficultyLevel(1, DifficultyLevel.EASY, state)).to.false
    expect(isDifficultyLevel(1, DifficultyLevel.MEDIUM, state)).to.true
    expect(isDifficultyLevel(1, DifficultyLevel.HARD, state)).to.false
    expect(isDifficultyLevel(1, DifficultyLevel.VERY_HARD, state)).to.false
  })

  it('veryHard', () => {
    const state = mockState({difficultyLevels:[DifficultyLevel.VERY_HARD]})

    expect(isDifficultyLevel(1, DifficultyLevel.EASY, state)).to.false
    expect(isDifficultyLevel(1, DifficultyLevel.MEDIUM, state)).to.false
    expect(isDifficultyLevel(1, DifficultyLevel.HARD, state)).to.true
    expect(isDifficultyLevel(1, DifficultyLevel.VERY_HARD, state)).to.true
  })

  it('mixed-overlongArray', () => {
    const state = mockState({botCount:2, difficultyLevels:[DifficultyLevel.EASY,DifficultyLevel.HARD,DifficultyLevel.VERY_HARD]})

    expect(isDifficultyLevel(1, DifficultyLevel.EASY, state)).to.true
    expect(isDifficultyLevel(2, DifficultyLevel.HARD, state)).to.true
  })
})
