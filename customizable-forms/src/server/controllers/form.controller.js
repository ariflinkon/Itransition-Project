const db = require('../models');
const Form = db.form;

exports.submitForm = async (req, res) => {
  try {
    const { templateId, responses } = req.body;
    const form = await Form.create({
      templateId,
      responses,
    });
    res.status(201).send(form);
  } catch (error) {
    res.status(500).send({ message: 'Error submitting form' });
  }
};
