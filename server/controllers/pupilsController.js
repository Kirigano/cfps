'use strict';
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost/cfps');

function pupilsController(Pupil){
  function post(req, res){
    const pupil = new Pupil(req.body);

    if(!req.body) {
      res.status(400);
      return res.send('Invalid Info');
    }

    pupil.save();
    res.status(201);
    return res.json(pupil);
  }

  function get(req, res){
    let query = {};
    if(req.query){
      query = req.query;
    }
    Pupil.find(query, (err, pupils) => {
      //return res.json(pupils);
      if (err) {
        return res.send(err);
      }
      const returnPupils = pupils.map((pupil) => {
        const newPupil = pupil.toJSON();
        newPupil.links = {};
        newPupil.links.self = `http://${req.headers.host}/api/pupils/${pupil._id}`;
        return newPupil;
      })
      return res.json(returnPupils);
    });
  }
  return{ post, get };
}

module.exports = pupilsController;