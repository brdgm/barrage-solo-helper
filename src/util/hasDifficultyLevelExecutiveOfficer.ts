import DifficultyLevel from '@/services/enum/DifficultyLevel'
import ExecutiveOfficer from '@/services/enum/ExecutiveOfficer'
import { State } from '@/store/state'

/**
 * Check if any Automa is configured to the given difficulty level and the given executive officer.
 * If checked for hard, difficulty level very hard is respected as well.
 * @param difficultyLevel Difficulty level
 * @param state State
 */
export default function hasDifficultyLevelExecutiveOfficer(difficultyLevel: DifficultyLevel,
    executiveOfficer: ExecutiveOfficer, state: State) : boolean {
  if (difficultyLevel == DifficultyLevel.HARD) {
    // playing with VeRY_HARD includes HARD mode
    return hasDifficultyLevelExecutiveOfficerInternal(DifficultyLevel.HARD, executiveOfficer, state)
        || hasDifficultyLevelExecutiveOfficerInternal(DifficultyLevel.VERY_HARD, executiveOfficer, state)
  }
  return hasDifficultyLevelExecutiveOfficerInternal(difficultyLevel, executiveOfficer, state)
}

function hasDifficultyLevelExecutiveOfficerInternal(difficultyLevel: DifficultyLevel,
    executiveOfficer: ExecutiveOfficer, state: State) : boolean {
  const { botCount } = state.setup.playerSetup
  const { difficultyLevels, botExecutiveOfficers } = state.setup

  // check only for actual bot count, array might be larger
  for (let bot = 1; bot <= botCount; bot++) {
    if (difficultyLevels[bot-1] == difficultyLevel && botExecutiveOfficers[bot-1] == executiveOfficer) {
      return true
    }
  }
  return false
}
