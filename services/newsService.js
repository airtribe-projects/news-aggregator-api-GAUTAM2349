const axios = require('axios');

const fetchNews = async (preferences) => {
    let query = 'general';
    if (preferences.length > 0) {
        query = preferences.join(' OR ');
    }

    let url;
    if (process.env.GNEWS_BASE_URL) {
        url = process.env.GNEWS_BASE_URL.replace('${encodeURIComponent(query)}', encodeURIComponent(query)) + process.env.GNEWS_API_KEY;
    } else {
        url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&apikey=${process.env.GNEWS_API_KEY}`;
    }

    const response = await axios.get(url);
    return response.data.articles;
};

module.exports = {
    fetchNews
};
