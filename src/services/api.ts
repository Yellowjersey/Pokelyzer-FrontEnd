import axios from 'axios';
import { PokemonCardData } from '../types/pokemon';

const API_BASE_URL = 'https://pokelyzer.onrender.com';


export const predictCard = async (
  setSlug: string,
  cardName: string,
  cardNumber: string,
  setNumber: string
): Promise<PokemonCardData> => {
  try {
    console.log('Making API request with params:', {
      set_slug: setSlug,
      card_name: cardName,
      card_number: cardNumber,
      set_number: setNumber,
    });
    
    const response = await axios.get(`${API_BASE_URL}/predict`, {
      params: {
        set_slug: setSlug,
        card_name: cardName,
        card_number: cardNumber,
        set_number: setNumber,
      },
    });
    
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
        params: error.config?.params
      });
    } else {
      console.error('Error fetching card data:', error);
    }
    throw error;
  }
};