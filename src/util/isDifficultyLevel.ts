import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { State } from '@/store/state'

/**
 * Check if a specific Automa is configured to the given difficulty level.
 * If checked for hard, difficulty level very hard is respected as well.
 * @param bot Bot
 * @param difficultyLevel Difficulty level
 * @param state State
 */
export default function isDifficultyLevel(bot: number, difficultyLevel: DifficultyLevel, state: State) : boolean {
  if (difficultyLevel == DifficultyLevel.HARD) {
    // playing with VeRY_HARD includes HARD mode
    return isDifficultyLevelInternal(bot, DifficultyLevel.HARD, state) || isDifficultyLevelInternal(bot, DifficultyLevel.VERY_HARD, state)
  }
  return isDifficultyLevelInternal(bot, difficultyLevel, state)
}

function isDifficultyLevelInternal(bot: number, difficultyLevel: DifficultyLevel, state: State) : boolean {
  const { difficultyLevels } = state.setup
  return difficultyLevels[bot - 1] == difficultyLevel
}
