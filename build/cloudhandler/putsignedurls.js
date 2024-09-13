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
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const client_1 = __importDefault(require("./bucketclient/client"));
const BUCKET = "khumapokharelgmail.comvideovtranscoder";
const sigendUrlGeneratorVideo = (Key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const putobject = yield new client_s3_1.PutObjectCommand({
            Bucket: BUCKET,
            Key: Key,
        });
        const singedurl = yield (0, s3_request_presigner_1.getSignedUrl)(client_1.default, putobject);
        return singedurl;
    }
    catch (e) {
        return false;
    }
});
