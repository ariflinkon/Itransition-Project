const express = require('express');
const templateController = require('../controllers/template.controller');
const router = express.Router();

router.get('/templates', templateController.getAllTemplates);
router.get('/templates/:id', templateController.getTemplateById);
router.get('/:id/results', templateController.getResults);
router.post('/templates', templateController.saveTemplate);  // No need for templateId here


module.exports = router;
