const User = require("../models/user");
const bcrypt = require("bcrypt");
//jwt
let jwt = require("jsonwebtoken");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

let login = (req, res) => {
  let body = req.body;

  User.findOne({ email: body.email }, (err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }

    if (!userDB) {
      return res.status(500).json({
        ok: false,
        err: {
          message: "(User) or pass incorrect"
        }
      });
    }

    if (!bcrypt.compareSync(body.password, userDB.password)) {
      return res.status(500).json({
        ok: false,
        err: {
          message: "User or (pass) incorect"
        }
      });
    }

    let token = jwt.sign(
      {
        user: userDB
      },
      process.env.SEED,
      { expiresIn: process.env.EXPIRATION_TOKEN }
    );

    res.status(200).json({
      ok: true,
      user: userDB,
      token
    });
  });
};

//configuraciones de Google
async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];

  return {
    nombre: payload.name,
    email: payload.email,
    img: payload.picture,
    google: true
  };
}
// verify().catch(console.error);

let loginGoogle = async (req, res) => {
  let token = req.body.idtoken;

  // el metodo verify devuelve una promesa, por eso hay que usar await
  let googleUser = await verify(token).catch(e => {
    return res.status(403).json({
      ok: false,
      err: e
    });
  });

  User.findOne({ email: googleUser.email }, (err, userDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    if (userDB) {
      if (userDB.google === false) {
        return res.status(400).json({
          ok: false,
          err: {
            message: "Debe usar su autenticacion normal"
          }
        });
      } else {
        let token = jwt.sign(
          {
            user: userDB
          },
          process.env.SEED,
          { expiresIn: process.env.EXPIRATION_TOKEN }
        );

        res.json({
          ok: true,
          usuario: userDB,
          token
        });
      }
    } else {
      //si el user no existe en nuestra bd
      let usuario = new User();
      usuario.email = googleUser.email;
      usuario.img = googleUser.picture;
      usuario.google = true;
      usuario.password = "mmmmm";

      usuario.save((err, userDB) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            err
          });
        }

        let token = jwt.sign(
          {
            user: userDB
          },
          process.env.SEED,
          { expiresIn: process.env.EXPIRATION_TOKEN }
        );

        res.json({
          ok: true,
          usuario: userDB,
          token
        });
      });
    }
  });
};

module.exports = {
  login,
  loginGoogle
};
