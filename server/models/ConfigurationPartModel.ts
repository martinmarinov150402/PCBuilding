import { Model, RelationMappings } from "objection";
import { BaseModel } from "./BaseModel";
import { PartModel } from "./PartModel";
import { ConfigurationModel } from "./ConfigurationModel";

export class ConfigurationPartModel extends BaseModel {
    static readonly tableName = "configurations_parts";

    configurationId!: number
    partId!: number

    part?: PartModel
    configuration?: ConfigurationModel

    static get relationMappings(): RelationMappings {
    return {
      part: {
        relation: Model.BelongsToOneRelation,
        modelClass: PartModel,
        join: {
          from: 'configurations_parts.partId',
          to: 'parts.id',
        },
      },

      configuration: {
        relation: Model.BelongsToOneRelation,
        modelClass: ConfigurationModel,
        join: {
          from: 'title_genres.configurationId',
          to: 'configurations.id',
        },
      },
    }
  }

}