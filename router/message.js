/**
 * Path: api/menssage
 */

const { Router } = require("express");
const { getChat } = require("../controllers/message");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get('/:from', validateJWT, getChat)


module.exports = router