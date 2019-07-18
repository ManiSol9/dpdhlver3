
'use strict';

var express = require('express');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var util = require('util');
var bunyan = require('bunyan');
var config = require('./config');
const server = require('https').createServer();

var server1 = "https://dpdlcpuxv3.azurewebsites.net"

//var server1 = "http://localhost:3000"

// set up database for express session
var MongoStore = require('connect-mongo')(expressSession);
var mongoose = require('mongoose');

// application insights

let appInsights = require("applicationinsights");
appInsights.setup("135a8b9b-a1cd-4e5c-baca-b71be3942950") .setSendLiveMetrics(true).start();

// Start QuickStart here

var OIDCStrategy = require('passport-azure-ad').OIDCStrategy;

var log = bunyan.createLogger({
    name: 'Microsoft OIDC Example Web Application'
});

// passport.serializeUser(function(user, done) {
//   done(null, user.oid);
// });

// passport.deserializeUser(function(oid, done) {
//   findByOid(oid, function (err, user) {
//     done(err, user);
//   });
// });

// // array to hold logged in users
// var users = [];

// var findByOid = function(oid, fn) {
//   for (var i = 0, len = users.length; i < len; i++) {
//     var user = users[i];
//    log.info('we are using user: ', user);
//     if (user.oid === oid) {
//       return fn(null, user);
//     }
//   }
//   return fn(null, null);
// };

// passport.use(new OIDCStrategy({
//     identityMetadata: config.creds.identityMetadata,
//     clientID: config.creds.clientID,
//     responseType: config.creds.responseType,
//     responseMode: config.creds.responseMode,
//     redirectUrl: config.creds.redirectUrl,
//     allowHttpForRedirectUrl: config.creds.allowHttpForRedirectUrl,
//     clientSecret: config.creds.clientSecret,
//     validateIssuer: config.creds.validateIssuer,
//     isB2C: config.creds.isB2C,
//     issuer: config.creds.issuer,
//     passReqToCallback: config.creds.passReqToCallback,
//     scope: config.creds.scope,
//     loggingLevel: config.creds.loggingLevel,
//     nonceLifetime: config.creds.nonceLifetime,
//     nonceMaxAmount: config.creds.nonceMaxAmount,
//     useCookieInsteadOfSession: config.creds.useCookieInsteadOfSession,
//     cookieEncryptionKeys: config.creds.cookieEncryptionKeys,
//     clockSkew: config.creds.clockSkew,
//     loggingNoPII: false
//   },
//   function(iss, sub, profile, accessToken, refreshToken, done) {
//     if (!profile.oid) {
//       return done(new Error("No oid found"), null);
//     }
//     // asynchronous verification, for effect...
//     process.nextTick(function () {
//       findByOid(profile.oid, function(err, user) {
//         if (err) {
//           return done(err);
//         }
//         if (!user) {
//           // "Auto-registration"
//           users.push(profile);
//           return done(null, profile);
//         }
//         return done(null, user);
//       });
//     });
//   }
// ));


var users = [];
 
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function (user, done) {
    done(null, user.oid);
});
 
passport.deserializeUser(function (id, done) {
    findByOID(id, function (err, user) {
        done(err, user);
    });
});
 
 
var findByOID = function (oid, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
 
        if (user.oid === oid) {
            return fn(null, user);
        }
    }
    console.log("Did not find user by OID: " + oid);
    return fn(null, null);
};
 
// Use the OIDCStrategy within Passport. (Section 2)
//
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier), and invoke a callback
//   with a user object.
passport.use(new OIDCStrategy({
       identityMetadata: config.creds.identityMetadata,
    clientID: config.creds.clientID,
    responseType: config.creds.responseType,
    responseMode: config.creds.responseMode,
    redirectUrl: config.creds.redirectUrl,
    allowHttpForRedirectUrl: config.creds.allowHttpForRedirectUrl,
    clientSecret: config.creds.clientSecret,
    validateIssuer: config.creds.validateIssuer,
    isB2C: config.creds.isB2C,
    issuer: config.creds.issuer,
    passReqToCallback: config.creds.passReqToCallback,
    scope: config.creds.scope,
    loggingLevel: config.creds.loggingLevel,
    nonceLifetime: config.creds.nonceLifetime,
    nonceMaxAmount: config.creds.nonceMaxAmount,
    useCookieInsteadOfSession: config.creds.useCookieInsteadOfSession,
    cookieEncryptionKeys: config.creds.cookieEncryptionKeys,
    clockSkew: config.creds.clockSkew,
    loggingNoPII: false
},
    function (iss, sub, profile, accessToken, refreshToken, done) {
        if (!profile.oid) {
            console.log(util.inspect(profile));
            return done(new Error("No OID found"), null);
        }
        // asynchronous verification, for effect…
        process.nextTick(function () {
            findByOID(profile.oid, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    // "Auto-registration"
                    users.push(profile);
                    return done(null, profile);
                }
                return done(null, user);
            });
        });
    }
));

