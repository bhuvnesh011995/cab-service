const Model = require("../model/model.model")
const Make= require("../model/make.model")



exports.addModel = async function(req, res, next) {
    const { name, make, status, year } = req.body;
    console.log("Request Body:", req.body);

    try {
        // Attempt to find a 'Make' document with the specified name
        const makeDoc = await Make.findOne({ name: make });

        if (!makeDoc) {
            console.log("Make not found:", make);
            return res.status(404).json({
                success: false,
                error: "Make not found",
            });
        }

        console.log("Found Make:", makeDoc);

        // Create a 'Model' document with the provided data and the 'makeDoc' reference
        const model = await Model.create({
            name: name,
            status: status,
            year: year,
            make: makeDoc._id,
        });

        console.log("Created Model:", model);

        // Update the 'Make' document to add the 'model' reference
        await Make.updateOne(
            { name: make },
            {
                $push: { model: model._id },
            }
        );

        console.log("Updated Make:", makeDoc);

        // Respond with a success message and 'makeDoc' data
        return res.status(200).json({
            success: true,
            data: JSON.stringify(makeDoc),
        });
    } catch (e) {
        // Handle any errors that occur during the process
        console.error("Error:", e);
        return res.status(500).json({
            success: false,
            error: e.message,
        });
    }
};



exports.addState = async function(req,res,next){
    const {name,country,status,stateCode} = req.body;

    const countryDoc = await Country.findOne({name:country})

   const state =  await State.create({
        name:name,
        status:status,
        stateCode:stateCode,
        country:countryDoc._id
    })

    await Country.updateOne({name:country},{
        $push:{state:state._id}
    })

    res.status(202).json({
        success:true,
        message:"state added"
    }).end()
}



exports.getModel = async function(req,res,next){
    let {name,make,status,year} = req.query
    
    const models = await Model.find({name:name}).populate("make").exec()
    
    res.status(200).json({
        success:true,
        data:models
    })
}


exports.filterModel = async function(req,res,next){
    let {name,make,status} = req.query
    
    let models;

    try{
        if(!name && !make &&!status){
            models = await Model.find({}).populate({path:"make",select:"name"}).lean()
        }else{
            if(make.length){
                const makeDoc = await Make.findOne({name:make})
                make = makeDoc._id
            }
            else make = null
            models = await Model.find({
                $or:[
                    {name:name},
                    {make:make},
                    {status:status}
                ]
            }).populate({path:"make",select:"name"})
        }
    }catch(err){
        res.status(500).json({
            success:false,
            message:"some error happen",
            error:err.message
        })
        return
    }
    res.status(200).json({
        success:true,
        modelList:models
    })
}

