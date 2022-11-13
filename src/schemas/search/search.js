const axios = require('axios');

// cusine: [{ name: 'Contenental' }, { name: 'Chinese' }]
// dish: [{ name: 'idli' }, { name: 'wada' }]
// restaurant: [
//     {
//         name,
//         address,
//         dish: [_id of cusines]
//         cusine: [_id of dishes ]
//     }
// ]

module.exports = async (req, res) => {
    try {
        const { search } = req.query;

        const { data: dishData } = await axios.post('http://localhost:9200/dish/_search', {
            query: {
                match: {
                    name: search
                }
            }
        });

        const dishIds = dishData.hits.hits.map(x => x._id);

        const { data } = await axios.post('http://localhost:9200/restaurant/_search', {
            size: 10,
            query: {
                bool: {
                    should: [
                        {
                            match: {
                                name: search
                            }
                        },
                        {
                            terms: {
                                'topDishes.keyword': dishIds
                            }
                        }
                    ]
                }
            }
        });

        return res.send(data.hits.hits.map(x => ({ _id: x._id, ...x._source })));

        // let query = {
        //     query: {
        //         query_string: {
        //             query: search
        //         }
        //     }
        // }

        // if (search === "") {
        //     query = {
        //         query: {
        //             match_all: {}
        //         }
        //     }
        // }

        // let { data: cuisineData } = await axios.post('http://localhost:9200/cuisine/_search', query);
        // let { data: dishData } = await axios.post('http://localhost:9200/dish/_search', query);
        // cuisineData = cuisineData.hits.hits.map(item => item._id); 
        // dishData = dishData.hits.hits.map(item => item._id);

        // const { data } = await axios.post('http://localhost:9200/restaurant/_search', {
        //     query: {
        //         bool: {
        //             should: [
        //                 {
        //                     query_string: {
        //                         query: search
        //                     }
        //                 },
        //                 cuisineData
        //                     ? {
        //                         terms: {
        //                             'cuisine.keyword': cuisineData
        //                         }
        //                     }
        //                     : null,
        //                 dishData
        //                     ? {
        //                         terms: {
        //                             'topDishes.keyword': dishData
        //                         }
        //                     }
        //                     : null,
        //             ].filter(x => x !== null)
        //         }
        //     }
        // });

        return res.status(200).send(data);
    } catch (error) {
        console.log(error.response.data)
    }
}
