import {Router} from "express"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { toggleSubscription,checkSubscription, getSubscriberCount } from "../controllers/subscription.controller.js"


const router=Router()

 

 

router.route("/toggle-subscription/:channelId").post(verifyJWT,toggleSubscription)
router.route("/check-subscription/:channelId")
    .get(verifyJWT,checkSubscription);

router.route("/subscriber-count/:channelId").get(getSubscriberCount)

export default router