const db = require("../model/index")


exports.addPromotion = async function (req,res,next){

    const {
        title,
        countryId,
        stateId,
        cityId,
        forUsers,
        status,
        description
    } = req.body;

    await db.promotion.create({
        title,country:countryId,state:stateId,city:cityId,forUsers,status,description
    })


    res.status(200).json({
        success:true,
        message:"promotion created successfully"
    })
}




exports.filterPromotion = async function(req,res,next){
    const {title,countryId,stateId,cityId,status,forUsers} = req.query;

    if(!title && !countryId && !stateId && !cityId && !status && !forUsers){
        var promotions = await db.promotion.find({}).populate({path:"state country city",select:"name"});
    }else{
       var promotions = await db.promotion.find({
            $or:[
                {title},
                {country:countryId},
                {state:stateId},
                {city:cityId},
                {status},
                {forUsers}
            ]
        }).populate({path:"state country city",select:"name"});
    }


    res.status(200).json({
        success:true,
        promotions
    })

}