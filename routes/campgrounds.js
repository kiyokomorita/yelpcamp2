const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware')
const multer  = require('multer')
const {storage} = require('../cloudinary');
const upload = multer({ storage});

router.route('/')
  .get(catchAsync(campgrounds.index))
  .post(isLoggedIn, upload.array('image'),validateCampground, catchAsync(campgrounds.createCampground))


  // 下の'app.get(/campgrounds/:id'....より、こちらが先に来なければならない。下ので止まってしまうため
router.get('/new',isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
  .get(catchAsync(campgrounds.showCampground))
  .put(isLoggedIn, isAuthor, upload.array('image'),validateCampground, catchAsync(campgrounds.updateCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))






// new の前だとnewを探してしまうので、newはデータがないので、止まってしまう


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))


module.exports = router;