import axios from 'axios';

const API_URL = process.env.REACT_APP_API_FORM_URL;

const getForms = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}getuserforms/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching forms:", error);
        throw error;
    }
};

const createForm = async (data) => {
    try {
        console.log(data);
        const response = await axios.post(`${API_URL}create`, data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Error creating form:", error.response.data);
            console.error("Status code:", error.response.status);
            console.error("Headers:", error.response.headers);
        } else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Error setting up request:", error.message);
        }
        throw error;
    }
};

const getForm = async (formId) => {
    try {
        const response = await axios.get(`${API_URL}form/${formId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching form:", error);
        throw error;
    }
};

const autoSave = async (data) => {
    try {
        console.log(data);
        const response = await axios.put(`${API_URL}editform/`, data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error auto-saving form:", error);
        throw error;
    }
};

const submitResponse = async (data) => {
    try {
        console.log(data);
        const response = await axios.post(`${API_URL}addresponse`, data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error submitting response:", error);
        throw error;
    }
};

const getResponse = async (formId) => {
    try {
        const response = await axios.get(`${API_URL}getresponse/${formId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching response:", error);
        throw error;
    }
};

const formService = {
    getForms,
    createForm,
    getForm,
    autoSave,
    submitResponse,
    getResponse
};

export default formService;