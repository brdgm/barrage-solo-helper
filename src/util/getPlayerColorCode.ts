import PlayerColor from '@/services/enum/PlayerColor'

/**
 * Get color code for player color.
 * @param playerColor Player color
 * @returns Color code
 */
export default function getPlayerColorCode(playerColor: PlayerColor) : string {
  switch (playerColor) {
    case PlayerColor.WHITE:
      return "#e6e7e8"
    case PlayerColor.BLACK:
      return "#3a3a3a"
    case PlayerColor.TURQUOISE:
      return "#1a7077"
    case PlayerColor.RED:
      return "#af2a4b"
    case PlayerColor.ORANGE:
      return "#de761f"
    case PlayerColor.PINK:
      return "#ea8fb6"
    case PlayerColor.YELLOW:
      return "#ebb51d"
    default:
      throw new Error(`Invalid player color: ${playerColor}.`)
  }
}
