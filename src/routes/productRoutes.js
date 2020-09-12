const express = require('express');
const Product = require('../models/Products');
const auth = require('../middleware/requireAuth');
const sharp = require('sharp');
const multer = require('multer');
const { update } = require('../models/Products');
const router = new express.Router();

router.post('/product/uploadproducts', auth, async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    res.status(200).send('product successfully sent!');
  } catch (e) {
    res.status(400).send(e.message);
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload a photo!'));
    }

    cb(undefined, true);
  }
});

router.post(
  '/products/img/:id',
  auth,
  upload.single('img'),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer).png().toBuffer();
    const product = await findOne({ id: req.params.id });
    product.img = buffer;
    await product.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.patch('/products/editproduct/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'price', 'img'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!!' });
  }
  try {
    const product = await Product.findOne({ id: req.params.id });
    update.updates.forEach((update) => (product[update] = req.body[update]));
    res.send();
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
