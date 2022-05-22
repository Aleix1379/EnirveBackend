"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IrregularVerbQuery = void 0;
const IrregularVerb_1 = __importDefault(require("../../models/IrregularVerb"));
exports.IrregularVerbQuery = {
    irregularVerbs: (root, { ids }) => __awaiter(void 0, void 0, void 0, function* () {
        if (!ids) {
            return IrregularVerb_1.default.findAll({
                order: [['id', 'ASC']]
            });
        }
        return IrregularVerb_1.default.findAll({
            where: { id: ids },
            order: [['id', 'ASC']]
        });
    })
};
//# sourceMappingURL=query.js.map