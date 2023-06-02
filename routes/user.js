const { Router } = require('express');
const { getUsers, putUser, postUser, patchUser, deleteUser } = require('../controllers/user');

const router = new Router();

router.get('/', getUsers);
router.post('/', postUser);
router.put('/:id', putUser);
router.patch('/', patchUser);
router.delete('/', deleteUser);

module.exports = router;