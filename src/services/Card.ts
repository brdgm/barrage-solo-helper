import Action from './enum/Action'
import BasinColumn from './enum/BasinColumn'
import BuildingSearchDirection from './enum/BuildingSearchDirection'
import ConduitPosition from './enum/ConduitPosition'
import ConstructionType from './enum/ConstructionType'
import ContractType from './enum/ContractType'
import MachineryType from './enum/MachineryType'
import PlacingCriteriaConduit from './enum/PlacingCriteriaConduit'
import PlacingCriteriaDamElevation from './enum/PlacingCriteriaDamElevation'
import PlacingCriteriaPowerhouse from './enum/PlacingCriteriaPowerhouse'
import Region from './enum/Region'
import WaterManagementType from './enum/WaterManagementType'

export default interface Card {
  id: string
  actions: ActionItem[]
  placingCriteriaDamElevation: PlacingCriteriaDamElevation[]
  locationDamElevation: number
  placingCriteriaConduit: PlacingCriteriaConduit[]
  locationConduit: number
  locationConduitPosition: ConduitPosition
  placingCriteriaPowerhouse: PlacingCriteriaPowerhouse[]
  locationPowerhouse: number
  waterManagementBasinColumns: BasinColumn[]
}

export interface ActionItem {
  action: Action
  workerCount: number
  energyBoost?: number
  contractRequirement?: ContractType
  waterManagementType?: WaterManagementType
  contractDiscard?: ContractType
  constructionType?: ConstructionType
  constructionRegion?: Region
  conduitMinProductionValue?: number
  buildingSearchDirection?: BuildingSearchDirection
  hydroCost?: number
  machineryTypes?: MachineryType[]
  workshopSteps?: number
  externalWorkTiles?: number[]
  nextAction?: boolean
}
