import axios from 'axios'

//const { API_BASE_URL } = process.env
const API_BASE_URL = "https://gaudi.placenet.app/"
const apiService = axios.create({
    baseURL: API_BASE_URL,
  });

export const getAssistantsLocal = async () => {
  try {
    const response = await apiService.get('assistant/local');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const createAssistant = async (dataAssistant) => {
  try {
    const response = await apiService.post('assistant', dataAssistant)
    return response.data
  } catch (error) {
    throw error
  }
}

export const createThread = async () => {
    try {
      const response = await apiService.post('threads');
      return response.data;
    } catch (error) {
      throw error;
    }
};


export const deleteThread = async () => {
    try {
      const response = await apiService.delete('threads');
      return response.data;
    } catch (error) {
      throw error;
    }
};


export const createMessage = async (dataMessage) => {
    try {
      const response = await apiService.post('message', dataMessage);
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const convertTextToAudio = async (textToAudio) => {
  try {
    const response = await apiService.post('voice', textToAudio);
    return response;
  } catch (error) {
    error
  }
}