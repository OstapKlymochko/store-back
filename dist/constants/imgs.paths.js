"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.photosPath = void 0;
const path_1 = __importDefault(require("path"));
const photosPath = (args) => path_1.default.resolve(process.cwd(), 'src', 'images', ...args);
exports.photosPath = photosPath;
