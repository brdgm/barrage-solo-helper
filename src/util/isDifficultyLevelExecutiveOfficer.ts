import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { State } from '@/store/state'
import isDifficultyLevel from './isDifficultyLevel'
import ExecutiveOfficer from '@/services/enum/ExecutiveOfficer'

/**
 * Check if a specific Automa is configured to the given difficulty level and has the given executive officer.
 * If checked for hard, difficulty level very hard is respected as well.
 * @param bot Bot
 * @param difficultyLevel Difficulty level
 * @param state State
 */
export default function isDifficultyLevelExecutiveOfficer(bot: number, difficultyLevel: DifficultyLevel,
    executiveOfficer: ExecutiveOfficer, state: State) : boolean {
  const { botExecutiveOfficers } = state.setup
  if (botExecutiveOfficers[bot - 1] == executiveOfficer) {
    return isDifficultyLevel(bot, difficultyLevel, state)
  }
  return false
}
