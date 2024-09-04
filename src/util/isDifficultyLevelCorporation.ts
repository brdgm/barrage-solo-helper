import Corporation from '@/services/enum/Corporation'
import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { State } from '@/store/state'
import isDifficultyLevel from './isDifficultyLevel'

/**
 * Check if a specific Automa is configured to the given difficulty level and has the given corporation.
 * If checked for hard, difficulty level very hard is respected as well.
 * @param bot Bot
 * @param difficultyLevel Difficulty level
 * @param state State
 */
export default function isDifficultyLevelCorporation(bot: number, difficultyLevel: DifficultyLevel, corporation: Corporation, state: State) : boolean {
  const { botCorporations } = state.setup
  if (botCorporations[bot - 1] == corporation) {
    return isDifficultyLevel(bot, difficultyLevel, state)
  }
  return false
}
