import { expect } from 'chai'
import PlayerColor from '@/services/enum/PlayerColor'
import isPlayerColorAvailable from '@/util/isPlayerColorAvailable'
import Expansion from '@/services/enum/Expansion'

describe('util/isPlayerColorAvailable', () => {
  it('no-expansions', () => {
    expect(isPlayerColorAvailable(PlayerColor.WHITE, [])).to.true
    expect(isPlayerColorAvailable(PlayerColor.BLACK, [])).to.true
    expect(isPlayerColorAvailable(PlayerColor.TURQUOISE, [])).to.true
    expect(isPlayerColorAvailable(PlayerColor.RED, [])).to.true
    expect(isPlayerColorAvailable(PlayerColor.ORANGE, [])).to.false
    expect(isPlayerColorAvailable(PlayerColor.PINK, [])).to.false
    expect(isPlayerColorAvailable(PlayerColor.YELLOW, [])).to.false
  })

  it('leeghwater', () => {
    expect(isPlayerColorAvailable(PlayerColor.WHITE, [Expansion.LEEGHWATER_PROJECT])).to.true
    expect(isPlayerColorAvailable(PlayerColor.BLACK, [Expansion.LEEGHWATER_PROJECT])).to.true
    expect(isPlayerColorAvailable(PlayerColor.TURQUOISE, [Expansion.LEEGHWATER_PROJECT])).to.true
    expect(isPlayerColorAvailable(PlayerColor.RED, [Expansion.LEEGHWATER_PROJECT])).to.true
    expect(isPlayerColorAvailable(PlayerColor.ORANGE, [Expansion.LEEGHWATER_PROJECT])).to.true
    expect(isPlayerColorAvailable(PlayerColor.PINK, [Expansion.LEEGHWATER_PROJECT])).to.false
    expect(isPlayerColorAvailable(PlayerColor.YELLOW, [Expansion.LEEGHWATER_PROJECT])).to.false
  })

  it('leeghwater', () => {
    expect(isPlayerColorAvailable(PlayerColor.WHITE, [Expansion.FAR_COMPANIES])).to.true
    expect(isPlayerColorAvailable(PlayerColor.BLACK, [Expansion.FAR_COMPANIES])).to.true
    expect(isPlayerColorAvailable(PlayerColor.TURQUOISE, [Expansion.FAR_COMPANIES])).to.true
    expect(isPlayerColorAvailable(PlayerColor.RED, [Expansion.FAR_COMPANIES])).to.true
    expect(isPlayerColorAvailable(PlayerColor.ORANGE, [Expansion.FAR_COMPANIES])).to.false
    expect(isPlayerColorAvailable(PlayerColor.PINK, [Expansion.FAR_COMPANIES])).to.true
    expect(isPlayerColorAvailable(PlayerColor.YELLOW, [Expansion.FAR_COMPANIES])).to.true
  })
})
