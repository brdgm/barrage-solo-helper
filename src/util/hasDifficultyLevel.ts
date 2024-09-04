import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { State } from '@/store/state'

/**
 * Check if any Automa is configured to the given difficulty level.
 * If checked for hard, difficulty level very hard is respected as well.
 * @param difficultyLevel Difficulty level
 * @param state State
 */
export default function hasDifficultyLevel(difficultyLevel: DifficultyLevel, state: State) : boolean {
  if (difficultyLevel == DifficultyLevel.HARD) {
    // playing with VeRY_HARD includes HARD mode
    return hasDifficultyLevelInternal(DifficultyLevel.HARD, state) || hasDifficultyLevelInternal(DifficultyLevel.VERY_HARD, state)
  }
  return hasDifficultyLevelInternal(difficultyLevel, state)
}

function hasDifficultyLevelInternal(difficultyLevel: DifficultyLevel, state: State) : boolean {
  const { botCount } = state.setup.playerSetup
  const { difficultyLevels } = state.setup
  // check only for actual bot index, array might be larger
  return difficultyLevels.slice(0, botCount).includes(difficultyLevel)
}
