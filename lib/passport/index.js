const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

const users = [
    { id: 1, username: 'permanaheri', password: 'password', email: 'permana@gmail.com' }
];

function findByUser(username, cb) {
    return users.find(item => {
        if (item.username == username) {
            return cb(null, item)
        }

        return cb(null, null)
    })
}

passport.use(new BasicStrategy(
    (username, password, done) => {

        process.nextTick(() => {

            findByUser(username, (err, user) => {

                if (err) {
                    return done(err)
                }

                if (!user) {
                    return done(null, false)
                }

                if (user.password != password) {
                    return done(null, false)
                }

                return done(null, user)

            })

        })

    }
));

exports.isAuthenticated = passport.authenticate('basic', { session: false });