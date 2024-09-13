
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl, S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import client from "../bucketclient/client";

const BUCKET = "khumapokharelgmail.comvideovtranscoder"

const sigendUrlGeneratorVideo = async (Key:string): Promise<string | boolean> => {
     
    try {
        const putobject = await new PutObjectCommand({
            Bucket: BUCKET,
            Key: Key,
        })
        const singedurl = await getSignedUrl(client, putobject)

        return singedurl
    }

    catch (e) {
        return false
    }
}


export default sigendUrlGeneratorVideo