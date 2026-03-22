import { expect } from 'chai'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import PlayerColor from '@/services/enum/PlayerColor'
import getPlayerColorCode from '@/util/getPlayerColorCode'

describe('util/getPlayerColorCode', () => {
  it('getPlayerColorCode', () => {
    for (const playerColor of getAllEnumValues(PlayerColor)) {
      expect(getPlayerColorCode(playerColor)).not.undefined
    }
  })
})
