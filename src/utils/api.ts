import { APIResponse } from '../types';
import mockedData from '../data/mockedAutoCompleteData.json';

const API_URL = 'https://dummyjson.com/products/search?q=';

export async function fetchSuggestions(inputText: string): Promise<APIResponse> {
    try {
        const response = await fetch(`${API_URL}${inputText}`);
        if (!response.ok) throw new Error('Failed to fetch');

        const data: APIResponse = await response.json();
        // Check if the products array is empty
        if (data.products.length === 0) {
            return mockedData; // Use mocked data if no results
        }
        return data;
    } catch (error) {
        console.error('Error:', error);
        // Fallback to mocked data
        return mockedData;
    }
}