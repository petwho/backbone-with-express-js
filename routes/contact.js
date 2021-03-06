
/*
 * GET users listing.
 */
var Contact = require('../data/models/contact');
module.exports = function(app){
  app.get('/contacts', function(req, res, next) {
    Contact.find({}, function(err, contacts) {
      res.send(contacts);
    });
  });

  app.post('/contacts', function(req, res, next) {
    console.log(req.body);
    Contact.create(req.body, function(err, contact) {
      if(err) {
        throw err;
      }
      console.log("Doc created!\n");
      res.send(contact);
    });
  });

  app.del('/contacts/:id', function(req, res) {
    Contact.remove({_id: req.params.id}, function(err, result) {
      if(err) {
        throw err;
      }
      console.log('Doc was deleted!\n');
      return res.send({id: req.params.id}, 200);
    })
  });

  app.put('/contacts/:id', function(req, res) {
    delete req.body._id;
    Contact.update({_id: req.params.id}, req.body, function(err, contact) {
      if(err) {
        throw err;
      }
      res.send("Doc updated!\n");
    });
  })

};