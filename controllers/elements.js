const Elements = require("../models/elements")
const Groups = require("../models/groups")


exports.createElement = async (req, res) => {

    if(!req.params.group){
        return res.status(400).send({message: "Group not specified"})
    }
    
    let group
    try {
        group = await Groups.findOne({_id : req.params.group, status : "Enable"})
    } catch (error) {
        return res.status(400).send({message: "Error on searching group"})
    }

    if(!group){
        return res.status(400).send({message: "Group not found"})
    }

    const element = new Elements({
        name: req.body.name,
        description: req.body.description,
        createdAt: Date.now(),
        location: req.body.location,
        group_id: group._id,
        status: "Enable"
    })

    element.save()
        .then(element => {
            res.status(201).json({
                element: element,
                message: "success"
            })
        })
        .catch((error) => {
            res.status(500).json({ message: "Server error", error: error.toString() })
        })
}


exports.allElements = (req, res)=>{

    let body = req.body ? req.body : {}

    Elements.find({...body})
        .then((response)=>{
            res.status(200).json(response)
        }).catch((error)=>{
            res.status(500).json({ message: "Server error", error: "Error on searching elements"})
        })
}

exports.oneElement = (req, res)=>{

    if(!req.params.id){
        return res.status(400).send({message: "Element not specified"})
    }


    Elements.findOne({_id : req.params.id})
        .then((response)=>{
            res.status(200).json(response)
        }).catch((error)=>{
            res.status(500).json({ message: "Server error", error: "Error on searching elements"})
        })
}

exports.deleteElement = (req, res)=>{
    if(!req.params.id){
        return res.status(400).send({message: "Element not specified"})
    }


    Elements.deleteOne({_id : req.params.id})
        .then((response)=>{
            res.status(200).json({message : "deleted", response : response})
        }).catch((error)=>{
            res.status(500).json({ message: "Server error", error: "Error on deleting element"})
        })
}


exports.updateElement = (req, res)=>{
    if(!req.params.id){
        return res.status(400).send({message: "Element not specified"})
    }


    Elements.updateOne({_id : req.params.id}, {
        ...req.body
    })
        .then((response)=>{
            res.status(201).json({message : "updated", response : response})
        }).catch((error)=>{
            res.status(500).json({ message: "Server error", error: "Error on updating element"})
        })
}