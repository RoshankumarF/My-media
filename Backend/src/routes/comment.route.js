import Router from "express"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { addComment, getVideoComments } from "../controllers/comment.controller.js"


const router =Router()

 

router.route("/add-comment/:videoId").post(verifyJWT,addComment)
router.route("/get-comment/:videoId").get(getVideoComments)

export default  router