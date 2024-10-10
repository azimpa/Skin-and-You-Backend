const axios = require('axios');
require('dotenv').config();

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID;

const fetchAllReels = async () => {
    let allReels = [];
    let nextPage = `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_product_type,media_url,thumbnail_url,permalink,timestamp&access_token=${INSTAGRAM_ACCESS_TOKEN}`;

    while (nextPage) {
        try {
            const response = await axios.get(nextPage);
            const reels = response.data.data.filter(item => item.media_type === 'VIDEO' && item.media_product_type === 'REELS');
            console.log(reels, "iiiiii")
            allReels = allReels.concat(reels);

            nextPage = response.data.paging?.next || null;
        } catch (error) {
            console.error('Error fetching Instagram data:', error.response?.data || error.message);
            break;
        }
    }

    return allReels;
};

const getInstagramFeed = async (req, res) => {
    try {
        const allReels = await fetchAllReels();
        const sortedVideos = allReels.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        res.json(sortedVideos);
    } catch (error) {
        console.error('Error in getInstagramFeed:', error);
        res.status(500).json({ error: 'Failed to fetch Instagram data' });
    }
};

module.exports = { getInstagramFeed };