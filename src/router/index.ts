

import { Router } from "express";
import CoursesDB from "../controller/dbcontroller";
import { sigendUrlGeneratorVideo } from "../cloudhandler"
import FindDBData from "../controller/dbfetchcontorller"

const router = Router()

router.get("/", (req, res) => {
    res.json("express Server is running")
})


router.get("/course", async (req, res) => {
    console.log("req received")
    const findcourse = new FindDBData()
    const course = await findcourse.getAllCourse()
    if (course) {
        return res.status(200).json(course)
    }
    return res.status(500).json({ "msg": "error occured in a server side" })
})


router.get("course/:id", (req, res) => {
    //  get the course of a particular id  or all the curse to show it on a side bar it
})

// create the course section
// require firld Course name    thumbnails is optional 
router.post("/course", async (req, res) => {
    const { coursename, thumbnail } = req.body
    console.log(req.body)
    if (!coursename) {
        return res.status(400).json({ message: "Course name is required" })
    }
    const course = new CoursesDB()
    const response = await course.createCourse({ coursename, thumbnail })
    if (response) {
        return res.json({ message: "Course created successfully" })
    }
    return res.status(500).json({ message: "Unable to create the course" })
})

// if authorized give the option to create the fodler in front end side   
// require  fields folder name , course id    ---> in the front end we can make /1 endpoint like that so extracting  the 1 as a course and send it to server and 
router.post("/createfolder", async (req, res) => {
    const { foldername, courseid } = req.body
    if (!foldername || !courseid) return res.status(400).json(" foldername or course id is required ")
    const course = new CoursesDB()
    const response = await course.createFolder({ foldername, courseid })
    if (response) {
        return res.status(200).json("data added to the server sucessfully")
    }
    return res.status(500).json({ message: " error occured " })
})

// uploading the videos in a particular folder   this is only for the authorized person 
//  when user upload  the video -- > first send  the key of the video from the frontend side --> when key is received generate presigned url --> put key in the database --> response user with the put presigned url 

router.post("/uploadvideo", async (req, res) => {
    const { folderid, videokey, thumbnail } = req.body
    if (!folderid || !videokey) return res.status(400).json({ "msg": "folder or videokey is missing" })
    const signedurl = await sigendUrlGeneratorVideo(videokey)
    if (!signedurl) return res.status(500).json({ "msg": "some error occured while  geneariting the url" })
    const course = new CoursesDB()
    const response = await course.uploadVideo({ folderid, videokey, thumbnail })
    if (response) {
        return res.json({ "signedurl": signedurl })
    }
    return res.status(500).json({ "msg": "error occured while uploading the video" })
})




export default router


