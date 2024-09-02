import ExecutiveOfficer from '@/services/enum/ExecutiveOfficer'
import Expansion from '@/services/enum/Expansion'

/**
 * Check if executive officer is available for the selected expansions.
 * @param executiveOfficer Executive officer
 * @param expansions Selected expansions
 */
export default function isExecutiveOfficerAvailable(executiveOfficer : ExecutiveOfficer, expansions: Expansion[]) : boolean {
  switch (executiveOfficer) {
    case ExecutiveOfficer.LESLIE_SPENCER:
    case ExecutiveOfficer.MARGOT_FOUCHE:
    case ExecutiveOfficer.SIMONE_LUCIANI:
    case ExecutiveOfficer.TOMMASO_BATTISTA:
      return expansions.includes(Expansion.LEEGHWATER_PROJECT)
    default:
      return true
  }
}
