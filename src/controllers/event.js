const Event = require('../models/event');
const _ = require('underscore');

/**
 * Post Event.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
let postEvent = (req, res) => {
    let body = req.body;

    let event = new Event({
        song: body.song,
        artist: body.artist,
        festival: body.festival,
        dateStart: new Date(body.date),
        description: body.description,
        url: body.url,
    });

    event.save((err, eventDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.status(200).json({
            ok: true,
            event: eventDB
        })
    })

}

/**
 * Get Event.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
let getEvents = (req, res) => {

    Event.find({})
        .exec((err, events) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.status(200).json({
                events
            })
        })
}

/**
 * Update Event.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
let updateEvent = (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['song', 'description','artist', 'festival']);

    Event.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, eventDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            event: eventDB
        });
    })
}

/**
 * delete Event.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
let deleteEvent = (req, res) => {
    let id = req.params.id;

    let changeState = {
        state: false
    }

    Event.findByIdAndUpdate(id, changeState, { new: true }, (err, eventDelete) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        if (eventDelete === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'user not found'
                }
            });
        }

        res.status(200).json({
            ok: true,
            eventDelete
        });
    })
}

let getEventById = async(req, res) => {
    // let id = req.params.id;
    const event = await Event.findById(req.params.id);
    res.status(201).json({ event });
}

module.exports = {
    postEvent,
    getEvents,
    updateEvent,
    deleteEvent,
    getEventById
}
