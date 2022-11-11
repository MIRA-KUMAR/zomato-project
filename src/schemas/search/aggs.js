const axios = require('axios');

module.exports = async (req, res) => {
    const {
        type // location | cuisine | feature
    } = req.body;

    let aggs;

    if (type === 'location') {
        aggs = {
            locations: {
                terms: {
                    field: 'location.keyword',
                    size: 100
                },
            },
        }
    } else if (type === 'cuisine') {
        aggs = {
            cuisines: {
                terms: {
                    field: 'cuisine.keyword' 
                }
            },
        }
    } else {
        aggs = {
            features: {
                terms: {
                    field: 'feature.keyword' 
                }
            },
        }
    }

    const { data } = await axios.post('http://localhost:9200/restaurant/_search', {
        size: 0,
        aggs,
    });

    const result = data.aggregations.locations.buckets.map(x => x.key);

    return res.status(200).send(result);
};
