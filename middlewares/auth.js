const jwt = require("jsonwebtoken");

let verificacionToken = (req, res, next) => {
    let token = req.headers.authorization;
    console.log(token);
    if (token != undefined && token.includes("Bearer")) {
        token = req.headers.authorization.split(" ")[1];

        if (!token)
            return res.status(403).json({
                ok: false,
                msg: "FORBIDDEN",
            });

        jwt.verify(token, process.env.SEED_TOKEN, (err, decoded) => {
            if (err)
                return res.status(404).json({
                    ok: false,
                    msg: err,
                });

            req.id = decoded.usuario;
            next();
        });
    } else
        return res.status(403).json({
            ok: false,
            msg: "FORBIDDEN",
        });
};

module.exports = {
    verificacionToken,
};