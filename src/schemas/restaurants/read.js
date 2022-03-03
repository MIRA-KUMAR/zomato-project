const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    const RestaurantModel = mongoose.model('Restaurant');
    // const data = await RestaurantModel.find({}).limit(2);

    const { page, limit } = req.query;
    
    const restaurant = await RestaurantModel.find()
                                            .limit(limit*1)
                                            .skip((page - 1)*limit)
                                            .exec();
    
    const count = await RestaurantModel.countDocuments();

        
    
    
        // console.log(err.message);
        // process.exit(1);

    

    return res.send({
        restaurant,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      });
}