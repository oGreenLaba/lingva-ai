import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// Получение всех слов
export const getWords = async () => {
    try {
        const response = await axios.get(`${API_URL}/words`);
        return response.data;
    } catch (error) {
        console.error('Error fetching words:', error);
        throw error;
    }
};

// Добавление нового слова
export const addWord = async (word, translation, category, userId) => {
    try {
        const response = await axios.post(`${API_URL}/words`, {
            word,
            translation,
            category,
            userId
        });
        return response.data;
    } catch (error) {
        console.error('Error adding word:', error);
        throw error;
    }
};

// Регистрация пользователя
export const registerUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, {
            username,
            password
        });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

// Логин пользователя
export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, {
            username,
            password
        });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};
