
const axios = require('axios');

module.exports = async (req, res) => {
    try {
        const { search } = req.body;

        let query = {
            query: {
                query_string: {
                    query: search
                }
            }
        }

        if (search === "") {
            query = {
                query: {
                    match_all: {}
                }
            }
        }

        let { data: cuisineData } = await axios.post('http://localhost:9200/cuisine/_search', query);
        let { data: dishData } = await axios.post('http://localhost:9200/dish/_search', query);
        cuisineData = cuisineData.hits.hits.map(item => item._id); 
        dishData = dishData.hits.hits.map(item => item._id);

        const { data } = await axios.post('http://localhost:9200/restaurant/_search', {
            query: {
                bool: {
                    should: [
                        { // restaurant name, location, address
                            query_string: {
                                query: search
                            }
                        },
                        cuisineData
                            ? {
                                terms: {
                                    'cuisine.keyword': cuisineData
                                }
                            }
                            : null,
                        dishData
                            ? {
                                terms: {
                                    'topDishes.keyword': dishData
                                }
                            }
                            : null,
                    ].filter(x => x !== null)
                }
            }
        });

        return res.status(200).send(data);
    } catch (error) {
        console.log(error.response.data)
    }
}
