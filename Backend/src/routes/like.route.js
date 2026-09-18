import {Router} from "express"
import { verifyJWT} from "../middlewares/auth.middleware.js"
import { videoLikeToggle } from "../controllers/like.controller.js"


const router =Router()

router.use(verifyJWT)

router.route("/video-like/:videoId").post(videoLikeToggle)

export default router