var app = express();
app.use(express.logger());
app.use(methodOverride());
app.use(cookieParser());


// set up session middleware
if (config.useMongoDBSessionStore) {
  mongoose.connect(config.databaseUri);
  app.use(express.session({
    secret: 'secret',
    cookie: {maxAge: config.mongoDBSessionMaxAge * 1000},
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      clear_interval: config.mongoDBSessionMaxAge
    })
  }));
} else {
  app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: false }));
}

app.use(bodyParser.urlencoded({ extended : true }));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
//app.use(app.router);

app.use("/publish/index.html", function(req, res){
    console.log("FDFSDfsdfdfsd")
})




function checkAuthenticatedOnLogin(req,res,next){
  if (!req.isAuthenticated()) {
    res.send('You are not authorized to view this page');
  } else {
    next();
  }
}

app.use(express.static(__dirname + '/public'));
// app.use('/', ensureAuthenticated, function(req, res) {

//     console.log(req)

//   if(req.user == undefined){
//     res.render('/bu.html');
//   } else {
//     res.render('/dashboard.html', { user: req.user });
//   }

// });



// '/account' is only available to logged in user
app.get('/account', checkAuthenticatedOnLogin, function(req, res) {
  res.render('account', { user: req.user });
});

/*

app.get('/account', ensureAuthenticated, function(req, res) {
  res.render('account', { user: req.user });
});




app.get('/application', ensureAuthenticated, function(req, res) {
  res.render('app', { user: req.user });
});

app.get('/assetsData', ensureAuthenticated,  function(req, res) {
  res.render('assets', { user: req.user });
});


app.get('/businessunits', ensureAuthenticated, function(req, res) {
  res.render('bu', { user: req.user });
});

app.get('/devices', ensureAuthenticated, function(req, res) {    
  res.render('devices', { user: req.user });
});

app.get('/facilities', ensureAuthenticated, function(req, res) {
  res.render('facilities', { user: req.user });
});

app.get('/logs', function(req, res) {
  res.render('logs', { user: req.user });
});

app.get('/profile', ensureAuthenticated,  function(req, res) {
  res.render('profile', { user: req.user });
});


app.get('/reports', ensureAuthenticated, function(req, res) {
  res.render('reports', { user: req.user });
});

app.get('/users', ensureAuthenticated, function(req, res) {
  res.render('users', { user: req.user });
});

app.get('/dashboard', ensureAuthenticated, function(req, res) {
  res.render('dashboard', { user: req.user });
});

app.get('/association', ensureAuthenticated, function(req, res) {
  res.render('association', { user: req.user });
});

app.get('/shipments', ensureAuthenticated, function(req, res) {
  res.render('shipments', { user: req.user });
});

app.get('/others', ensureAuthenticated, function(req, res) {
  res.render('others', { user: req.user }); 
});

 

*/
app.use('/login',
  function(req, res, next) {
    passport.authenticate('azuread-openidconnect', 
      { 
        response: res,                      // required
        resourceURL: config.resourceURL,    // optional. Provide a value if you want to specify the resource.
        //customState: 'my_state',            // optional. Provide a value if you want to provide custom state value.
        failureRedirect: server1+'/index.html' 
      }
    )(req, res, next);
  },
  function(res) {
    log.info('Login was called in the Sample');
    console.log("maasasasas")
    res.redirect('/dashboard.html');
});

// 'GET returnURL'
// `passport.authenticate` will try to authenticate the content returned in
// query (such as authorization code). If authentication fails, user will be
// redirected to '/' (home page); otherwise, it passes to the next middleware.
app.use('/auth/openid/return',
  function(req, res, next) {
    passport.authenticate('azuread-openidconnect', 
      { 
        response: res,                      // required
        failureRedirect: server1+'/index.html'  
      }
    )(req, res, next);
  },
  function(req, res) {
    log.info('We received a return from AzureAD.');
    res.redirect(server1+'/dashboard.html');
  });

// 'POST returnURL'
// `passport.authenticate` will try to authenticate the content returned in
// body (such as authorization code). If authentication fails, user will be
// redirected to '/' (home page); otherwise, it passes to the next middleware.
app.post('/auth/openid/return',
  function(req, res, next) {

    console.log("sdasda")

    passport.authenticate('azuread-openidconnect', 
      { 
        response: res,                      // required
        failureRedirect: server1+'/index.html'  
      }
    )(req, res, next);
  },
  function(req, res) {
    log.info('We received a return from AzureAD.');
    res.redirect(server1+'/dashboard.html');
  });

// 'logout' route, logout from passport, and destroy the session with AAD.
app.get('/logout', function(req, res){
  req.session.destroy(function(err) {
    req.logOut();
    res.redirect(config.destroySessionUrl);
  });
});

//server.on('request', app);
app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
});
