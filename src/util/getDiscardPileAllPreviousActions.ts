import { ActionItem } from '@/services/Card'
import CardDeck from '@/services/CardDeck'

/**
 * Go through all cards in discard pile starting with the latest one, and then all cards in the deck, and collect all actions from all cards.
 * Do not change the state of the card deck. This is used to get tiebreak for special actions e.g. for XOs not resulting from an actual card action.
 * @param cardDeck Card deck
 * @returns All Actions from all cards in a flat list
 */
export default function getDiscardPileAllPreviousActions(cardDeck: CardDeck) : ActionItem[] {
  const allCards = [...cardDeck.discard,...cardDeck.pile]
  return allCards.flatMap(card => card.actions)
}
