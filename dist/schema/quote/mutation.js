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
exports.QuoteMutation = void 0;
const uuid_1 = require("uuid");
const Quote_1 = __importDefault(require("../../models/Quote"));
exports.QuoteMutation = {
    addQuote: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
        const id = (0, uuid_1.v4)();
        const q = yield Quote_1.default.create({
            id,
            phrase: args.phrase,
            quotee: args.quotee
        });
        return {
            id: q.getDataValue('id'),
            phrase: q.getDataValue('phrase'),
            quotee: q.getDataValue('quotee')
        };
    }),
    editQuote: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
        const q = yield Quote_1.default.update({ phrase: args.phrase, quotee: args.quotee }, { where: { id: args.id }, returning: true });
        return {
            id: q[1][0].getDataValue('id'),
            phrase: q[1][0].getDataValue('phrase'),
            quotee: q[1][0].getDataValue('quotee')
        };
    }),
    deleteQuote: (root, args) => __awaiter(void 0, void 0, void 0, function* () {
        const q = yield Quote_1.default.destroy({ where: { id: args.id } });
        return { ok: q };
    })
};
//# sourceMappingURL=mutation.js.map