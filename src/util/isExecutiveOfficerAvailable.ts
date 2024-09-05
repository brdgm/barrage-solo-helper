import ExecutiveOfficer from '@/services/enum/ExecutiveOfficer'
import Expansion from '@/services/enum/Expansion'

/**
 * Check if executive officer is available for the selected expansions.
 * @param executiveOfficer Executive officer
 * @param expansions Selected expansions
 */
export default function isExecutiveOfficerAvailable(executiveOfficer : ExecutiveOfficer, expansions: Expansion[]) : boolean {
  switch (executiveOfficer) {
    case ExecutiveOfficer.WILHELM_ADLER:
    case ExecutiveOfficer.GRAZIANO_DEL_MONTE:
    case ExecutiveOfficer.VIKTOR_FIESLER:
    case ExecutiveOfficer.JILL_MCDOWELL:
    case ExecutiveOfficer.SOLOMON_P_JORDAN:
    case ExecutiveOfficer.ANTON_KRYLOV:
    case ExecutiveOfficer.MAHIRI_SEKIBO:
      return true
    case ExecutiveOfficer.SIMONE_LUCIANI:
    case ExecutiveOfficer.TOMMASO_BATTISTA:
    case ExecutiveOfficer.LESLIE_SPENCER:
    case ExecutiveOfficer.MARGOT_FOUCHE:
      return expansions.includes(Expansion.LEEGHWATER_PROJECT)
    case ExecutiveOfficer.ELON_AUDIA:
    case ExecutiveOfficer.GENNARO_GRASSO:
    case ExecutiveOfficer.WU_FANG:
    case ExecutiveOfficer.DR_OCTAVIUS:
    case ExecutiveOfficer.AMIR_ZAHIR:
    case ExecutiveOfficer.FRANZ_DE_LASSE:
      return expansions.includes(Expansion.EXECUTIVE_OFFICER_PROMO)
    default:
      return false
  }
}
