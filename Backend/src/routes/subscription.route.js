import {Router} from "express"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import { toggleSubscription,checkSubscription, getSubscriberCount } from "../controllers/subscription.controller.js"


const router=Router()


router.use(verifyJWT)

router.route("/toggle-subscription/:channelId").post(toggleSubscription)
router.route("/check-subscription/:channelId")
    .get(checkSubscription);

router.route("/subscriber-count/:channelId").get(getSubscriberCount)

export default router