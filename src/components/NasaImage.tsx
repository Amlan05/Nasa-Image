"use client"; 
// Components/NasaImage.tsx
import { useEffect, useState } from 'react';

const NasaImage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchNasaImage = async () => {
      try {
        const response = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY");
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }
        const data = await response.json();
        setImageUrl(data.url);
      } catch (error) {
        console.error('Error fetching NASA image:', error);
      }
    };

    fetchNasaImage();
  }, []);

  return imageUrl ? (
    <div className="w-96 h-auto border border-gray-300 rounded-lg overflow-hidden p-4">
      <img src={imageUrl} alt="NASA APOD" className="w-full h-auto" />
    </div>
  ) : (
    <p className="text-xl text-gray-500">Loading...</p>
  );
};

export default NasaImage;
