
import prisma from "../dbclient/dbclient"

interface Course {
    id: number,
    coursename: string,
    thumbnails: string | null,

}

interface Folder {
    id: number,
    folderName: string,
    courseid: number,
}


class FindDBData {
    public async getAllCourse(): Promise<boolean | Course[]> {
        try {
            const data = await prisma.course.findMany()
            return data
        }
        catch (err) {
            return false
        }
    }

    public async getFolders(courseid: number): Promise<boolean | Folder[]> {
        try {
            const data = await prisma.folder.findMany({
                where: {
                    courseid: courseid
                }
            })
            return data
        }
        catch (err) {
            return false
        }
    }

    public async getVideos(folderid: number): Promise<boolean> {
        try {
            const data = await prisma.videos.findMany(
                {
                    where: {
                        folderid: folderid
                    }
                }
            )
            return true
        }
        catch (err) {
            return false
        }
    }



}

export default FindDBData