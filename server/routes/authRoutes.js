const passport = require("passport");

module.exports = app => {
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    app.get('/api/current_user', (req, res) => {
        // req object here contains the cookie
        res.send(req.user);
    });

    app.get('/api/logout', (req, res) => {
        // passport attaches the logout method to req object
        req.logout();
        res.redirect("/");
    });
};

