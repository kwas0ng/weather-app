'use client'
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import { getAIRecommendations } from './utils/recommendation';
import OutfitRecommendation from './components/OutfitRecommendation';

export default function Home() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [aiRecommendation, setAIRecommendation] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!query || query== "") {
      setError('Please enter a city name.');
      setWeather(null);
      setAIRecommendation('');
      return;
    }

    try {
      const response = await fetch(`/api/weather?query=${encodeURIComponent(query)}`, { cache: 'no-store' });
      const data = await response.json();
      setWeather(data);

      if (response.ok) {
        try {
          const recommendation = await getAIRecommendations(data);
          setAIRecommendation(recommendation);
          console.log(aiRecommendation)
        } catch (aiError) {
          console.error('Error getting AI recommendations:', aiError);
          setError('Failed to get AI recommendations.');
        }
      }
    } catch (e) {
      setError('An error occurred while fetching weather data.');
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <form className="max-w-md mx-auto w-full mb-6" onSubmit={handleSubmit} >
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your location to get recommendations"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div>
        {weather && <WeatherDisplay weather={weather} />}
        {aiRecommendation &&  <OutfitRecommendation recommendation={aiRecommendation} />}
      </div>

    </main>
  );
}