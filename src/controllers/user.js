const User = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('underscore');

/**
 * Post user.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
let postUser = (req, res) => {
    let body = req.body;

    let user = new User({
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

        res.status(200).json({
            ok: true,
            user: userDB
        })
    })

}

/**
 * Update user.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
let updateUser = (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['email', 'img', 'role', 'state']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            user: userDB
        });
    })
}

/**
 * get users.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
let getUsers = (req, res) => {

    let from = req.body.from;
    from = Number(from);

    let limit = req.body.limit;
    limit = Number(limit);

    User.find({ state: true })
        .skip(from)
        .limit(limit)
        .exec((err, users) => {

            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.status(200).json({
                users
            })
        });
}

/**
 * delete User.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
let deleteUser = (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['email', 'img', 'role', 'state']);

    let changeState = {
        state: false
    }

    User.findByIdAndUpdate(id, changeState, { new: true }, (err, userDelete) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        if (userDelete === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'user not found'
                }
            });
        }

        res.status(200).json({
            ok: true,
            user: userDelete
        });
    })
}

let getUserById = async(req, res) => {
    let id = req.params.id;
    const user = await User.findById(id);
    res.status(201).json({ user });
}

module.exports = {
    postUser,
    updateUser,
    getUsers,
    deleteUser,
    getUserById
}
