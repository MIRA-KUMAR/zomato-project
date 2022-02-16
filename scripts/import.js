const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const { MongoClient, ObjectId } = require('mongodb');

const readCsv = () => new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, '../Dataset.csv');
    const finalData = [];
    fs.createReadStream(filePath)
        .pipe(csv.parse({ headers: true }))
        .on('data', function (data) { // event driven programming
            finalData.push({
                name: data['Name of Restaurant'],
                address: data['Address'],
                location: data['Location'],
                cuisine: data['Cuisine'][0] === '[' ? JSON.parse(data['Cuisine'].replace(/'/g, '"')).map(x => x.trim()) : data['Cuisine'],
                topDishes: data['Top Dishes'][0] === '['
                    ? JSON.parse(data['Top Dishes'].replace(/'/g, '"')).map((x) => x.trim()) // [x.trim() for x in data['Top Dishes]]
                    : data['Top Dishes'],
                price: parseFloat(data['Price for 2']),
                diningRating: parseFloat(data['Dining Rating']),
                diningRatingCount: parseFloat(data['Dining Rating Count']),
                deliveryRating: parseFloat(data['Delivery Rating']),
                deliveryRatingCount: parseFloat(data['Delivery Rating Count']),
                features: data['Features'][0] === '['
                    ? JSON.parse(data['Features'].replace(/'/g, '"')).map(x => x.trim())
                    : data['Features'],
            });
        })
        .on('end', function () {
            return resolve(finalData);
        })
        .on('error', function (err) {
            return reject(err);
        });
});

async function importData() {
    try {
        const data = await readCsv();
        const connection = await MongoClient.connect('mongodb://localhost:27017/zomato');
        const db = connection.db();

        const RestaurantCollection = db.collection('restaurants'); // restaurent with cusine ids 
        const CuisinesCollection = db.collection('cuisines'); // cusines
        const DishesCollection = db.collection('dishes');
        const FeaturesCollection = db.collection('features');

        const uniqueCusines = data
            .map((x) => x.cuisine)
            .flat()
            .filter((x, i, a) => a.indexOf(x) === i);

        const uniqueDishes = data // [[1, 2, 3], 'Invalid Data'] => [1, 2, 3, 'Invalid Data']
            .map((x) => x.topDishes)
            .flat()
            .filter((x, i, a) => a.indexOf(x) === i);
            
        const uniqueFeatures = data
            .map((x) => x.features)
            .flat()
            .filter((x, i, a) => a.indexOf(x) === i);

        // const uniqueCusines = data.reduce((prev, curr) => {
        //     curr.cuisine.forEach((cusine) => {
        //         if (!prev.cusine) {
        //             prev[cusine] = null;
        //         }
        //     });
        //     return prev;
        // }, {});

        const insertCusines = uniqueCusines.map((cusine) => {
            return {
                _id: ObjectId(),
                name: cusine,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });

        const insertDishes = uniqueDishes.map((dish) => {
            return {
                _id: ObjectId(),
                name: dish,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });

        const insertFeatures = uniqueFeatures.map((feature) => {
            return {
                _id: ObjectId(),
                name: feature,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });
        
        await CuisinesCollection.insertMany(insertCusines);
        await DishesCollection.insertMany(insertDishes);
        await FeaturesCollection.insertMany(insertFeatures);

        const newData = data.map((obj) => {
            if (Array.isArray(obj.cuisine)) {
                obj.cuisine = obj.cuisine.map((cusine) => insertCusines.find(x => x.name === cusine)._id);
            } else {
                obj.cuisine = [insertCusines.find(x => x.name === obj.cuisine)._id]
            }
            if (Array.isArray(obj.topDishes)) {
                obj.topDishes = obj.topDishes.map((dish) => insertDishes.find(x => x.name === dish)._id);
            } else {
                obj.topDishes = [insertDishes.find(x => x.name === obj.topDishes)._id]
            }
            if (Array.isArray(obj.features)) {
                obj.features = obj.features.map((feature) => insertFeatures.find(x => x.name === feature)._id);
            } else {
                obj.features = [insertFeatures.find(x => x.name === obj.features)._id]
            }

            obj.createdAt = new Date();
            obj.updatedAt = new Date();

            return obj;
        });

        await RestaurantCollection.insertMany(newData);

        console.log('Done!');
    } catch (err) {
        console.log(err);
    }
}

importData();
