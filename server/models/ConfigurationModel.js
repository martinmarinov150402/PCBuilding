"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigurationModel = void 0;
const objection_1 = require("objection");
const BaseModel_1 = require("./BaseModel");
const PartModel_1 = require("./PartModel");
class ConfigurationModel extends BaseModel_1.BaseModel {
    static get relationMappings() {
        return {
            parts: {
                relation: objection_1.Model.ManyToManyRelation,
                modelClass: PartModel_1.PartModel,
                join: {
                    from: 'configurations.id',
                    through: {
                        from: 'configurations_parts.configurationId',
                        to: 'configurations_parts.partId',
                    },
                    to: 'parts.id',
                },
            },
        };
    }
}
exports.ConfigurationModel = ConfigurationModel;
ConfigurationModel.tableName = "configurations";
