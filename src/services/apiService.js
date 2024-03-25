import axios from 'axios'

//const { API_BASE_URL } = process.env
const API_BASE_URL = "https://gaudi.placenet.app/"
const apiService = axios.create({
    baseURL: API_BASE_URL,
  });

export const createThread = async () => {
    try {
      const response = await apiService.post('threads');
      return response.data;
    } catch (error) {
      throw error;
    }
};

/*
export const deleteThread = async () => {
    try {
      const response = await apiService.delete('threads');
      return response.data;
    } catch (error) {
      throw error;
    }
};
*/

export const createMessage = async (dataMessage) => {
    try {
      const response = await apiService.post('message', dataMessage);
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const convertTextToAudio = async (text) => {
  try {
    const response = await apiService.post('voice');
    return response.data;
  } catch (error) {
    error
  }
}