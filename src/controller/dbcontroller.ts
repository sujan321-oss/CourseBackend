import { promises } from "dns"
import prisma from "../dbclient/dbclient"
import { BlobOptions } from "buffer"



type course = {
    coursename: string,
    thumbnail: string | undefined
}

type folder = {
    foldername: string,
    courseid: number
}

type video = {
    folderid: number,
    videokey: string,
    thumbnail: string | undefined
}

class CoursesDB {

    public async createCourse({ coursename, thumbnail }: course): Promise<Boolean> {
        try {
            const data: { coursename: string, thumbnails?: string } = {
                coursename: coursename
            }
            if (thumbnail) {
                data.thumbnails = thumbnail
            }
            const course = await prisma.course.create({
                data: data
            })
            if (course) {
                return true
            } return false
        }
        catch (err) {
            console.log("error occured while inserting the course")
            console.log(err)
            return false

        }

    }


    public async createFolder({ foldername, courseid }: folder): Promise<Boolean> {
        try {

            const folder = await prisma.folder.create({
                data: {
                    folderName: foldername,
                    courseid: Number(courseid)
                }
            })
            if (folder) return true
            return false

        }
        catch (err) {
            console.log("error occured while inserting the course")
            console.log(err)
            return false
        }

    }

    public async uploadVideo({ folderid, videokey, thumbnail }: video): Promise<Boolean> {

        try {
            const data: { folderid: number, thumbnail?: string, videokey: string } = {
                folderid: Number(folderid),
                videokey: videokey

            }
            if (thumbnail) {
                data.thumbnail = thumbnail
            }

            const video = await prisma.videos.create({
                data: data
            })
            return true
        }
        catch (err) {
            console.log(err)
            return false
        }
    }
}

export default CoursesDB





