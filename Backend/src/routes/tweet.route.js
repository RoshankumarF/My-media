import {Router} from "express"
import { addTweet, getAllTweet } from "../controllers/tweet.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router=Router()
 
router.use(verifyJWT)


router.route("/add-tweet").post(verifyJWT,addTweet)
router.route("/get-tweets").get(getAllTweet)

export default router