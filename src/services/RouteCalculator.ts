import { State } from '@/store/state'
import getTurnOrder, { MAX_TURN } from '@/util/getTurnOrder'

/**
 * Calculate routes for next/back respecting "passed" state of players/bots.
 */
export default class RouteCalculator {

  readonly round : number
  readonly turn : number
  readonly action? : number
  readonly workerUsedPreviousAction? : number
  readonly player? : number
  readonly bot? : number

  constructor(params:{round: number, turn?: number, action?: number, workerUsedPreviousAction?: number, player?: number, bot?: number}) {
    this.round = params.round
    this.turn = params.turn ?? MAX_TURN  // when called in EndOfRound/EndOfGame context
    this.action = params.action
    this.workerUsedPreviousAction = params.workerUsedPreviousAction
    this.player = params.player
    this.bot = params.bot
  }

  /**
   * Get route to next step in round.
   * If all have passed, returns route to round end/game end.
   */
  public getNextRouteTo(state: State) : string {
    const steps = getTurnOrder(state, this.round, this.turn)
    const currentStepIndex = steps.findIndex(item => item.round==this.round && item.turn==this.turn
        && item.player==this.player && item.bot==this.bot)
    if (currentStepIndex < 0) {
      return ''
    }
    const nextStep = steps[currentStepIndex+1]
    if (!nextStep) {
      if (this.round == 7) {
        return `/endOfGame`
      }
      else {
        return `/round/${this.round}/end`
      }
    }
    return RouteCalculator.routeTo(nextStep)
  }

  /**
   * Get route to next action ins same bot turn.
   */
  public getNextActionRouteTo(workerUsedPreviousAction? : number) : string {
    return RouteCalculator.routeTo({round:this.round, turn:this.turn, action:(this.action ?? 0) + 1,
        workerUsedPreviousAction:workerUsedPreviousAction ?? this.workerUsedPreviousAction, bot:this.bot})
  }

  /**
   * Get route to previous step in round.
   * If this is the first turn in round, returns route to end of previous round (or empty route in first round).
   */
  public getBackRouteTo(state: State) : string {
    if (this.bot && this.action && this.action > 0) {
      return RouteCalculator.routeTo({round:this.round, turn:this.turn, action:(this.action ?? 0) - 1,
          workerUsedPreviousAction:this.workerUsedPreviousAction, bot:this.bot})
    }
    const steps = getTurnOrder(state, this.round, this.turn)
    const currentStepIndex = steps.findIndex(item => item.round==this.round && item.turn==this.turn
        && item.player==this.player && item.bot==this.bot)
    if (currentStepIndex < 0) {
      return ''
    }
    const previousStep = steps[currentStepIndex-1]
    if (!previousStep) {
      return `/round/${this.round}/start`
    }
    return RouteCalculator.routeTo(previousStep)
  }

  /**
   * Get route to last turn in round (or empty route if no turn exist).
   */
  public getFirstTurnRouteTo(state: State) : string {
    const steps = getTurnOrder(state, this.round, 1)
    return RouteCalculator.routeTo(steps[0])
  }

  /**
   * Get route to last turn in round (or empty route if no turn exist).
   */
  public getLastTurnRouteTo(state: State) : string {
    const steps = getTurnOrder(state, this.round, this.turn)
    const lastStep = steps[steps.length-1]
    if (lastStep) {
      return RouteCalculator.routeTo(lastStep)
    }
    else {
      return ''
    }
  }

  /**
   * Build route to player/bot step
   */
  private static routeTo(step: Step) : string {
    if (step.bot) {
      if (step.action && step.action > 0) {
        if (step.workerUsedPreviousAction && step.workerUsedPreviousAction > 0 && step.action > 1) {
          return `/round/${step.round}/turn/${step.turn}/bot/${step.bot}/action/${step.action}/worker/${step.workerUsedPreviousAction}`
        }
        return `/round/${step.round}/turn/${step.turn}/bot/${step.bot}/action/${step.action}`
      }
      return `/round/${step.round}/turn/${step.turn}/bot/${step.bot}`
    }
    return `/round/${step.round}/turn/${step.turn}/player/${step.player}`
  }

}

interface Step {
  readonly round?: number
  readonly turn?: number
  readonly action?: number
  readonly workerUsedPreviousAction?: number
  readonly player?: number
  readonly bot?: number
}
