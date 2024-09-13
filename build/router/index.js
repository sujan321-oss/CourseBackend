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
const express_1 = require("express");
const dbcontroller_1 = __importDefault(require("../controller/dbcontroller"));
const cloudhandler_1 = require("../cloudhandler");
const dbfetchcontorller_1 = __importDefault(require("../controller/dbfetchcontorller"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.json("express Server is running");
});
router.get("/course", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("req received");
    const findcourse = new dbfetchcontorller_1.default();
    const course = yield findcourse.getAllCourse();
    if (course) {
        return res.status(200).json(course);
    }
    return res.status(500).json({ "msg": "error occured in a server side" });
}));
router.get("course/:id", (req, res) => {
    //  get the course of a particular id  or all the curse to show it on a side bar it
});
// create the course section
// require firld Course name    thumbnails is optional 
router.post("/course", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { coursename, thumbnail } = req.body;
    console.log(req.body);
    if (!coursename) {
        return res.status(400).json({ message: "Course name is required" });
    }
    const course = new dbcontroller_1.default();
    const response = yield course.createCourse({ coursename, thumbnail });
    if (response) {
        return res.json({ message: "Course created successfully" });
    }
    return res.status(500).json({ message: "Unable to create the course" });
}));
// if authorized give the option to create the fodler in front end side   
// require  fields folder name , course id    ---> in the front end we can make /1 endpoint like that so extracting  the 1 as a course and send it to server and 
router.post("/createfolder", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { foldername, courseid } = req.body;
    if (!foldername || !courseid)
        return res.status(400).json(" foldername or course id is required ");
    const course = new dbcontroller_1.default();
    const response = yield course.createFolder({ foldername, courseid });
    if (response) {
        return res.status(200).json("data added to the server sucessfully");
    }
    return res.status(500).json({ message: " error occured " });
}));
// uploading the videos in a particular folder   this is only for the authorized person 
//  when user upload  the video -- > first send  the key of the video from the frontend side --> when key is received generate presigned url --> put key in the database --> response user with the put presigned url 
router.post("/uploadvideo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { folderid, videokey, thumbnail } = req.body;
    if (!folderid || !videokey)
        return res.status(400).json({ "msg": "folder or videokey is missing" });
    const signedurl = yield (0, cloudhandler_1.sigendUrlGeneratorVideo)(videokey);
    if (!signedurl)
        return res.status(500).json({ "msg": "some error occured while  geneariting the url" });
    const course = new dbcontroller_1.default();
    const response = yield course.uploadVideo({ folderid, videokey, thumbnail });
    if (response) {
        return res.json({ "signedurl": signedurl });
    }
    return res.status(500).json({ "msg": "error occured while uploading the video" });
}));
exports.default = router;
