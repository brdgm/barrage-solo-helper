import { expect } from 'chai'
import Expansion from '@/services/enum/Expansion'
import isCorporationAvailable from '@/util/isCorporationAvailable'
import Corporation from '@/services/enum/Corporation'

describe('util/isCorporationAvailable', () => {
  it('no-expansions', () => {
    expect(isCorporationAvailable(Corporation.USA, [])).to.true
    expect(isCorporationAvailable(Corporation.NETHERLANDS, [])).to.false
  })

  it('leeghwater', () => {
    expect(isCorporationAvailable(Corporation.USA, [Expansion.LEEGHWATER_PROJECT])).to.true
    expect(isCorporationAvailable(Corporation.NETHERLANDS, [Expansion.LEEGHWATER_PROJECT])).to.true
  })
})
