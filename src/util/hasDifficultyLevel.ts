import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { State } from '@/store/state'

/**
 * Check if any Automa is configured to the given difficulty level.
 * @param difficultyLevel Difficulty level
 * @param state State
 */
export default function hasDifficultyLevel(difficultyLevel: DifficultyLevel, state: State) : boolean {
  const { botCount } = state.setup.playerSetup
  const { difficultyLevels } = state.setup
  // check only for actual bot index, array might be larger
  return difficultyLevels.slice(0, botCount).includes(difficultyLevel)
}
