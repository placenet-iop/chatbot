import axios from 'axios'

//const { API_BASE_URL } = process.env
const API_BASE_URL = "https://gaudi.placenet.app/"
const token = 'eyJhbGciOiJIUzI1NiJ9.e30.77jIMuXSD9tezpPN6A0mrG5AG8Vvgd32Qg5OTmjVvYA';


const apiService = axios.create({
    baseURL: API_BASE_URL,
  });

apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`

export const createThread = async () => {
    try {
      const response = await apiService.post('thread');
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
    const response = await apiService.post('tts', textToAudio, { responseType: 'blob' });
    return response;
  } catch (error) {
    error
  }
}