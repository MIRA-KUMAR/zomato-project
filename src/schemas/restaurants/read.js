const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    const RestaurantModel = mongoose.model('Restaurant');
    // const data = await RestaurantModel.find({}).limit(2);

    // const { page, limit } = req.query;
    
    // const restaurant = await RestaurantModel.find()
    //                                         .limit(limit*1)
    //                                         .skip((page - 1)*limit)
    //                                         .exec();
    
    // const count = await RestaurantModel.countDocuments();

        
    
    
    //     // console.log(err.message);
    //     // process.exit(1);

    

    // return res.send({
    //     restaurant,
    //     totalPages: Math.ceil(count / limit),
    //     currentPage: page
    //   });



      
    // const limit = parseInt(req.query.limit)
    // const offset = parseInt(req.query.skip)
    const { page, limit } = req.query;
    const restaurant = await RestaurantModel.find()
                                            .skip((page-1)*limit)
                                            .limit(limit)
                                            .exec();
    const count = await RestaurantModel.countDocuments();
    const totalPages = Math.ceil(count / limit)
    const currentPage = Math.ceil(count % page)
    res.status(200).send({
    data: restaurant,
    paging: {
        total: count,
        page: currentPage,
        pages: totalPages,
    },
    })
        //  catch (e) {
        //   console.log("Error", e)
        //   res.status(500).send({
        //     data: null,
        //   })
        // }
      
}