const db = require('../models');
const Template = db.template;
const Question = db.question;

// Controller to handle fetching all templates
exports.getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.findAll();
    res.status(200).send(templates);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching templates' });
  }
};

// Controller to handle fetching a specific template by ID, including its questions
exports.getTemplateById = async (req, res) => {
  try {
    const template = await Template.findByPk(req.params.id, {
      include: [Question]
    });
    if (!template) {
      return res.status(404).send({ message: 'Template not found' });
    }
    res.status(200).send(template);
  } catch (err) {
    console.error('Error fetching template:', err); // Log the error details
    res.status(500).send({ message: 'Error fetching template' });
  }
};

// Controller to handle fetching all forms associated with a specific template ID
exports.getResults = async (req, res) => {
  try {
    const forms = await db.form.findAll({
      where: { templateId: req.params.id },
    });
    res.status(200).send(forms);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching results' });
  }
};