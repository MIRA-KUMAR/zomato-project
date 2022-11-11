const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const { MongoClient, ObjectId } = require('mongodb');
const axios = require('axios');
const { error } = require('console');

(async function main() {
    // crud operations
    // create / insert => /tableName/_doc POST
    // Read => /tableName/_doc/_id GET
    // Read Multiple => /tableName/_search Get
    // Update => /tableName/_doc PUT
    // Delete => /tableName/_doc/_id DELETE
    // List tables => /_cat/indices
    // Bulk API => https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html

    const connection = await MongoClient.connect('mongodb://localhost:27017/zomato');
    const db = connection.db();

    // const RestaurantCollection = db.collection('restaurants');
    // const CuisinesCollection = db.collection('cuisines');
    // const DishesCollection = db.collection('dishes');
    // const FeaturesCollection = db.collection('features');

    const singularNames = {
        'restaurants': 'restaurant',
        'cuisines': 'cuisine',
        'dishes': 'dish',
        'features': 'feature',
    }
  const d = await Promise.all(
        [
            'restaurants',
            'cuisines',
            'dishes',
            'features'
        ].map(async (name) => {
            const Collection = db.collection(name);
            const data = await Collection.find().toArray();
            const esData = data.map((obj) => {
                const { _id, ...remaining } = obj;
                return [
                    JSON.stringify({ index: { _id: _id } }),
                    JSON.stringify(remaining)
                ];
            }).flat().join('\n');
    
            const resp = await axios.post(`http://localhost:9200/${ singularNames[name] }/_bulk`, esData + '\n', {
                headers: {
                    'Content-Type': 'application/x-ndjson'
                }
            });
            return resp.data;
        })
    );
    

    
 console.log(d);
    // const restaurants = await RestaurantCollection.find({}).toArray();

    // bulk api
    // const esData = restaurants.map((restaurant) => {
    //     const { _id, ...remaining } = restaurant;
    //     return [
    //         JSON.stringify({ index: { _id: _id } }),
    //         JSON.stringify(remaining)
    //     ];
    // }).flat().join('\n');

    // await axios.post('http://localhost:9200/restaurant/_bulk', esData + '\n', {
    //     headers: {
    //         'Content-Type': 'application/x-ndjson'
    //     }
    // });


})() // IIFE