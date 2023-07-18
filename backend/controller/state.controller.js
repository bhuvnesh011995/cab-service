const State = require("../model/state.model");
const Country = require("../model/country.model")

exports.addState = async function(req,res,next){
    const {name,country,status,stateCode} = req.body;

    const countryDoc = await Country.findOne({name:country})

    console.log(countryDoc)
   const state =  await State.create({
        name:name,
        status:status,
        stateCode:stateCode,
        country:countryDoc._id
    })

    await Country.updateOne({name:country},{
        $push:{state:state._id}
    })

    res.status(204).end()
}

exports.getallState = async function(req,res,next){
    const {country} = req.query;

    let states = await Country.findOne({name:country}).populate({path:"state",select:{name:1,_id:0}})

    res.status(200).json(states.state)

}