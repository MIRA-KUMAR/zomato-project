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

        let { data: cusineData } = await axios.post('http://localhost:9200/cuisine/_search', query);
        cusineData = cusineData.hits.hits.map(item => item._id); // [cusineIds]

        const { data } = await axios.post('http://localhost:9200/restaurant/_search', {
            query: {
                bool: {
                    should: [
                        // { // restaurant name, location, address
                        //     query_string: {
                        //         query: search
                        //     }
                        // },
                        cusineData
                            ? {
                                terms: {
                                    'cuisine.keyword': cusineData
                                }
                            }
                            : null
                    ].filter(x => x !== null)
                }
            }
        });

        return res.status(200).send(data);
    } catch (error) {
        console.log(error.response.data)
    }
}
