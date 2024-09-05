import { State } from '@/store/state'
import Card, { ActionItem } from './Card'
import Expansion from './enum/Expansion'
import Action from './enum/Action'
import ConstructionType from './enum/ConstructionType'
import isDifficultyLevelExecutiveOfficer from '@/util/isDifficultyLevelExecutiveOfficer'
import DifficultyLevel from './enum/DifficultyLevel'
import ExecutiveOfficer from './enum/ExecutiveOfficer'

/**
 * Manages the Automa actions.
 */
export default class BotActions {

  private _items : ActionItem[]
  
  public constructor(actionCard : Card, round: number, bot: number, state: State) {
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
    // reorder actions for Grennaro Grasso: 2nd column first, then 1st column, then the rest
    if (isVeryHardDifficultyGennaroGrasso(bot, state)) {
      this._items = [
        ...this._items.filter(item => isSecondColumnAction(item)),
        ...this._items.filter(item => isFirstColumnAction(item)),
        ...this._items.filter(item => !(isFirstColumnAction(item) || isSecondColumnAction(item)))
      ]
    }
  }

  public get items() : readonly ActionItem[] {
    return this._items
  }

  public get(action: number) : ActionItem|undefined {
    return this.items[action]
  }

}

function isVeryHardDifficultyGennaroGrasso(bot: number, state: State) : boolean {
  return isDifficultyLevelExecutiveOfficer(bot, DifficultyLevel.VERY_HARD, ExecutiveOfficer.GENNARO_GRASSO, state)
}
function isFirstColumnAction(item: ActionItem) : boolean {
  return [Action.PRODUCTION,Action.WATER_MANAGEMENT,Action.CONTRACT_OFFICE].includes(item.action)
}
function isSecondColumnAction(item: ActionItem) : boolean {
  return item.action == Action.CONSTRUCTION
}
