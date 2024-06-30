import { Model, RelationMappings } from "objection";
import { BaseModel } from "./BaseModel";
import { PartModel } from "./PartModel";

export class ConfigurationModel extends BaseModel {
    static readonly tableName = "configurations";

    title!: string
    description!: string
    authorId!: number
    parts?: PartModel[]

    static get relationMappings(): RelationMappings {
    return {
      parts: {
        relation: Model.ManyToManyRelation,
        modelClass: PartModel,
        join: {
          from: 'configurations.id',
          through: {
            from: 'configurations_parts.configurationId',
            to: 'configurations_parts.partId',
          },
          to: 'parts.id',
        },
      },
    }
  }

}