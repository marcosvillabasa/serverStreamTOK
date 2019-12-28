let jwt = require('jsonwebtoken');

//check token

let checkToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.user = decoded.user;
        next();
    })
}

//check role
let checkAdminRole = (req, res, next) => {
    let user = req.user;

    if (user.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'User is not admin'
            }
        })
    }


}

module.exports = {
    checkToken,
    checkAdminRole
}
