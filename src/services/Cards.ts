import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import Action from './enum/Action'

/**
 * Automa cards.
 */
const cards : Card[] = [
  {
    id: 1,
    action: Action.EXPLORE
  },
]

const cardsMap = new Map<number,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: number) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @returns Cards
   */
  getAll() : Card[] {
    return cards
  }

}
