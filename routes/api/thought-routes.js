const router = require("express").Router()
// require in object destructure mode the functions from userController

router.route("/").get().post()
router.route("/:thoughtId").get().delete().put()
router.route("/:thoughtId/reactions").post()
router.route("/:thoughtId/reactions/:reactionId").delete()


module.exports = router