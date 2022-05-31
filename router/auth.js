/**
 * path api/login
 */

const { Router } = require('express');
const { create_user, login, renew_token } = require('../controllers/auth');

const router = Router();


router.post( '/new', create_user);

router.post('/', login);

router.get('/renew',renew_token );

module.exports = router;