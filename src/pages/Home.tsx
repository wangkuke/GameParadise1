import { useState } from "react";
import { Link } from "react-router-dom";
import { featuredGames, popularGames, gameCategories } from "@/data/games";
import { GameCard } from "@/components/GameCard";
import { CategoryCard } from "@/components/CategoryCard";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    // 在实际应用中，这里应该调用搜索 API
    const searchResults = [...featuredGames, ...popularGames].filter(game => 
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    console.log("Search results:", searchResults);
    // TODO: 显示搜索结果
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm py-4 px-6 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Game Paradise
          </Link>
          
          {/* 移动端菜单按钮 */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'}`} />
          </button>

          {/* 桌面端导航 */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/game/2" className="text-gray-700 hover:text-blue-600">Games</Link>
            <Link to="/categories" className="text-gray-700 hover:text-blue-600">Categories</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
          </div>
        </div>

        {/* 移动端导航菜单 */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link 
              to="/" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/game/2" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Games
            </Link>
            <Link 
              to="/categories" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link 
              to="/about" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </div>
        )}
      </nav>

      {/* 英雄区域 */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Discover Your Next Favorite Game
          </h1>
          <p className="text-xl text-blue-100 mb-8">
          Explore thousands of games and find the perfect one for you
          </p>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex shadow-lg rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search for games..."
                className="flex-grow px-4 py-3 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search for games"
              />
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 transition-colors"
                aria-label="Search for games"
              >
                <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </section>

      <main className="flex-grow container mx-auto px-4 py-12">
        {/* 特色游戏 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Featured Games</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGames.map((game) => (
              <GameCard 
                key={game.id} 
                game={game}
              />
            ))}
          </div>
        </section>

        {/* 游戏分类 */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Game Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {gameCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        {/* 热门游戏 */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Popular Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularGames.map((game) => (
              <GameCard key={game.id} game={game} aspectRatio="1/1" showRating />
            ))}
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-gray-100 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>© {currentYear} Game Paradise. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}