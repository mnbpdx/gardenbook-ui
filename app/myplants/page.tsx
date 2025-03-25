"use client";

import { useState, useEffect } from 'react';

interface Plant {
  id: number;
  name: string;
  scientificName: string;
  careLevel: string;
  waterFrequency: number;
  lastWatered?: string;
}

export default function MyPlantsPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlants = async () => {
      setIsLoading(true);
      setError('');
      
      const apiUrl = '/api/plants';
      
      try {
        console.log(`Fetching plants from: ${apiUrl}`);
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text().catch(() => 'No response body');
          throw new Error(`API error ${response.status}: ${errorText.substring(0, 100)}`);
        }

        const data = await response.json();
        console.log('Plants data received:', data);
        setPlants(data);
      } catch (error) {
        console.error(`Error fetching plants:`, error);
        setError(`${error instanceof Error ? error.message : 'Unknown error'}`);
        setPlants([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlants();
  }, []);

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-700">My Plants</h1>
        <p className="text-gray-600">Track and manage your plants</p>
      </header>

      {isLoading && (
        <div className="flex justify-center">
          <div className="animate-pulse flex space-x-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
          </div>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plants.length > 0 ? (
          plants.map((plant) => (
            <div key={plant.id} className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-100 rounded-md mb-4">
              </div>
              <h3 className="font-medium text-lg">{plant.name}</h3>
              <p className="text-sm text-gray-700">{plant.scientificName}</p>
              <p className="text-sm text-gray-600">Care Level: {plant.careLevel}</p>
              <p className="text-sm text-gray-600">Water every {plant.waterFrequency} days</p>
              <p className="text-sm text-gray-500">
                Last watered: {plant.lastWatered || 'Not recorded'}
              </p>
              <div className="mt-4 flex justify-between">
                <button className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm hover:bg-green-200">
                  Water
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-gray-200">
                  Details
                </button>
              </div>
            </div>
          ))
        ) : !isLoading && (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500">No plants found.</p>
          </div>
        )}
      </div>
    </div>
  );
}