"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stage = void 0;
const composer_1 = __importDefault(require("./composer"));
const context_1 = __importDefault(require("./scenes/context"));
class Stage extends composer_1.default {
    constructor(scenes = [], options) {
        super();
        this.options = {
            sessionName: 'session',
            ...options,
        };
        this.scenes = new Map();
        scenes.forEach((scene) => this.register(scene));
    }
    register(...scenes) {
        scenes.forEach((scene) => {
            if (!scene || !scene.id || typeof scene.middleware !== 'function') {
                throw new Error('telegraf: Unsupported scene');
            }
            this.scenes.set(scene.id, scene);
        });
        return this;
    }
    middleware() {
        const handler = composer_1.default.compose([
            (ctx, next) => {
                const scene = new context_1.default(ctx, this.scenes, this.options);
                return next(Object.assign(ctx, { scene }));
            },
            super.middleware(),
            composer_1.default.lazy((ctx) => { var _a; return (_a = ctx.scene.current) !== null && _a !== void 0 ? _a : composer_1.default.passThru(); }),
        ]);
        return composer_1.default.optional((ctx) => ctx[this.options.sessionName], handler);
    }
    static enter(...args) {
        return (ctx) => ctx.scene.enter(...args);
    }
    static reenter(...args) {
        return (ctx) => ctx.scene.reenter(...args);
    }
    static leave(...args) {
        return (ctx) => ctx.scene.leave(...args);
    }
}
exports.Stage = Stage;
