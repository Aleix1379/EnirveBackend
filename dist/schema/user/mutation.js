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
exports.UserMutation = void 0;
const User_1 = __importDefault(require("../../models/User"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const irregular_verbs_1 = require("../../db/irregular-verbs");
const Result_1 = __importDefault(require("../../models/Result"));
const saltRounds = 10;
exports.UserMutation = {
    login: (root, { email, password }) => __awaiter(void 0, void 0, void 0, function* () {
        console.info('email:', email);
        console.info('password:', password);
        const user = yield User_1.default.findOne({ where: { email } });
        if (!user) {
            console.info('user not found...');
            throw new Error('You have entered an invalid username or password');
        }
        const result = yield bcrypt_1.default.compare(password, user.getDataValue('password'));
        if (!result) {
            console.info("password doesn't match");
            throw new Error('You have entered an invalid username or password');
        }
        return {
            user,
            jwt: jwt_simple_1.default.encode({ email }, process.env.JWT_SECRET)
        };
    }),
    registerUser: (root, { username, email, password }) => __awaiter(void 0, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt(saltRounds);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const user = yield User_1.default.create({
            username,
            email,
            password: hash
        });
        irregular_verbs_1.verbs.forEach((verb) => {
            Result_1.default.create({
                verb_id: verb.id,
                user_id: user.getDataValue('id'),
                completed: false
            });
        });
        return {
            user,
            jwt: jwt_simple_1.default.encode({ username }, process.env.JWT_SECRET)
        };
    }),
    updateUserAvatar: (root, { avatar }, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.default.findOne({ where: { id: ctx.user.id } });
        console.info('user connected id:', ctx.user.id);
        // user.avatar = avatar
        user.setDataValue('avatar', avatar);
        yield user.save();
        console.info('return user.toJSON():', user.toJSON());
        return user.toJSON();
    })
};
//# sourceMappingURL=mutation.js.map