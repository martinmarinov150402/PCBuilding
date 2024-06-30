import { Model, RelationMappings } from "objection";
import { BaseModel } from "./BaseModel";
import { ConfigurationModel } from "./ConfigurationModel";

export enum PartType {
    CPU = "CPU",
    RAM = "Memory",
    HDD = "Hard Drive",
    SSD = "SSD",
    VideoCard = "Video Card",
    PSU = "PSU",
    Motherboard = "Motherboard",
    Case = "Case",
}
export class PartModel extends BaseModel {
    static readonly tableName = "parts";
    partType!: PartType
    partBrand!: string
    partModel!: string
    partIndex!: number
    partDescription!: string

    static get relationMappings(): RelationMappings {
    return {
      parts: {
        relation: Model.ManyToManyRelation,
        modelClass: ConfigurationModel,
        join: {
          from: 'parts.id',
          through: {
            from: 'configurations_parts.partId',
            to: 'configurations_parts.configurationId',
          },
          to: 'configurations.id',
        },
      },
    }
  }
}