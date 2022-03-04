const axios = require('axios');

module.exports = async (req, res) => {
    const { search } = req.body;
    const { data } = await axios.post('http://localhost:9200/restaurant/_search', {
        query: {
            bool: {
                should: [
                    {
                        match: {
                            name: search
                        }
                    },
                    {
                        match: {
                            address: search
                        }
                    },
                    {
                        match: {
                            location: search
                        }
                    }
                ]
            }
        }
    });

    return res.status(200).send(data);
}
