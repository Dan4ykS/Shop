const { Router } = require('express');

const router = Router();

router.get('/getBooks', async (req, res) => {
  try {
  } catch (error) {
    res.sendStatus(400);
    throw error;
  }
});

module.exports = router;
