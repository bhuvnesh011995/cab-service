const db = require("../model/index")


exports.addEmailTemplate = async function (req,res,next){
    const {
        title,
        body,
        subject,
        forUsers,
        status
    } = req.body


    let template = await db.emailTemplate.create({
        title,
        body,
        subject,
        forUsers,
        status
    })

    res.status(200).json({
        success:true,
        message:"template created successfully"
    })
}



exports.filterEmailTemplate = async function(req,res,next){
    const {title,forUsers,status} = req.query

    if(!title && !forUsers && !status){
        var templates = await db.emailTemplate.find({})
    }else{
        templates = await db.emailTemplate.find({
            $or:[
                {status},
                {title},
                {forUsers}
            ]
        })
    }


    res.status(200).json({
        success:true,
        templates
    })
}



exports.addSmsTemplate = async function(req,res,next){
    let {
        title,
        body,
        forUsers,
        status,
    } = req.body;


    await db.smsTemplate.create({
        title,
        body,
        forUsers,
        status
    })

    res.status(200).json({
        success:true,
        message:"Template Created Successfully"
    })
}



exports.filterSmsTemplate = async function (req,res,next){
    let {title,status,forUsers} = req.query;

    if(!title && !status && !forUsers){
        var templates = await db.smsTemplate.find({})
    }else{
        templates = await db.smsTemplate.find({
            $or:[
                {title},
                {status},
                {forUsers}
            ]
        })
    }

    res.status(200).json({
        success:true,
        templates
    })
}