const express = require('express');
const pupilsController = require('../controllers/pupilsController');
 
const routes = Pupil => {
  const pupilRouter = express.Router();
  const controller = pupilsController(Pupil);
  pupilRouter.route('/pupils')
    .post(controller.post)
    .get(controller.get);
  
    pupilRouter.use('/pupils/:pupilId', (req, res, next) => {
      Pupil.findById(req.params.pupilId, (err, pupil) => {
        if (err) {
          return res.send(err);
        }
        if (pupil) {
          req.pupil = pupil;
          return next();
        }
        return res.sendStatus(404);
      });
    });
    
    pupilRouter.route('/pupils/:pupilId')
      .get((req, res) => {
        const returnPupil = req.pupil.toJSON();
        returnPupil.links = {};
        let fName = req.pupil.fName.replace(' ','%20');
        returnPupil.links.filterByThisfName = `http;//${req.headers.host}/api/pupils/?fName=${fName}`;
        res.json(returnPupil);
      })

      .put((req, res) => {
        const { pupil } = req;
        pupil.fName = req.body.fName;
        pupil.mName = req.body.mName;
        pupil.sName = req.body.sName;
        pupil.dateOfBirth = req.body.dateOfBirth;
        pupil.classAdmitted = req.body.classAdmitted;
        pupil.dateOfAdmission = req.body.dateOfAdmission;
        req.pupil.save((err) => {
          if (err) {
            return res.send(err);
          }
          return res.json(pupil);
        });
      })
      
      .patch((req, res) => {
        const { pupil } = req;
        if (req.body._id) {
          delete req.body._id;
        }
        Object.entries(req.body).forEach((item) => {
          const key = item[0];
          const value = item[1];
          pupil[key] = value;
        });
        req.pupil.save((err) => {
          if (err) {
            return res.send(err);
          }
          return res.json(pupil);
        });
      })

      .delete((req, res) => {
        /* const id = req.params.id;

        if (!id) {
          res.status(400).json({msg: 'No  such pupil' });
         };
         
         res.json({
          msg: 'Pupil info deleted',
        }); */

        req.pupil.remove((err) => {
          if (err) {
            return res.send(err);
          }
          return res.sendStatus(204);
        });
      });

    return pupilRouter;
}

module.exports = routes;