const { MongoClient } = require('mongodb');

async function Read(request, response) {
    let { page, limit, fields } = request.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const connection = await MongoClient.connect('mongodb://localhost:27017/zomato');
    const db = connection.db();

    const RestaurantCollection = db.collection('restaurants');
    const totalCount = await RestaurantCollection.countDocuments();
    const data = await RestaurantCollection.find({})
        .project({ [fields]: true })
        .skip(page * limit)
        .limit(limit)
        .toArray();

    return response.send({
        success: true,
        value: {
            data,
            noOfPages: Math.ceil(totalCount / limit)
        }
    });
}

module.exports = Read;
