export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');

    const token = process.env.INSTAGRAM_TOKEN || 'IGAAYhEnAtOZANBZAFpoeHZAPR1h5c21aVTN1VjA1Y1FpbXcwNXhvcTd2NWVHWTAwbFFKSmRfZAk1ZAZA1hxdUpHbFFGdnRRNzd6ZA2NGTzRvVzdPLVZAxQ083UUszeUc3d0xxUEJhWUFIRzJ3d0EzeUNLUjdOUjZAyWTJOVnF5b21QZAks0SQZDZD';

    try {
        const response = await fetch(
            `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${token}&limit=6`
        );
        const data = await response.json();

        if (!response.ok) {
            return res.status(500).json({ error: data.error });
        }

        const formatted = (data.data || [])
            .map(item => ({
                id: item.id,
                media_type: item.media_type,
                permalink: item.permalink,
                media_url: item.media_type === 'VIDEO' && item.thumbnail_url ? item.thumbnail_url : item.media_url,
                caption: item.caption || '',
                timestamp: item.timestamp
            }))
            .filter(item => Boolean(item.media_url));

        return res.status(200).json({ data: formatted });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
