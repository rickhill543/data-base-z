const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // finds all tags
  console.log('======================');
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    order: [['id', 'DESC']],
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'price',
          'product_name',
          'stock',
          'category_id'
        ],
        through: ProductTag,
        as: 'products'
      }
    ]
  })
    .then(tagData => res.json(tagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // finds a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: [
          'id',
          'price',
          'product_name',
          'stock',
          'category_id'
        ],
        through: ProductTag,
        as: 'products'
      }
    ]
  })
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // creates a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(tagCreation => res.json(tagCreation))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // updated tag's name by its `id` value
  Tag.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(tagUpdate => {
      if (!tagUpdate[0]) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(tagUpdate);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // deletes a tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(tagDelete => {
      if (!tagDelete) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(tagDelete);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
