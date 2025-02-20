import axios from 'axios';

const API_URL = 'http://localhost:8000/api/ppt/generate';

// 创建一个Axios实例，并设置超时时间为10分钟（600000毫秒）
const axiosInstance = axios.create({
  timeout: 600000, // 设置超时时间为10分钟
});

export const generatePPT = async (content: string) => {
  if (content.length < 6) {
    throw new Error('Content must be at least 6 characters long');
  }
  
  try {
    const response = await axiosInstance.post(API_URL, { content });
    return response.data;
  } catch (error) {
    console.error('Error generating PPT:', error);
    throw error;
  }
};