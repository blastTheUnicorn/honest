// expose the config directly to our app using module.exports.
module.exports = {

  'facebookAuth': {
    'clientID'      :     'secret-client-key-here',
    'clientSecret'  :     'secret-client-here',
    'callbackURL'   :     'http://localhost:8080/auth/facebook/callback' //must change this when deploying?
  },

  'twitterAuth': {
    'consumerKey'     :     'your-consumer-key-here',
    'consumerSecret'  :     'your-client-here',
    'callbackURL'     :     'http://localhost:8080/auth/twitter/callback' //must change this when deploying?
  },

  'googleAuth': {
    'clientID'        :     '',
    'clientSecret'    :     '',
    'callbackURL'     :     'http://localhost:8080/auth/google/callback'
  }

}