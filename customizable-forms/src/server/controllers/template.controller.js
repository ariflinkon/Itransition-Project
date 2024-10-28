const db = require('../models');
const Template = db.template;
const Question = db.question;
const User = db.user;

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



// Controller to handle creating a new template

exports.saveTemplate = async (req, res) => {
  try {
    const { title, description, questions, userId } = req.body;

    // Check if user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ error: 'Invalid userId, user does not exist' });
    }

    // Proceed with template creation
    const newTemplate = await Template.create({ title, description, userId });

    // Save associated questions
    if (questions && questions.length > 0) {
      const questionPromises = questions.map(q => Question.create({ ...q, templateId: newTemplate.id }));
      await Promise.all(questionPromises);
    }

    res.status(201).json(newTemplate);
  } catch (error) {
    console.error("Error saving template", error);
    res.status(500).json({ error: 'Error saving template' });
  }
};
