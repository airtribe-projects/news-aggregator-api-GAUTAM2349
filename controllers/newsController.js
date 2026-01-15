const { users } = require('./userController');
const newsService = require('../services/newsService');

const getNews = async (req, res) => {
    try {
        const user = users.find(u => u.email === req.user.email);
        const preferences = user ? user.preferences : [];
        
        const articles = await newsService.fetchNews(preferences);
        
        res.status(200).json({ news: articles });

    } catch (err) {
        console.error("Error fetching news:", err.message);
        res.status(500).json({ message: "Failed to fetch news" });
    }
};

module.exports = { getNews };
