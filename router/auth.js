/**
 * path api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { create_user, login, renew_token } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();


router.post( '/new', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validateFields
], create_user);

router.post('/',[
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').not().isEmpty(),
    validateFields
],  login);

router.get('/renew',renew_token );

module.exports = router;