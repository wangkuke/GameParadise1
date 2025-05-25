import { cn } from "@/lib/utils";
import { FeaturedGame, PopularGame } from "@/data/games";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface GameCardProps {
  game: FeaturedGame | PopularGame;
  aspectRatio?: '4/3' | '1/1';
  showRating?: boolean;
  className?: string;
}

export function GameCard({ game, aspectRatio = '4/3', showRating = false, className }: GameCardProps) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div 
      className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer",
        className
      )}
      onClick={() => navigate(`/game/${game.id}`)}
    >
      <div className={cn(
        aspectRatio === '4/3' ? 'aspect-[4/3]' : 'aspect-square',
        'w-full overflow-hidden relative'
      )}>
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img 
          src={imageError ? '/placeholder-game.jpg' : game.coverImage} 
          alt={game.title}
          className={cn(
            "w-full h-full object-cover",
            imageLoading ? 'opacity-0' : 'opacity-100'
          )}
          onError={() => setImageError(true)}
          onLoad={() => setImageLoading(false)}
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{game.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{game.description}</p>
        {showRating && 'rating' in game && (
          <div className="flex items-center" role="img" aria-label={`Rating: ${game.rating} out of 5 stars`}>
            {[...Array(5)].map((_, i) => (
              <i 
                key={i} 
                className={`fa-solid fa-star ${i < game.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                aria-hidden="true"
              />
            ))}
          </div>
        )}
        {'category' in game && (
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-2">
            {game.category}
          </span>
        )}
      </div>
    </div>
  );
}
