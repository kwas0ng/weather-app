import React from 'react';

interface OutfitRecommendationProps {
    recommendation: string;
}

export default function OutfitRecommendation({ recommendation }: OutfitRecommendationProps) {
    if (!recommendation) return null;

    return (
        <div className="mt-4 p-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2 text-white">Outfit Recommendations:</h2>
            <p className="text-gray-100">{recommendation}</p>
        </div>
    );
}