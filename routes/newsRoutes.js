const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, newsController.getNews);

module.exports = router;
