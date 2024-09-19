interface WeatherProps {
    weather: {
        location: { name: string; country: string };
        current: { temperature: number; weather_descriptions: string[]; weather_icons: string[] };
    }
}

export default function WeatherDisplay({ weather }: WeatherProps) {
    return (
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-lg shadow-lg text-white">
            <h2 className="text-3xl font-bold mb-4">{weather?.location?.name}, {weather?.location?.country}</h2>
            <div className="flex items-center justify-between mb-6 gap-4">
                <p className="text-5xl font-semibold">{weather?.current?.temperature}°C</p>
                <div className="flex flex-row items-center">
                    <p className="text-xl italic">{weather?.current?.weather_descriptions[0]}</p>
                    <img
                        src={weather?.current?.weather_icons[0]}
                        alt="weather icon"
                        className=" w-12 h-12 object-cover rounded-full  p-2"
                    />
                </div>

            </div>
        </div>
    );
}