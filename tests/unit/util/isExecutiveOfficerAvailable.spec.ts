import { expect } from 'chai'
import Expansion from '@/services/enum/Expansion'
import isExecutiveOfficerAvailable from '@/util/isExecutiveOfficerAvailable'
import ExecutiveOfficer from '@/services/enum/ExecutiveOfficer'

describe('util/isExecutiveOfficerAvailable', () => {
  it('no-expansions', () => {
    expect(isExecutiveOfficerAvailable(ExecutiveOfficer.WILHELM_ADLER, [])).to.true
    expect(isExecutiveOfficerAvailable(ExecutiveOfficer.SIMONE_LUCIANI, [])).to.false
  })

  it('leeghwater', () => {
    expect(isExecutiveOfficerAvailable(ExecutiveOfficer.WILHELM_ADLER, [Expansion.LEEGHWATER_PROJECT])).to.true
    expect(isExecutiveOfficerAvailable(ExecutiveOfficer.SIMONE_LUCIANI, [Expansion.LEEGHWATER_PROJECT])).to.true
  })
})
