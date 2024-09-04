import { State } from '@/store/state'
import Card, { ActionItem } from './Card'
import Expansion from './enum/Expansion'
import Action from './enum/Action'
import ConstructionType from './enum/ConstructionType'

/**
 * Manages the Automa actions.
 */
export default class BotActions {

  private _items : ActionItem[]
  
  public constructor(actionCard : Card, round: number, state: State) {
    const hasLeeghwaterProject = state.setup.expansions.includes(Expansion.LEEGHWATER_PROJECT)
    if (hasLeeghwaterProject) {
      this._items = actionCard.actions
    }
    else {
      // filter out actions that only apply to the expansion
      this._items = actionCard.actions
          .filter(item => item.action != Action.EXTERNAL_WORK)
          .filter(item => item.constructionType != ConstructionType.BUILDING)
    }
    // no more machinery shop actions in round 5
    if (round == 5) {
      this._items = this._items.filter(item => item.action != Action.MACHINERY_SHOP)
    }
  }

  public get items() : readonly ActionItem[] {
    return this._items
  }

  public get(action: number) : ActionItem|undefined {
    return this.items[action]
  }

}
