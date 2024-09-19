interface WeatherData {
    location: {
        name: string;
        country: string;
    };
    current: {
        temperature: number;
        weather_descriptions: string[];
        weather_code: number
    };
}

export async function getAIRecommendations(weatherData: WeatherData) {

    const { temperature, weather_descriptions } = weatherData.current

    // Function to get recommendation based on weather description
    const getRecommendation = (description: string, temp: number): string => {
        const lowercaseDesc = description.toLowerCase();

        if (lowercaseDesc.includes('rain') || lowercaseDesc.includes('drizzle')) {
            return "Don't forget your umbrella and waterproof jacket!";
        } else if (lowercaseDesc.includes('snow')) {
            return "Bundle up with a warm coat, gloves, and boots.";
        } else if (lowercaseDesc.includes('sunny') || lowercaseDesc.includes('clear')) {
            return temp > 25 ? "Wear light, breathable clothing and don't forget sunscreen!" : "Enjoy the sun, but bring a light jacket just in case.";
        } else if (lowercaseDesc.includes('cloudy') || lowercaseDesc.includes('overcast')) {
            return "A light jacket might be a good idea.";
        } else if (lowercaseDesc.includes('wind')) {
            return "Wear layers and consider a windbreaker.";
        } else {
            return "Dress comfortably for the temperature and be prepared for changing conditions.";
        }
    };

    const recommendation = getRecommendation(weather_descriptions[0], temperature);

    return recommendation;

}

