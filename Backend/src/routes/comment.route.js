import Router from "express"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { addComment, getVideoComments } from "../controllers/comment.controller.js"


const router =Router()

router.use(verifyJWT)

router.route("/add-comment/:videoId").post(addComment)
router.route("/get-comment/:videoId").get(getVideoComments)

export default  router