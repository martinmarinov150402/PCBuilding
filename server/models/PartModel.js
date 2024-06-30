"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartModel = exports.PartType = void 0;
const objection_1 = require("objection");
const BaseModel_1 = require("./BaseModel");
const ConfigurationModel_1 = require("./ConfigurationModel");
var PartType;
(function (PartType) {
    PartType["CPU"] = "CPU";
    PartType["RAM"] = "Memory";
    PartType["HDD"] = "Hard Drive";
    PartType["SSD"] = "SSD";
    PartType["VideoCard"] = "Video Card";
    PartType["PSU"] = "PSU";
    PartType["Motherboard"] = "Motherboard";
    PartType["Case"] = "Case";
})(PartType || (exports.PartType = PartType = {}));
class PartModel extends BaseModel_1.BaseModel {
    static get relationMappings() {
        return {
            parts: {
                relation: objection_1.Model.ManyToManyRelation,
                modelClass: ConfigurationModel_1.ConfigurationModel,
                join: {
                    from: 'parts.id',
                    through: {
                        from: 'configurations_parts.partId',
                        to: 'configurations_parts.configurationId',
                    },
                    to: 'configurations.id',
                },
            },
        };
    }
}
exports.PartModel = PartModel;
PartModel.tableName = "parts";
