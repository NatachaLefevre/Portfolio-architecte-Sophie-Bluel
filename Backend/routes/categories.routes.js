const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const categoriesCtrl = require('../controllers/categories.controller');

//router.post('/', auth, categoriesCtrl.create);
router.get('/', categoriesCtrl.findAll);


module.exports = router;
fetch('http://localhost:5678/api/works')
  .then(function (response) {
    // Traitement de la réponse ici
  })
  .catch(function (error) {
    // Gestion des erreurs ici
  });
