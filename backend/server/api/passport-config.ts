import UserService from "./User/UserService";

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        const user = await UserService.findByEmail(email);
        console.log(`passpconfig user : ${user}`)
        if (!user) {
            return done(null, false, { message: "A user with that email doesn't exist" });
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                console.log("sucessfully compared passwords")
                return done(null, user);
            }
            return done(null, false, { message: "Incorrect password" });
        } catch (err) {
            done(err);
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' },
        authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        return done(null, await UserService.findById(id));
    });
}

module.exports = initialize;