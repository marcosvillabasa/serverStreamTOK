const Channel = require('../models/channel');
const _ = require('underscore');


const getChannels = async (req, res) => {

    Channel.find()
    .then(resp=> {
        res.status(200).json(resp)
    })
    .catch(error => {
        res.status(400).json(error)
    })
}

const getChannelId = (req,res) => {
        console.log(req.params.id)
        Channel.findById(req.params.id).then(channel => {
            res.status(200).json(channel)
        })
        .catch(err => {
            res.status(err).json(err)
        })
    
}

const createChannel = (req,res) => {
    console.log(req.body)
    const title = req.body.title.toUpperCase()
    const slug = req.body.slug
    const src = req.body.src

    let newChannel = new Channel({
        title,
        slug,
        src
    })

    newChannel.save().then(channel => {
        res.status(201).json(channel)
    }).catch(err => res.status(400).json({
        error: err
    }))
}

const updateChannel = async (req,res) => {
    const {id} = req.params
    const {slug, title, src, ...resto} = req.body
    let obj = {}
    if(slug){
        obj.slug=slug
    }
    if(title){
        obj.title=title
    }
    if(slug){
        obj.src=src
    }
 
    const channel = await Channel.findByIdAndUpdate(id, obj)
    if(!channel){
        return res.status(400).json({
            msg: 'No se encontro el objeto'
        })
    }
    res.status(200).json({
        id,
        msg: 'Put channel',
        channel
    })
}

const deleteChannel = (req,res) => {
    Channel.remove({_id:req.params.id}).then((resp)=>{
        res.json({
            resp,
            id: req.params.id
        })
    }).catch(err=>{
        res.status(400).json(err)
    })
}


module.exports = {
    createChannel,
    getChannels,
    getChannelId,
    updateChannel,
    deleteChannel
}
