import { NextResponse, NextRequest } from 'next/server';
import config from '../../../../tailwind.config';

const API_KEY = config.weatherstack.apiKey;
const BASE_URL = config.weatherstack.baseUrl;

export async function GET(request: NextRequest) {


  const query = request.nextUrl.searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }
  try {
    const response = await fetch(`${BASE_URL}current?query=${query}&access_key=${API_KEY}`);
    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.info }, { status: 400 });
    }
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}
