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
exports.initDatabase = void 0;
const IrregularVerb_1 = __importDefault(require("../models/IrregularVerb"));
const irregular_verbs_1 = require("./irregular-verbs");
const Result_1 = __importDefault(require("../models/Result"));
const initDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    initIrregularVerbs().catch(error => console.error('initIrregularVerbs', error));
    Result_1.default.sync().catch(error => console.error('Result.sync', error));
});
exports.initDatabase = initDatabase;
const initIrregularVerbs = () => __awaiter(void 0, void 0, void 0, function* () {
    const verb = yield IrregularVerb_1.default.findOne({ where: { id: 1 } });
    if (!verb) {
        irregular_verbs_1.verbs.forEach(verb => {
            IrregularVerb_1.default.create({
                id: verb.id,
                present: verb.present,
                simple: verb.simple,
                participle: verb.participle
            });
        });
    }
});
//# sourceMappingURL=helper.js.map