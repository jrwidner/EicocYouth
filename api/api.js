const express = require('express');
const axios = require('axios');
const morgan = require('morgan');
const router = express.Router();

// Use morgan for logging
router.use(morgan('combined'));

// Route to add or update student details
router.post('/add-or-update-student-details', async (req, res) => {
  try {
    const response = await axios.post('https://<your-function-app-name>.azurewebsites.net/api/AddOrUpdateStudentDetails', req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error(`Error adding or updating student details: ${error.message}`);
    res.status(500).json({ error: `${error.message} - URL: https://<your-function-app-name>.azurewebsites.net/api/AddOrUpdateStudentDetails` });
  }
});

module.exports = router;
