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
class CoursesDB {
    createCourse(_a) {
        return __awaiter(this, arguments, void 0, function* ({ coursename, thumbnail }) {
            try {
                const data = {
                    coursename: coursename
                };
                if (thumbnail) {
                    data.thumbnails = thumbnail;
                }
                const course = yield dbclient_1.default.course.create({
                    data: data
                });
                if (course) {
                    return true;
                }
                return false;
            }
            catch (err) {
                console.log("error occured while inserting the course");
                console.log(err);
                return false;
            }
        });
    }
    createFolder(_a) {
        return __awaiter(this, arguments, void 0, function* ({ foldername, courseid }) {
            try {
                const folder = yield dbclient_1.default.folder.create({
                    data: {
                        folderName: foldername,
                        courseid: Number(courseid)
                    }
                });
                if (folder)
                    return true;
                return false;
            }
            catch (err) {
                console.log("error occured while inserting the course");
                console.log(err);
                return false;
            }
        });
    }
    uploadVideo(_a) {
        return __awaiter(this, arguments, void 0, function* ({ folderid, videokey, thumbnail }) {
            try {
                const data = {
                    folderid: Number(folderid),
                    videokey: videokey
                };
                if (thumbnail) {
                    data.thumbnail = thumbnail;
                }
                const video = yield dbclient_1.default.videos.create({
                    data: data
                });
                return true;
            }
            catch (err) {
                console.log(err);
                return false;
            }
        });
    }
}
exports.default = CoursesDB;
