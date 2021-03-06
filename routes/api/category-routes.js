const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // finds all categories
  console.log('======================');
  Category.findAll({
    attributes: ['id', 'category_name'],
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
      }
    ]
  })
    .then(categoryData => res.json(categoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // finds one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'category_name'],
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
      }
    ]
  })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // creates a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(categoryCreation => res.json(categoryCreation))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', (req, res) => {
  // updates a category by its `id` value
  Category.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(categoryUpdate => {
      if (!categoryUpdate[0]) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(categoryUpdate);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // deletes a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(categoryDelete => {
      if (!categoryDelete) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
      }
      res.json(categoryDelete);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
