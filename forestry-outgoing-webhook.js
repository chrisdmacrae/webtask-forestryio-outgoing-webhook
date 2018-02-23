// Forestry will send a request whenever a publish or import action completes,
// https://forestry.io/docs/hosting/webhooks/#webhook-format
var request = require("request-promise")

/**
* @param context {WebtaskContext}
* @param cb {CompletionCallback}
*/
module.exports = function (context, cb) {
  console.log('Forestry request: ', context.body);
  
  // Send outgoing webhook on Forestry action success
  try {
    if (context.body.success) {
      var payload = {}
      
      // Send the outgoing Travis request; handle error from Travis
      request({
        method: 'POST',
        uri: context.data.URI,
        headers: {
          // Any necessary headers
        },
        body: payload,
        json: true
      })
        .then(function(res) {
          cb(null, res)
        })
        .catch(function(err) {
          cb(err)
        })
      
    // Log the error message from Forestry on failure
    } else {
       cb(context.body.error); 
    }
  // Catch all stack errors
  } catch(err) {
    cb(err)
  }
};
