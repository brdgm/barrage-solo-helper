import Expansion from '@/services/enum/Expansion'
import PlayerColor from '@/services/enum/PlayerColor'

/**
 * Check if player color is available for the selected expansions.
 * @param color Player color
 * @param expansions Selected expansions
 */
export default function isPlayerColorAvailable(color : PlayerColor, expansions: Expansion[]) : boolean {
  switch (color) {
    case PlayerColor.ORANGE:
      return expansions.includes(Expansion.LEEGHWATER_PROJECT)
    case PlayerColor.PINK:
    case PlayerColor.YELLOW:
      return expansions.includes(Expansion.FAR_COMPANIES)
    default:
      return true
  }
}