const Linkedin = require('node-linkedin')('<Client ID>', '<Client Secret>'); // register your app on linked in to obtain these 2 parameters
Linkedin.auth.setCallback('http://localhost:3000/oauth/linkedin/callback');//this needs to be set in linked in app developer
var scope = ['r_basicprofile', 'r_emailaddress'];

module.exports = function (app) {

    app.get('/login', function (req, res) {
        Linkedin.auth.authorize(res, scope);
    });

    // for call back
    app.get('/oauth/linkedin/callback', function (req, res) {
        var promise = new Promise(function (resolve, reject) {
            Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function (err, results) {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                else {
                    var my_access_token = results.access_token;
                    var linkedin = Linkedin.init(my_access_token);
                    linkedin.people.me(function (err, $in) {
                        resolve($in);
                    });
                    linkedin.connections.retrieve(function (err, connections) {
                        console.log(connections);
                    });
                }
            })
        });
        promise.then(function (value) {
                res.redirect("<url of the front end consumer for this api where you want to redirect with linkedin data>" + "&UserName=" + value.formattedName + "&UserEmail=" + value.emailAddress + "&UserImageUrl=" + encodeURIComponent(value.pictureUrl) + "&Location=" + value.location.name + "&Connections=" + value.numConnections + "&LinkedInProfile=" + encodeURIComponent(value.publicProfileUrl));          
        });
});

}



