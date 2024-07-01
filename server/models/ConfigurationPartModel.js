"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationPartModel = void 0;
const objection_1 = require("objection");
const BaseModel_1 = require("./BaseModel");
const PartModel_1 = require("./PartModel");
const ConfigurationModel_1 = require("./ConfigurationModel");
class ConfigurationPartModel extends BaseModel_1.BaseModel {
    static get relationMappings() {
        return {
            part: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: PartModel_1.PartModel,
                join: {
                    from: 'configurations_parts.partId',
                    to: 'parts.id',
                },
            },
            configuration: {
                relation: objection_1.Model.BelongsToOneRelation,
                modelClass: ConfigurationModel_1.ConfigurationModel,
                join: {
                    from: 'title_genres.configurationId',
                    to: 'configurations.id',
                },
            },
        };
    }
}
exports.ConfigurationPartModel = ConfigurationPartModel;
ConfigurationPartModel.tableName = "configurations_parts";
