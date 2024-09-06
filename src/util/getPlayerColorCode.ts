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
      return "#339999"
    case PlayerColor.RED:
      return "#cc3366"
    case PlayerColor.ORANGE:
      return "#ff6633"
    case PlayerColor.PINK:
      return "#ff99cc"
    case PlayerColor.YELLOW:
      return "#ffcc33"
    default:
      throw new Error(`Invalid player color: ${playerColor}.`)
  }
}
