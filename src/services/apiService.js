import axios from 'axios'

//const { API_BASE_URL } = process.env
const API_BASE_URL = "https://gaudi.placenet.app/"
const token = 'eyJhbGciOiJIUzI1NiJ9.e30.77jIMuXSD9tezpPN6A0mrG5AG8Vvgd32Qg5OTmjVvYA';


const apiService = axios.create({
  baseURL: API_BASE_URL,
});

apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`

export const createThread = async (dataAssistant) => {
  try {
    const response = await apiService.post('thread', dataAssistant);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteThread = async () => {
  try {
    const response = await apiService.delete('thread');
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
    const response = await apiService.post(
      'tts',
      textToAudio,
      { responseType: 'blob' }
    );
    console.log('response to AUDIO', response)
    return response;
  } catch (error) {
    error
  }
}

export const analyzeImage = async (dataImage) => {
  try {
    const response = await apiService.post('image', dataImage);
    return response.data;
  } catch (error) {
    error
  }
}

export const getAssistantsLocal = async () => {
  try {
    const response = await apiService.get('assistant/local');
    return response.data;
  } catch (error) {
    error
  }
}

export const createAssistant = async (dataAssistant) => {
  try {
    const response = await apiService.post('assistant', dataAssistant);
    return response;
  } catch (error) {
    error
  }
}
