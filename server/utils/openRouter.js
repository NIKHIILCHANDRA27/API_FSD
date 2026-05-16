import axios from 'axios';

const openRouter = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`
  }
});

export const generateInterviewQuestions = async (prompt, purpose) => {
  const payload = {
    model: process.env.OPENROUTER_MODEL || 'openai/gpt-5.2',
    input: prompt,
    max_tokens: 450,
    temperature: 0.8
  };
  const response = await openRouter.post('/chat/completions', payload);
  return response.data?.output?.[0]?.content || response.data?.output || 'No AI response available.';
};
