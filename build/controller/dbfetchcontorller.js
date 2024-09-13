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
const dbclient_1 = __importDefault(require("../dbclient/dbclient"));
class FindDBData {
    getAllCourse() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield dbclient_1.default.course.findMany();
                return data;
            }
            catch (err) {
                return false;
            }
        });
    }
    getFolders(courseid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield dbclient_1.default.folder.findMany({
                    where: {
                        courseid: courseid
                    }
                });
                return data;
            }
            catch (err) {
                return false;
            }
        });
    }
    getVideos(folderid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield dbclient_1.default.videos.findMany({
                    where: {
                        folderid: folderid
                    }
                });
                return true;
            }
            catch (err) {
                return false;
            }
        });
    }
}
exports.default = FindDBData;
