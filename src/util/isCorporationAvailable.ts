import Corporation from '@/services/enum/Corporation'
import Expansion from '@/services/enum/Expansion'

/**
 * Check if corporation is available for the selected expansions.
 * @param corporation Corporation
 * @param expansions Selected expansions
 */
export default function isCorporationAvailable(corporation : Corporation, expansions: Expansion[]) : boolean {
  switch (corporation) {
    case Corporation.USA:
    case Corporation.GERMANY:
    case Corporation.ITALY:
    case Corporation.FRANCE:
      return true
    case Corporation.NETHERLANDS:
      return expansions.includes(Expansion.LEEGHWATER_PROJECT)
    default:
      return false
  }
}
