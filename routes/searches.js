const { Router } = require("express");
const { searches } = require("../controllers/searches");

const router = new Router();


router.get('/:collection/:query', searches);


module.exports = router;