var User = require('../models/user')
var jwt = require('jwt-simple')
var config = require('../config/dbConfig')


var functions = {
    addNew: function (req, res) {
        if ((!req.body.name) || (!req.body.password) || (!req.body.email) || (!req.body.phone)) {
            res.json({ success: false, msg: "Enter all fields" })
        }
        else {
            var newUser = User({
                name: req.body.name,
                password: req.body.password,
                phone: req.body.phone,
                email: req.body.email,
            });
            newUser.save(function (err, newUser) {
                if (err) {
                    res.json({ success: false, msg: 'failed to save' })
                } else {
                    res.json({ success: true, msg: 'successfully saved' })
                }
            })
        }
    },
    authenticate: function (req, res) {
        User.findOne({
            name: req.body.name,
        }, function (err, user) {
            if (err) throw err
            if (!user) {
                res.status(403).send({ success: false, msg: 'Authentication Failed,User not found' })
            }
            else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        var token = jwt.encode(user, config.secret)
                        res.json({ success: true, token: token })
                    }
                    else {
                        return res.status(403).send({ success: false, msg: 'Authentication Failed,wrong password' })
                    }
                })
            }
        }
        )
    },
    delete: function (req, res) {
        User.findOneAndDelete({ name: req.params.name }, (err, result) => {
            if (err) return res.status(500).json({ msg: err });
            const msg = {
                msg: "username deleted",
                name: req.params.name
            };
            return res.json(msg);
        })
    },
    getinfo: function (req, res) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === "Bearer") {
            var token = req.headers.authorization.split(' ')[1]
            var decodeToken = jwt.decode(token, config.secret)
            return res.json({ success: true, msg: 'Hello ' + decodeToken.name })
        }
        else {
            return res.json({ success: false, msg: 'No Headers' })
        }
    }
}

module.exports = functions