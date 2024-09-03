import findMandatory from '@brdgm/brdgm-commons/src/util/map/findMandatory'
import Card from './Card'
import Action from './enum/Action'
import ContractType from './enum/ContractType'
import ConstructionType from './enum/ConstructionType'
import BuildingSearchDirection from './enum/BuildingSearchDirection'
import MachineryType from './enum/MachineryType'
import PlacingCriteriaDamElevation from './enum/PlacingCriteriaDamElevation'
import PlacingCriteriaConduit from './enum/PlacingCriteriaConduit'
import ConduitPosition from './enum/ConduitPosition'
import PlacingCriteriaPowerhouse from './enum/PlacingCriteriaPowerhouse'
import BasinColumn from './enum/BasinColumn'
import WaterManagementType from './enum/WaterManagementType'
import Region from './enum/Region'

/**
 * Automa cards.
 */
const cards : Card[] = [
  {
    id: '5-10A-12',
    actions: [
      {
        action: Action.PRODUCTION,
        workerCount: 2,
        energyBoost: 2,
        contractRequirement: ContractType.YELLOW
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.CONDUIT
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 1,
        constructionType: ConstructionType.BUILDING,
        buildingSearchDirection: BuildingSearchDirection.UP
      },
      {
        action: Action.PATENT_OFFICE,
        workerCount: 1,
        hydroCost: 2,
        constructionType: ConstructionType.BUILDING
      },
      {
        action: Action.MACHINERY_SHOP,
        workerCount: 2,
        hydroCost: 5,
        machineryTypes: [MachineryType.EXCAVATOR, MachineryType.MIXER]
      },
      {
        action: Action.WORKSHOP,
        workerCount: 1,
        workshopSteps: 1
      },
      {
        action: Action.BANK,
        workerCount: 1
      }
    ],
    placingCriteriaDamElevation: [
      PlacingCriteriaDamElevation.UPSTREAM_POWERHOUSE,
      PlacingCriteriaDamElevation.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaDamElevation.MOST_WATER_DROPS
    ],
    locationDamElevation: 5,
    placingCriteriaConduit: [
      PlacingCriteriaConduit.SECOND_MOST_POWERFUL,
      PlacingCriteriaConduit.OWNED_OPPONENT_POWERHOUSE,
      PlacingCriteriaConduit.OWNED_NEUTRAL_OPPONENT_DAM
    ],
    locationConduit: 10,
    locationConduitPosition: ConduitPosition.LEFT,
    placingCriteriaPowerhouse: [
      PlacingCriteriaPowerhouse.OWNED_DAM,
      PlacingCriteriaPowerhouse.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaPowerhouse.FEEDING_OWNED_DAM
    ],
    locationPowerhouse: 12,
    waterManagementBasinColumns: [
      BasinColumn.C,
      BasinColumn.D,
      BasinColumn.A
    ]
  },
  {
    id: '5-9A-8',
    actions: [
      {
        action: Action.PRODUCTION,
        workerCount: 2,
        energyBoost: 2,
        contractRequirement: ContractType.GREEN
      },
      {
        action: Action.WATER_MANAGEMENT,
        workerCount: 1,
        waterManagementType: WaterManagementType.TWO_DROPS,
        nextAction: true
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.DAM
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 1,
        constructionType: ConstructionType.BUILDING,
        buildingSearchDirection: BuildingSearchDirection.DOWN
      },
      {
        action: Action.WORKSHOP,
        workerCount: 1
      },
      {
        action: Action.MACHINERY_SHOP,
        workerCount: 1,
        hydroCost: 3,
        machineryTypes: [MachineryType.WILD]
      },
      {
        action: Action.BANK,
        workerCount: 1
      }
    ],
    placingCriteriaDamElevation: [
      PlacingCriteriaDamElevation.UPSTREAM_POWERHOUSE,
      PlacingCriteriaDamElevation.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaDamElevation.RED_OUTLINE_SPACE    ],
    locationDamElevation: 5,
    placingCriteriaConduit: [
      PlacingCriteriaConduit.SECOND_MOST_POWERFUL,
      PlacingCriteriaConduit.OWNED_NEUTRAL_OPPONENT_DAM,
      PlacingCriteriaConduit.OWNED_OPPONENT_POWERHOUSE
    ],
    locationConduit: 9,
    locationConduitPosition: ConduitPosition.LEFT,
    placingCriteriaPowerhouse: [
      PlacingCriteriaPowerhouse.OWNED_DAM,
      PlacingCriteriaPowerhouse.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaPowerhouse.FEEDING_OWNED_DAM
    ],
    locationPowerhouse: 8,
    waterManagementBasinColumns: [
      BasinColumn.A,
      BasinColumn.B,
      BasinColumn.C
    ]
  },
  {
    id: '3-6A-9',
    actions: [
      {
        action: Action.PRODUCTION,
        workerCount: 2,
        energyBoost: 1,
        contractRequirement: ContractType.GREEN
      },
      {
        action: Action.CONTRACT_OFFICE,
        workerCount: 1,
        contractDiscard: ContractType.GREEN,
        nextAction: true
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.CONDUIT
      },
      {
        action: Action.PATENT_OFFICE,
        workerCount: 1,
        hydroCost: 2,
        constructionType: ConstructionType.CONDUIT
      },
      {
        action: Action.EXTERNAL_WORK,
        workerCount: 2,
        externalWorkTiles: [2, 3, 1]
      },
      {
        action: Action.WORKSHOP,
        workerCount: 1,
        workshopSteps: 1
      },
      {
        action: Action.BANK,
        workerCount: 1
      }
    ],
    placingCriteriaDamElevation: [
      PlacingCriteriaDamElevation.DOWNSTREAM_DAM,
      PlacingCriteriaDamElevation.OWNED_POWERHOUSE,
      PlacingCriteriaDamElevation.MOST_POWERFUL_CONDUIT
    ],
    locationDamElevation: 3,
    placingCriteriaConduit: [
      PlacingCriteriaConduit.OWNED_NEUTRAL_OPPONENT_DAM,
      PlacingCriteriaConduit.OWNED_OPPONENT_POWERHOUSE,
      PlacingCriteriaConduit.MOST_POWERFUL
    ],
    locationConduit: 6,
    locationConduitPosition: ConduitPosition.LEFT,
    placingCriteriaPowerhouse: [
      PlacingCriteriaPowerhouse.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaPowerhouse.OWNED_DAM,
      PlacingCriteriaPowerhouse.FEEDING_OWNED_DAM
    ],
    locationPowerhouse: 9,
    waterManagementBasinColumns: [
      BasinColumn.C,
      BasinColumn.D,
      BasinColumn.A
    ]
  },
  {
    id: '6-3A-5',
    actions: [
      {
        action: Action.PRODUCTION,
        workerCount: 2,
        contractRequirement: ContractType.GREEN
      },
      {
        action: Action.WATER_MANAGEMENT,
        workerCount: 1,
        waterManagementType: WaterManagementType.TWO_DROPS,
        nextAction: true
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.ELEVATION
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.CONDUIT
      },
      {
        action: Action.WORKSHOP,
        workerCount: 2,
        hydroCost: 5,
        workshopSteps: 3
      },
      {
        action: Action.EXTERNAL_WORK,
        workerCount: 2,
        externalWorkTiles: [2, 3, 1]
      },
      {
        action: Action.MACHINERY_SHOP,
        workerCount: 1,
        hydroCost: 3,
        machineryTypes: [MachineryType.WILD]
      },
      {
        action: Action.BANK,
        workerCount: 1
      }
    ],
    placingCriteriaDamElevation: [
      PlacingCriteriaDamElevation.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaDamElevation.OWNED_POWERHOUSE,
      PlacingCriteriaDamElevation.UPSTREAM_POWERHOUSE
    ],
    locationDamElevation: 6,
    placingCriteriaConduit: [
      PlacingCriteriaConduit.OWNED_OPPONENT_POWERHOUSE,
      PlacingCriteriaConduit.OWNED_NEUTRAL_OPPONENT_DAM,
      PlacingCriteriaConduit.MOST_POWERFUL
    ],
    locationConduit: 3,
    locationConduitPosition: ConduitPosition.LEFT,
    placingCriteriaPowerhouse: [
      PlacingCriteriaPowerhouse.HILLS_BASIN_5,
      PlacingCriteriaPowerhouse.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaPowerhouse.OWNED_DAM
    ],
    locationPowerhouse: 6,
    waterManagementBasinColumns: [
      BasinColumn.D,
      BasinColumn.C,
      BasinColumn.B
    ]
  },
  {
    id: '7-3B-6',
    actions: [
      {
        action: Action.PRODUCTION,
        workerCount: 2,
        contractRequirement: ContractType.GREEN
      },
      {
        action: Action.WATER_MANAGEMENT,
        workerCount: 1,
        waterManagementType: WaterManagementType.ONE_DROP_IMMEDIATELY,
        nextAction: true
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.ELEVATION
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.DAM
      },
      {
        action: Action.EXTERNAL_WORK,
        workerCount: 2,
        externalWorkTiles: [3, 2, 1]
      },
      {
        action: Action.WORKSHOP,
        workerCount: 1,
        workshopSteps: 1
      },
      {
        action: Action.MACHINERY_SHOP,
        workerCount: 1,
        hydroCost: 3,
        machineryTypes: [MachineryType.WILD]
      },
      {
        action: Action.BANK,
        workerCount: 1
      }
    ],
    placingCriteriaDamElevation: [
      PlacingCriteriaDamElevation.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaDamElevation.OWNED_POWERHOUSE,
      PlacingCriteriaDamElevation.RED_OUTLINE_SPACE
    ],
    locationDamElevation: 7,
    placingCriteriaConduit: [
      PlacingCriteriaConduit.OWNED_OPPONENT_POWERHOUSE,
      PlacingCriteriaConduit.OWNED_NEUTRAL_OPPONENT_DAM,
      PlacingCriteriaConduit.MOST_POWERFUL
    ],
    locationConduit: 3,
    locationConduitPosition: ConduitPosition.RIGHT,
    placingCriteriaPowerhouse: [
      PlacingCriteriaPowerhouse.HILLS_BASIN_6,
      PlacingCriteriaPowerhouse.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaPowerhouse.OWNED_DAM
    ],
    locationPowerhouse: 6,
    waterManagementBasinColumns: [
      BasinColumn.C,
      BasinColumn.B,
      BasinColumn.A
    ]
  },
  {
    id: '10-10B-12',
    actions: [
      {
        action: Action.PRODUCTION,
        workerCount: 2,
        energyBoost: 2,
        contractRequirement: ContractType.GREEN
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.POWERHOUSE
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 1,
        constructionType: ConstructionType.BUILDING,
        buildingSearchDirection: BuildingSearchDirection.UP
      },
      {
        action: Action.MACHINERY_SHOP,
        workerCount: 2,
        hydroCost: 5,
        machineryTypes: [MachineryType.EXCAVATOR, MachineryType.MIXER]
      },
      {
        action: Action.EXTERNAL_WORK,
        workerCount: 2,
        externalWorkTiles: [2, 3, 1]
      },
      {
        action: Action.WORKSHOP,
        workerCount: 1,
        workshopSteps: 1
      },
      {
        action: Action.BANK,
        workerCount: 1
      }
    ],
    placingCriteriaDamElevation: [
      PlacingCriteriaDamElevation.UPSTREAM_POWERHOUSE,
      PlacingCriteriaDamElevation.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaDamElevation.MOST_WATER_DROPS
    ],
    locationDamElevation: 10,
    placingCriteriaConduit: [
      PlacingCriteriaConduit.SECOND_MOST_POWERFUL,
      PlacingCriteriaConduit.OWNED_OPPONENT_POWERHOUSE,
      PlacingCriteriaConduit.OWNED_NEUTRAL_OPPONENT_DAM
    ],
    locationConduit: 10,
    locationConduitPosition: ConduitPosition.RIGHT,
    placingCriteriaPowerhouse: [
      PlacingCriteriaPowerhouse.OWNED_DAM,
      PlacingCriteriaPowerhouse.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaPowerhouse.FEEDING_OWNED_DAM
    ],
    locationPowerhouse: 12,
    waterManagementBasinColumns: [
      BasinColumn.D,
      BasinColumn.A,
      BasinColumn.B
    ]
  },
  {
    id: '3-2A-7',
    actions: [
      {
        action: Action.PRODUCTION,
        workerCount: 1,
        energyBoost: 1,
        contractRequirement: ContractType.GREEN
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.DAM
      },
      {
        action: Action.PATENT_OFFICE,
        workerCount: 1,
        hydroCost: 2,
        constructionType: ConstructionType.DAM
      },
      {
        action: Action.EXTERNAL_WORK,
        workerCount: 2,
        externalWorkTiles: [3, 2, 1]
      },
      {
        action: Action.WORKSHOP,
        workerCount: 1,
        workshopSteps: 1
      },
      {
        action: Action.BANK,
        workerCount: 1
      }
    ],
    placingCriteriaDamElevation: [
      PlacingCriteriaDamElevation.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaDamElevation.OWNED_POWERHOUSE,
      PlacingCriteriaDamElevation.DOWNSTREAM_DAM
    ],
    locationDamElevation: 3,
    placingCriteriaConduit: [
      PlacingCriteriaConduit.MOST_POWERFUL,
      PlacingCriteriaConduit.OWNED_OPPONENT_POWERHOUSE,
      PlacingCriteriaConduit.OWNED_NEUTRAL_OPPONENT_DAM
    ],
    locationConduit: 2,
    locationConduitPosition: ConduitPosition.LEFT,
    placingCriteriaPowerhouse: [
      PlacingCriteriaPowerhouse.NOT_FEEDING_OPPONENT_DAM,
      PlacingCriteriaPowerhouse.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaPowerhouse.OWNED_DAM
    ],
    locationPowerhouse: 7,
    waterManagementBasinColumns: [
      BasinColumn.C,
      BasinColumn.D,
      BasinColumn.A
    ]
  },
  {
    id: '6-7A-10',
    actions: [
      {
        action: Action.PRODUCTION,
        workerCount: 2,
        energyBoost: 1,
        contractRequirement: ContractType.YELLOW
      },
      {
        action: Action.WATER_MANAGEMENT,
        workerCount: 1,
        waterManagementType: WaterManagementType.TWO_DROPS,
        nextAction: true
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.POWERHOUSE
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.DAM
      },
      {
        action: Action.WORKSHOP,
        workerCount: 1,
        workshopSteps: 1
      },
      {
        action: Action.EXTERNAL_WORK,
        workerCount: 2,
        externalWorkTiles: [1, 2, 3]
      },
      {
        action: Action.MACHINERY_SHOP,
        workerCount: 1,
        hydroCost: 3,
        machineryTypes: [MachineryType.WILD]
      },
      {
        action: Action.BANK,
        workerCount: 1
      }
    ],
    placingCriteriaDamElevation: [
      PlacingCriteriaDamElevation.RED_OUTLINE_SPACE,
      PlacingCriteriaDamElevation.OWNED_POWERHOUSE,
      PlacingCriteriaDamElevation.MOST_POWERFUL_CONDUIT
    ],
    locationDamElevation: 6,
    placingCriteriaConduit: [
      PlacingCriteriaConduit.OPPONENT_NEUTRAL_OWNED_DAM,
      PlacingCriteriaConduit.SECOND_MOST_POWERFUL,
      PlacingCriteriaConduit.OWNED_OPPONENT_POWERHOUSE
    ],
    locationConduit: 7,
    locationConduitPosition: ConduitPosition.LEFT,
    placingCriteriaPowerhouse: [
      PlacingCriteriaPowerhouse.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaPowerhouse.OWNED_DAM,
      PlacingCriteriaPowerhouse.FEEDING_OWNED_DAM
    ],
    locationPowerhouse: 10,
    waterManagementBasinColumns: [
      BasinColumn.D,
      BasinColumn.C,
      BasinColumn.B
    ]
  },
  {
    id: '2-1B-6',
    actions: [
      {
        action: Action.PRODUCTION,
        workerCount: 1,
        energyBoost: 2,
        contractRequirement: ContractType.GREEN
      },
      {
        action: Action.WATER_MANAGEMENT,
        workerCount: 1,
        waterManagementType: WaterManagementType.ONE_DROP_IMMEDIATELY,
        nextAction: true
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.DAM,
        constructionRegion: Region.HILLS
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.POWERHOUSE
      },
      {
        action: Action.WORKSHOP,
        workerCount: 1,
        hydroCost: 2,
        workshopSteps: 2
      },
      {
        action: Action.EXTERNAL_WORK,
        workerCount: 2,
        externalWorkTiles: [2, 3, 1]
      },
      {
        action: Action.MACHINERY_SHOP,
        workerCount: 1,
        hydroCost: 3,
        machineryTypes: [MachineryType.WILD]
      },
      {
        action: Action.BANK,
        workerCount: 1
      }
    ],
    placingCriteriaDamElevation: [
      PlacingCriteriaDamElevation.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaDamElevation.OWNED_POWERHOUSE,
      PlacingCriteriaDamElevation.RED_OUTLINE_SPACE
    ],
    locationDamElevation: 2,
    placingCriteriaConduit: [
      PlacingCriteriaConduit.MOST_POWERFUL,
      PlacingCriteriaConduit.OWNED_NEUTRAL_OPPONENT_DAM,
      PlacingCriteriaConduit.OWNED_OPPONENT_POWERHOUSE
    ],
    locationConduit: 1,
    locationConduitPosition: ConduitPosition.RIGHT,
    placingCriteriaPowerhouse: [
      PlacingCriteriaPowerhouse.FEEDING_OWNED_DAM,
      PlacingCriteriaPowerhouse.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaPowerhouse.OWNED_DAM
    ],
    locationPowerhouse: 6,
    waterManagementBasinColumns: [
      BasinColumn.B,
      BasinColumn.C,
      BasinColumn.D
    ]
  },
  {
    id: '4-6B-10',
    actions: [
      {
        action: Action.PRODUCTION,
        workerCount: 2,
        contractRequirement: ContractType.RED
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.CONDUIT,
        conduitMinProductionValue: 4
      },
      {
        action: Action.MACHINERY_SHOP,
        workerCount: 2,
        hydroCost: 4,
        machineryTypes: [MachineryType.EXCAVATOR, MachineryType.EXCAVATOR]
      },
      {
        action: Action.EXTERNAL_WORK,
        workerCount: 2,
        externalWorkTiles: [3, 2, 1]
      },
      {
        action: Action.WORKSHOP,
        workerCount: 1,
        workshopSteps: 1
      },
      {
        action: Action.BANK,
        workerCount: 1
      }
    ],
    placingCriteriaDamElevation: [
      PlacingCriteriaDamElevation.DOWNSTREAM_DAM,
      PlacingCriteriaDamElevation.OWNED_POWERHOUSE,
      PlacingCriteriaDamElevation.MOST_POWERFUL_CONDUIT
    ],
    locationDamElevation: 4,
    placingCriteriaConduit: [
      PlacingCriteriaConduit.OWNED_NEUTRAL_OPPONENT_DAM,
      PlacingCriteriaConduit.OWNED_OPPONENT_POWERHOUSE,
      PlacingCriteriaConduit.MOST_POWERFUL
    ],
    locationConduit: 6,
    locationConduitPosition: ConduitPosition.RIGHT,
    placingCriteriaPowerhouse: [
      PlacingCriteriaPowerhouse.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaPowerhouse.OWNED_DAM,
      PlacingCriteriaPowerhouse.FEEDING_OWNED_DAM
    ],
    locationPowerhouse: 10,
    waterManagementBasinColumns: [
      BasinColumn.D,
      BasinColumn.A,
      BasinColumn.B
    ]
  },
  {
    id: '9-4B-12',
    actions: [
      {
        action: Action.PRODUCTION,
        workerCount: 2,
        contractRequirement: ContractType.YELLOW
      },
      {
        action: Action.CONTRACT_OFFICE,
        workerCount: 1,
        contractDiscard: ContractType.YELLOW,
        nextAction: true
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.ELEVATION
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.POWERHOUSE
      },
      {
        action: Action.MACHINERY_SHOP,
        workerCount: 1,
        hydroCost: 3,
        machineryTypes: [MachineryType.MIXER]
      },
      {
        action: Action.EXTERNAL_WORK,
        workerCount: 2,
        externalWorkTiles: [2, 3, 1]
      },
      {
        action: Action.WORKSHOP,
        workerCount: 1,
        workshopSteps: 1
      },
      {
        action: Action.BANK,
        workerCount: 1
      }
    ],
    placingCriteriaDamElevation: [
      PlacingCriteriaDamElevation.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaDamElevation.OWNED_POWERHOUSE,
      PlacingCriteriaDamElevation.MOST_WATER_DROPS
    ],
    locationDamElevation: 9,
    placingCriteriaConduit: [
      PlacingCriteriaConduit.OWNED_OPPONENT_POWERHOUSE,
      PlacingCriteriaConduit.OWNED_NEUTRAL_OPPONENT_DAM,
      PlacingCriteriaConduit.MOST_POWERFUL
    ],
    locationConduit: 4,
    locationConduitPosition: ConduitPosition.RIGHT,
    placingCriteriaPowerhouse: [
      PlacingCriteriaPowerhouse.PLAINS,
      PlacingCriteriaPowerhouse.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaPowerhouse.OWNED_DAM
    ],
    locationPowerhouse: 12,
    waterManagementBasinColumns: [
      BasinColumn.C,
      BasinColumn.B,
      BasinColumn.A
    ]
  },
  {
    id: '9-8B-12',
    actions: [
      {
        action: Action.PRODUCTION,
        workerCount: 2,
        contractRequirement: ContractType.RED
      },
      {
        action: Action.CONTRACT_OFFICE,
        workerCount: 1,
        contractDiscard: ContractType.RED,
        nextAction: true
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.POWERHOUSE
      },
      {
        action: Action.MACHINERY_SHOP,
        workerCount: 1,
        hydroCost: 3,
        machineryTypes: [MachineryType.MIXER]
      },
      {
        action: Action.EXTERNAL_WORK,
        workerCount: 2,
        externalWorkTiles: [1, 2, 3]
      },
      {
        action: Action.WORKSHOP,
        workerCount: 1,
        workshopSteps: 1
      },
      {
        action: Action.BANK,
        workerCount: 1
      }
    ],
    placingCriteriaDamElevation: [
      PlacingCriteriaDamElevation.MOST_WATER_DROPS,
      PlacingCriteriaDamElevation.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaDamElevation.OWNED_POWERHOUSE
    ],
    locationDamElevation: 9,
    placingCriteriaConduit: [
      PlacingCriteriaConduit.OPPONENT_OWNED_POWERHOUSE,
      PlacingCriteriaConduit.SECOND_MOST_POWERFUL,
      PlacingCriteriaConduit.OPPONENT_NEUTRAL_OWNED_DAM
    ],
    locationConduit: 8,
    locationConduitPosition: ConduitPosition.RIGHT,
    placingCriteriaPowerhouse: [
      PlacingCriteriaPowerhouse.OWNED_DAM,
      PlacingCriteriaPowerhouse.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaPowerhouse.FEEDING_OWNED_DAM
    ],
    locationPowerhouse: 12,
    waterManagementBasinColumns: [
      BasinColumn.C,
      BasinColumn.B,
      BasinColumn.A
    ]
  },
  {
    id: '10-9B-11',
    actions: [
      {
        action: Action.PRODUCTION,
        workerCount: 2,
        energyBoost: 2,
        contractRequirement: ContractType.YELLOW
      },
      {
        action: Action.WATER_MANAGEMENT,
        workerCount: 1,
        waterManagementType: WaterManagementType.TWO_DROPS,
        nextAction: true
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.DAM
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 1,
        constructionType: ConstructionType.BUILDING,
        buildingSearchDirection: BuildingSearchDirection.DOWN
      },
      {
        action: Action.EXTERNAL_WORK,
        workerCount: 2,
        externalWorkTiles: [3, 2, 1]
      },
      {
        action: Action.MACHINERY_SHOP,
        workerCount: 2,
        hydroCost: 5,
        machineryTypes: [MachineryType.EXCAVATOR, MachineryType.MIXER]
      },
      {
        action: Action.WORKSHOP,
        workerCount: 1,
        workshopSteps: 1
      },
      {
        action: Action.BANK,
        workerCount: 1
      }
    ],
    placingCriteriaDamElevation: [
      PlacingCriteriaDamElevation.UPSTREAM_POWERHOUSE,
      PlacingCriteriaDamElevation.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaDamElevation.DOWNSTREAM_DAM
    ],
    locationDamElevation: 10,
    placingCriteriaConduit: [
      PlacingCriteriaConduit.SECOND_MOST_POWERFUL,
      PlacingCriteriaConduit.OWNED_NEUTRAL_OPPONENT_DAM,
      PlacingCriteriaConduit.OWNED_OPPONENT_POWERHOUSE
    ],
    locationConduit: 9,
    locationConduitPosition: ConduitPosition.RIGHT,
    placingCriteriaPowerhouse: [
      PlacingCriteriaPowerhouse.OWNED_DAM,
      PlacingCriteriaPowerhouse.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaPowerhouse.FEEDING_OWNED_DAM
    ],
    locationPowerhouse: 11,
    waterManagementBasinColumns: [
      BasinColumn.C,
      BasinColumn.B,
      BasinColumn.A
    ]
  },
  {
    id: '8-8A-11',
    actions: [
      {
        action: Action.PRODUCTION,
        workerCount: 2,
        energyBoost: 1,
        contractRequirement: ContractType.GREEN
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.POWERHOUSE
      },
      {
        action: Action.PATENT_OFFICE,
        workerCount: 1,
        hydroCost: 2,
        constructionType: ConstructionType.POWERHOUSE
      },
      {
        action: Action.EXTERNAL_WORK,
        workerCount: 2,
        externalWorkTiles: [3, 2, 1]
      },
      {
        action: Action.WORKSHOP,
        workerCount: 1,
        workshopSteps: 1
      },
      {
        action: Action.BANK,
        workerCount: 1
      }
    ],
    placingCriteriaDamElevation: [
      PlacingCriteriaDamElevation.MOST_WATER_DROPS,
      PlacingCriteriaDamElevation.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaDamElevation.OWNED_POWERHOUSE
    ],
    locationDamElevation: 8,
    placingCriteriaConduit: [
      PlacingCriteriaConduit.OPPONENT_OWNED_POWERHOUSE,
      PlacingCriteriaConduit.SECOND_MOST_POWERFUL,
      PlacingCriteriaConduit.OPPONENT_NEUTRAL_OWNED_DAM
    ],
    locationConduit: 8,
    locationConduitPosition: ConduitPosition.LEFT,
    placingCriteriaPowerhouse: [
      PlacingCriteriaPowerhouse.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaPowerhouse.OWNED_DAM,
      PlacingCriteriaPowerhouse.FEEDING_OWNED_DAM
    ],
    locationPowerhouse: 11,
    waterManagementBasinColumns: [
      BasinColumn.B,
      BasinColumn.A,
      BasinColumn.D
    ]
  },
  {
    id: '4-2B-11',
    actions: [
      {
        action: Action.PRODUCTION,
        workerCount: 1,
        energyBoost: 1,
        contractRequirement: ContractType.GREEN
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.DAM,
        constructionRegion: Region.MOUNTAINS
      },
      {
        action: Action.MACHINERY_SHOP,
        workerCount: 1,
        hydroCost: 2,
        machineryTypes: [MachineryType.EXCAVATOR]
      },
      {
        action: Action.EXTERNAL_WORK,
        workerCount: 2,
        externalWorkTiles: [1, 2, 3]
      },
      {
        action: Action.WORKSHOP,
        workerCount: 1,
        workshopSteps: 1
      },
      {
        action: Action.BANK,
        workerCount: 1
      }
    ],
    placingCriteriaDamElevation: [
      PlacingCriteriaDamElevation.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaDamElevation.OWNED_POWERHOUSE,
      PlacingCriteriaDamElevation.MOST_WATER_DROPS
    ],
    locationDamElevation: 4,
    placingCriteriaConduit: [
      PlacingCriteriaConduit.MOST_POWERFUL,
      PlacingCriteriaConduit.OWNED_OPPONENT_POWERHOUSE,
      PlacingCriteriaConduit.OWNED_NEUTRAL_OPPONENT_DAM
    ],
    locationConduit: 2,
    locationConduitPosition: ConduitPosition.RIGHT,
    placingCriteriaPowerhouse: [
      PlacingCriteriaPowerhouse.NOT_FEEDING_OPPONENT_DAM,
      PlacingCriteriaPowerhouse.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaPowerhouse.OWNED_DAM
    ],
    locationPowerhouse: 11,
    waterManagementBasinColumns: [
      BasinColumn.D,
      BasinColumn.A,
      BasinColumn.B
    ]
  },
  {
    id: '7-7B-11',
    actions: [
      {
        action: Action.PRODUCTION,
        workerCount: 2,
        energyBoost: 1,
        contractRequirement: ContractType.YELLOW
      },
      {
        action: Action.WATER_MANAGEMENT,
        workerCount: 1,
        waterManagementType: WaterManagementType.ONE_DROP_IMMEDIATELY,
        nextAction: true
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.POWERHOUSE
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.CONDUIT
      },
      {
        action: Action.WORKSHOP,
        workerCount: 1,
        hydroCost: 2,
        workshopSteps: 2
      },
      {
        action: Action.EXTERNAL_WORK,
        workerCount: 2,
        externalWorkTiles: [2, 3, 1]
      },
      {
        action: Action.MACHINERY_SHOP,
        workerCount: 1,
        hydroCost: 3,
        machineryTypes: [MachineryType.WILD]
      },
      {
        action: Action.BANK,
        workerCount: 1
      }
    ],
    placingCriteriaDamElevation: [
      PlacingCriteriaDamElevation.RED_OUTLINE_SPACE,
      PlacingCriteriaDamElevation.OWNED_POWERHOUSE,
      PlacingCriteriaDamElevation.MOST_POWERFUL_CONDUIT
    ],
    locationDamElevation: 7,
    placingCriteriaConduit: [
      PlacingCriteriaConduit.OPPONENT_NEUTRAL_OWNED_DAM,
      PlacingCriteriaConduit.SECOND_MOST_POWERFUL,
      PlacingCriteriaConduit.OWNED_OPPONENT_POWERHOUSE
    ],
    locationConduit: 7,
    locationConduitPosition: ConduitPosition.RIGHT,
    placingCriteriaPowerhouse: [
      PlacingCriteriaPowerhouse.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaPowerhouse.OWNED_DAM,
      PlacingCriteriaPowerhouse.FEEDING_OWNED_DAM
    ],
    locationPowerhouse: 11,
    waterManagementBasinColumns: [
      BasinColumn.C,
      BasinColumn.B,
      BasinColumn.A
    ]
  },
  {
    id: '2-5B-9',
    actions: [
      {
        action: Action.PRODUCTION,
        workerCount: 2,
        contractRequirement: ContractType.GREEN
      },
      {
        action: Action.WATER_MANAGEMENT,
        workerCount: 1,
        waterManagementType: WaterManagementType.ONE_DROP_IMMEDIATELY,
        nextAction: true
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.CONDUIT
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.POWERHOUSE
      },
      {
        action: Action.EXTERNAL_WORK,
        workerCount: 2,
        externalWorkTiles: [1, 2, 3]
      },
      {
        action: Action.WORKSHOP,
        workerCount: 2,
        hydroCost: 5,
        workshopSteps: 3
      },
      {
        action: Action.MACHINERY_SHOP,
        workerCount: 1,
        hydroCost: 3,
        machineryTypes: [MachineryType.WILD]
      },
      {
        action: Action.BANK,
        workerCount: 1
      }
    ],
    placingCriteriaDamElevation: [
      PlacingCriteriaDamElevation.RED_OUTLINE_SPACE,
      PlacingCriteriaDamElevation.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaDamElevation.OWNED_POWERHOUSE
    ],
    locationDamElevation: 2,
    placingCriteriaConduit: [
      PlacingCriteriaConduit.OWNED_NEUTRAL_OPPONENT_DAM,
      PlacingCriteriaConduit.OWNED_OPPONENT_POWERHOUSE,
      PlacingCriteriaConduit.MOST_POWERFUL
    ],
    locationConduit: 5,
    locationConduitPosition: ConduitPosition.RIGHT,
    placingCriteriaPowerhouse: [
      PlacingCriteriaPowerhouse.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaPowerhouse.OWNED_DAM,
      PlacingCriteriaPowerhouse.FEEDING_OWNED_DAM
    ],
    locationPowerhouse: 9,
    waterManagementBasinColumns: [
      BasinColumn.B,
      BasinColumn.C,
      BasinColumn.D
    ]
  },
  {
    id: '1-1A-5',
    actions: [
      {
        action: Action.PRODUCTION,
        workerCount: 1,
        energyBoost: 2,
        contractRequirement: ContractType.GREEN
      },
      {
        action: Action.WATER_MANAGEMENT,
        workerCount: 1,
        waterManagementType: WaterManagementType.TWO_DROPS,
        nextAction: true
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.DAM
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.ELEVATION
      },
      {
        action: Action.EXTERNAL_WORK,
        workerCount: 2,
        externalWorkTiles: [1, 2, 3]
      },
      {
        action: Action.WORKSHOP,
        workerCount: 1,
        workshopSteps: 1
      },
      {
        action: Action.MACHINERY_SHOP,
        workerCount: 1,
        hydroCost: 3,
        machineryTypes: [MachineryType.WILD]
      },
      {
        action: Action.BANK,
        workerCount: 1
      }
    ],
    placingCriteriaDamElevation: [
      PlacingCriteriaDamElevation.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaDamElevation.OWNED_POWERHOUSE,
      PlacingCriteriaDamElevation.UPSTREAM_POWERHOUSE
    ],
    locationDamElevation: 1,
    placingCriteriaConduit: [
      PlacingCriteriaConduit.MOST_POWERFUL,
      PlacingCriteriaConduit.OWNED_NEUTRAL_OPPONENT_DAM,
      PlacingCriteriaConduit.OWNED_OPPONENT_POWERHOUSE
    ],
    locationConduit: 1,
    locationConduitPosition: ConduitPosition.LEFT,
    placingCriteriaPowerhouse: [
      PlacingCriteriaPowerhouse.FEEDING_OWNED_DAM,
      PlacingCriteriaPowerhouse.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaPowerhouse.OWNED_DAM
    ],
    locationPowerhouse: 5,
    waterManagementBasinColumns: [
      BasinColumn.A,
      BasinColumn.B,
      BasinColumn.C
    ]
  },
  {
    id: '8-4A-7',
    actions: [
      {
        action: Action.PRODUCTION,
        workerCount: 2,
        contractRequirement: ContractType.YELLOW
      },
      {
        action: Action.CONTRACT_OFFICE,
        workerCount: 1,
        contractDiscard: ContractType.YELLOW,
        nextAction: true
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.ELEVATION
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.POWERHOUSE
      },
      {
        action: Action.PATENT_OFFICE,
        workerCount: 1,
        hydroCost: 2,
        constructionType: ConstructionType.ELEVATION
      },
      {
        action: Action.EXTERNAL_WORK,
        workerCount: 2,
        externalWorkTiles: [1, 2, 3]
      },
      {
        action: Action.WORKSHOP,
        workerCount: 1,
        workshopSteps: 1
      },
      {
        action: Action.BANK,
        workerCount: 1
      }
    ],
    placingCriteriaDamElevation: [
      PlacingCriteriaDamElevation.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaDamElevation.OWNED_POWERHOUSE,
      PlacingCriteriaDamElevation.DOWNSTREAM_DAM
    ],
    locationDamElevation: 8,
    placingCriteriaConduit: [
      PlacingCriteriaConduit.OWNED_OPPONENT_POWERHOUSE,
      PlacingCriteriaConduit.OWNED_NEUTRAL_OPPONENT_DAM,
      PlacingCriteriaConduit.MOST_POWERFUL
    ],
    locationConduit: 4,
    locationConduitPosition: ConduitPosition.LEFT,
    placingCriteriaPowerhouse: [
      PlacingCriteriaPowerhouse.HILLS_BASIN_7,
      PlacingCriteriaPowerhouse.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaPowerhouse.OWNED_DAM
    ],
    locationPowerhouse: 7,
    waterManagementBasinColumns: [
      BasinColumn.B,
      BasinColumn.A,
      BasinColumn.D
    ]
  },
  {
    id: '1-5A-8',
    actions: [
      {
        action: Action.PRODUCTION,
        workerCount: 2,
        contractRequirement: ContractType.GREEN
      },
      {
        action: Action.WATER_MANAGEMENT,
        workerCount: 1,
        waterManagementType: WaterManagementType.TWO_DROPS,
        nextAction: true
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.CONDUIT,
        conduitMinProductionValue: 3
      },
      {
        action: Action.CONSTRUCTION,
        workerCount: 2,
        constructionType: ConstructionType.ELEVATION
      },
      {
        action: Action.WORKSHOP,
        workerCount: 1,
        hydroCost: 2,
        workshopSteps: 2
      },
      {
        action: Action.EXTERNAL_WORK,
        workerCount: 2,
        externalWorkTiles: [3, 2, 1]
      },
      {
        action: Action.MACHINERY_SHOP,
        workerCount: 1,
        hydroCost: 3,
        machineryTypes: [MachineryType.WILD]
      },
      {
        action: Action.BANK,
        workerCount: 1
      }
    ],
    placingCriteriaDamElevation: [
      PlacingCriteriaDamElevation.RED_OUTLINE_SPACE,
      PlacingCriteriaDamElevation.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaDamElevation.OWNED_POWERHOUSE
    ],
    locationDamElevation: 1,
    placingCriteriaConduit: [
      PlacingCriteriaConduit.OWNED_NEUTRAL_OPPONENT_DAM,
      PlacingCriteriaConduit.OWNED_OPPONENT_POWERHOUSE,
      PlacingCriteriaConduit.MOST_POWERFUL
    ],
    locationConduit: 5,
    locationConduitPosition: ConduitPosition.LEFT,
    placingCriteriaPowerhouse: [
      PlacingCriteriaPowerhouse.MOST_POWERFUL_CONDUIT,
      PlacingCriteriaPowerhouse.OWNED_DAM,
      PlacingCriteriaPowerhouse.FEEDING_OWNED_DAM
    ],
    locationPowerhouse: 8,
    waterManagementBasinColumns: [
      BasinColumn.A,
      BasinColumn.B,
      BasinColumn.C
    ]
  },
]

const cardsMap = new Map<string,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: string) : Card {
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
