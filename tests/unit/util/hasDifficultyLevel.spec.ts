import { expect } from 'chai'
import mockState from '../helper/mockState'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import hasDifficultyLevel from '@/util/hasDifficultyLevel'

describe('util/hasDifficultyLevel', () => {
  it('medium', () => {
    const state = mockState({difficultyLevels:[DifficultyLevel.MEDIUM]})

    expect(hasDifficultyLevel(DifficultyLevel.EASY, state)).to.false
    expect(hasDifficultyLevel(DifficultyLevel.MEDIUM, state)).to.true
    expect(hasDifficultyLevel(DifficultyLevel.HARD, state)).to.false
    expect(hasDifficultyLevel(DifficultyLevel.VERY_HARD, state)).to.false
  })

  it('mixed-overlongArray', () => {
    const state = mockState({botCount:2, difficultyLevels:[DifficultyLevel.EASY,DifficultyLevel.HARD,DifficultyLevel.VERY_HARD]})

    expect(hasDifficultyLevel(DifficultyLevel.EASY, state)).to.true
    expect(hasDifficultyLevel(DifficultyLevel.MEDIUM, state)).to.false
    expect(hasDifficultyLevel(DifficultyLevel.HARD, state)).to.true
    expect(hasDifficultyLevel(DifficultyLevel.VERY_HARD, state)).to.false
  })
})
