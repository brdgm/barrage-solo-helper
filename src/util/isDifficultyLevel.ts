import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { State } from '@/store/state'

/**
 * Check if a specific Automa is configured to the given difficulty level.
 * @param bot Bot
 * @param difficultyLevel Difficulty level
 * @param state State
 */
export default function isDifficultyLevel(bot: number, difficultyLevel: DifficultyLevel, state: State) : boolean {
  const { difficultyLevels } = state.setup
  return difficultyLevels[bot - 1] == difficultyLevel
}
