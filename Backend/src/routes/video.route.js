import {Router} from "express"
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { getAllVideos, getVideoByid, incviews, publishVideo } from "../controllers/video.controller.js"



const router=Router()

 

router.route("/publish-video").post(verifyJWT,upload.fields([
    {
        name:"videoFile",
        maxCount:1
    },
    {
        name:"thumbnail",
        maxCount:1
    }
]),publishVideo)
router.route("/all-videos").get(getAllVideos)
router.route("/watch/:videoId").get(getVideoByid)
router.route("/view/:videoId").post(incviews)

export default router