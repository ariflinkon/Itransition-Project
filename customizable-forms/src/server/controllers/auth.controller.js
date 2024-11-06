// controllers/authController.js

const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const authConfig = require("../config/auth.config");

const {
  SALESFORCE_CLIENT_ID,
  SALESFORCE_CLIENT_SECRET,
  SALESFORCE_USERNAME,
  SALESFORCE_PASSWORD,
  SALESFORCE_SECURITY_TOKEN,
} = process.env;

const TOKEN_URL = "https://login.salesforce.com/services/oauth2/token";
const API_BASE_URL = "https://your_instance.salesforce.com/services/data/v52.0";

// Helper function to get Salesforce token
async function getSalesforceToken() {
  const payload = {
    grant_type: 'password',
    client_id: SALESFORCE_CLIENT_ID,
    client_secret: SALESFORCE_CLIENT_SECRET,
    username: SALESFORCE_USERNAME,
    password: `${SALESFORCE_PASSWORD}${SALESFORCE_SECURITY_TOKEN}`,
  };
  const response = await axios.post(TOKEN_URL, null, { params: payload });
  return response.data.access_token;
}

// User registration
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password and create new user in the database
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Salesforce Integration: Create Account and Contact
    try {
      const token = await getSalesforceToken();
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      // Step 1: Create Account in Salesforce
      const accountData = { Name: name, Type: 'Customer' };
      const accountResponse = await axios.post(
        `${API_BASE_URL}/sobjects/Account/`,
        accountData,
        { headers }
      );
      const accountId = accountResponse.data.id;

      // Step 2: Create Contact linked to Account in Salesforce
      const contactData = {
        FirstName: name.split(' ')[0],
        LastName: name.split(' ')[1] || '',
        Email: email,
        AccountId: accountId,
      };
      await axios.post(`${API_BASE_URL}/sobjects/Contact/`, contactData, { headers });

      console.log("Salesforce Account and Contact created successfully");
    } catch (salesforceError) {
      console.error("Error creating Salesforce Account or Contact:", salesforceError.message);
    }

    // Respond with success
    res.status(201).json({ message: "User registered successfully", userId: newUser.id });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "An error occurred during registration" });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      accessToken: token,
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "An error occurred during login" });
  }
};
