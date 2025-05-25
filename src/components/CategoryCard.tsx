import { GameCategory } from "@/data/games";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  category: GameCategory;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const navigate = useNavigate();

  return (
    <div 
      className="flex flex-col items-center cursor-pointer group"
      onClick={() => navigate(`/category/${category.id}`)}
    >
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-2 group-hover:shadow-lg transition-shadow">
        <i className={`${category.icon} text-white text-xl`} />
      </div>
      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
        {category.name}
      </span>
    </div>
  );
}
