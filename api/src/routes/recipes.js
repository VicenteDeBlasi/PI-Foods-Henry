const { Router } = require('express');
const {getRecipeByName, getRecipeById} = require(`../controllers/getRecipe.js`);
const postRecipe = require(`../controllers/postRecipe.js`);
const deleteRecipe = require('../controllers/deleteRecipe.js');

const router = Router();

//* recibe un name por req.query (?name=string) 
router.get("/", getRecipeByName);

//* recibe un id por req.params (URL/.../n) where n = INT(api) or UUID(db)
router.get("/:id", getRecipeById);

//* recibe por req.body todo lo necesario para crear una nueva receta ({ name, image, summary, healthScore, steps, diets } = req.body)
router.post("/", postRecipe);

//* recibe un id por req.params (URL/.../n) where n = INT(api) or UUID(db)
router.delete("/:id", deleteRecipe);

module.exports = router; 