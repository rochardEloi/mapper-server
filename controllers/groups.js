const Groups = require("../models/groups");


exports.createGroup = (req, res)=>{
    var group = new Groups({
        name: req.body.name,
        description: req.body.description,
        createAt : Date.now(),
        status : "Enable"
    })

    group.save()
     .then((response)=>{
        res.status(201).json({
           response :  response,
           message : "success"
        })
     })
     .catch((error)=>{
        console.log(error)
        res.status(500).json({message: "Server error", error : error.toString()})
     })
}

exports.getOneGroup = (req, res)=>{
    if(!req.params.id)
       res.status(401).json({
        message : "Group ID not found"
       })


    Groups.findOne({_id : req.params.id})
     .then((response)=>{
           res.status(201).json(response)
     })
     .catch((error)=>{
        console.log(error)
        res.status(500).json({message: "Server error", error : error.toString()})
     })
}

exports.globalGroups = (req, res)=>{ 
    const body = req.body ? req.body : {}
    Groups.find({...body})
     .then((response)=>{
           res.status(201).json(response)
     })
     .catch((error)=>{
        console.log(error)
        res.status(500).json({message: "Server error", error : error.toString()})
     })
}


exports.deleteOnGroup = (req, res)=>{
    if(!req.params.id)
       res.status(401).json({
        message : "Group ID not found"
       })


    Groups.deleteOne({_id : req.params.id})
     .then((response)=>{
           res.status(201).json({message : "deleted", response : response})
     })
     .catch((error)=>{
        console.log(error)
        res.status(500).json({message: "Server error", error : error.toString()})
     })
}

exports.updateOnGroup = (req, res)=>{
   if(!req.params.id)
      res.status(400).json({
       message : "Group ID not found"
      })


   Groups.updateOne({_id : req.params.id}, {
      ...req.body
   })
    .then((response)=>{
          res.status(201).json({message : "updated", response : response})
    })
    .catch((error)=>{
       console.log(error)
       res.status(500).json({message: "Server error", error : error.toString()})
    })
}
