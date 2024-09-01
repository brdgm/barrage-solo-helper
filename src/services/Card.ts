import Action from './enum/Action'
import BasinColumn from './enum/BasinColumn'
import ConstructionType from './enum/ConstructionType'
import ContractType from './enum/ContractType'
import MachineryType from './enum/MachineryType'
import PlacingCriteriaConduit from './enum/PlacingCriteriaConduit'
import PlacingCriteriaDamElevation from './enum/PlacingCriteriaDamElevation'
import PlacingCriteriaPowerhouse from './enum/PlacingCriteriaPowerhouse'
import WaterManagementType from './enum/WaterManagementType'

export default interface Card {
  id: number
  actions: ActionItem[]
  placingCriteriaDamElevation: PlacingCriteriaDamElevation[]
  locationDamElevation: number
  placingCriteriaConduit: PlacingCriteriaConduit[]
  locationConduit: number
  locationConduitPosition: string
  placingCriteriaPowerhouse: PlacingCriteriaPowerhouse[]
  locationPowerhouse: number
  waterManagementBasinColumns: BasinColumn[]
}

export interface ActionItem {
  action: Action
  workerCount: number
  energyBoost?: number
  contractRequirement?: ContractType
  waterManagementSteps?: WaterManagementType
  contractDiscard?: ContractType
  constructionType?: ConstructionType
  hydroCost?: number
  machineryType?: MachineryType
  workshopSteps?: number
  externalWorkTiles?: number[]
}
