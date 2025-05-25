import { useParams } from "react-router-dom";
import { featuredGames, popularGames } from "@/data/games";
import { cn } from "@/lib/utils"; // 确保cn函数已被导入
import { useState, useEffect, useRef } from "react"; // Import necessary hooks

export default function GamePage() {
  const { id } = useParams();
  
  // 合并特色游戏和热门游戏，查找指定ID的游戏
  const allGames = [...featuredGames, ...popularGames];
  const game = allGames.find(g => g.id === id);

  const iframeRef = useRef<HTMLIFrameElement>(null); // Ref for the iframe
  const errorDivRef = useRef<HTMLDivElement>(null); // Ref for the error div
  const [showError, setShowError] = useState(false); // State to control error message display

  // Function to show the error message
  const displayError = () => {
    if (errorDivRef.current && iframeRef.current) {
      errorDivRef.current.style.display = 'flex';
      iframeRef.current.style.display = 'none';
      setShowError(true);
    }
  };

  // Function to hide the error message
  const hideError = () => {
     if (errorDivRef.current && iframeRef.current) {
       errorDivRef.current.style.display = 'none';
       iframeRef.current.style.display = 'block';
       setShowError(false);
     }
  };

  useEffect(() => {
    // Apply timeout check only for games with iframes that might fail to load visibly
    if (id === '3' || id === '4') { // Apply to game 3 and 4
      const timer = setTimeout(() => {
        try {
          if (iframeRef.current && (!iframeRef.current.contentWindow || iframeRef.current.contentWindow.length === 0)) {
             displayError();
          }
        } catch (e) {
           console.error("Error checking iframe content window:", e);
           displayError();
        }
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [id]);

  if (!game) {
    return <div className="text-center py-8">游戏不存在</div>;
  }

  // 根据游戏ID返回不同的内容
  if (id === '1') {
    // 使用提供的HTML内容结构和iframe，转换为JSX
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Monster Survivors</h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">Survive endless waves of monsters in this thrilling action-packed adventure!</p>
          </section>

          {/* Game Section */}
         <section className="mb-12">
            <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden shadow-xl"> {/* 16:9比例 */}
                <iframe
                    src="https://cloud.onlinegames.io/games/2025/unity/monster-survivors/index-og.html"
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allowFullScreen>
                </iframe>
            </div>
        </section>

          {/* Game Description */}
          <section className="grid md:grid-cols-2 gap-8">
              <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Game Features</h2>
                  <ul className="space-y-2 text-gray-700">
                      <li>🎮 Intense survival gameplay</li>
                      <li>⚔️ Multiple character choices</li>
                      <li>🎯 Various weapons and abilities</li>
                      <li>🌟 Progressive difficulty system</li>
                  </ul>
              </div>
              <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Play</h2>
                  <ul className="space-y-2 text-gray-700">
                      <li>Use WASD or arrow keys to move</li>
                      <li>Collect experience to level up</li>
                      <li>Choose power-ups wisely</li>
                      <li>Survive as long as possible!</li>
                  </ul>
              </div>
          </section>

          {/* Game Tips */}
          <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Pro Tips</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-700">
                      Start with basic movements and gradually master the advanced techniques. Keep moving to avoid enemy attacks and collect power-ups to enhance your survival chances. Remember to upgrade your abilities strategically as you level up!
                  </p>
              </div>
          </section>
        </main>

        <footer className="bg-gray-900 text-white py-6 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
              {/* 使用 game.title 或硬编码 "Monster Survivors"，这里使用硬编码保持一致 */}
              <p>&copy; 2024 Monster Survivors. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }

  if (id === '2') {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Road Battle: Gather the Gang</h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">Join the ultimate street racing adventure and build your dream team!</p>
          </section>

          {/* Game Section */}
          <section className="mb-12">
            <div className="relative w-full max-w-[960px] mx-auto overflow-hidden bg-gray-100 rounded-lg shadow-xl">
              <iframe 
                id="game-iframe"
                className="w-full h-[600px] border-none block"
                src="https://games.crazygames.com/en_US/road-battle-gather-the-gang-vvf/index.html"
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                onError={() => {
                  const errorDiv = document.getElementById('game-error');
                  const iframe = document.getElementById('game-iframe');
                  if (errorDiv && iframe) {
                    errorDiv.style.display = 'flex';
                    iframe.style.display = 'none';
                  }
                }}
                onLoad={() => {
                  const errorDiv = document.getElementById('game-error');
                  const iframe = document.getElementById('game-iframe');
                  if (errorDiv && iframe) {
                    errorDiv.style.display = 'none';
                    iframe.style.display = 'block';
                  }
                }}
              />
              <div 
                id="game-error" 
                className="hidden w-full h-[600px] text-center p-5 bg-red-100 text-red-800 border border-red-200 rounded flex flex-col justify-center items-center"
              >
                <p className="mb-4">很抱歉，游戏加载失败。请检查您的网络连接或者稍后再试。</p>
                <a 
                  href="https://www.crazygames.com/game/road-battle-gather-the-gang" 
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors" 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  直接访问游戏页面
                </a>
              </div>
            </div>
          </section>

          {/* Game Description */}
          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Game Features</h2>
              <ul className="space-y-2 text-gray-700">
                <li>🏎️ Intense street racing action</li>
                <li>👥 Recruit and manage your racing team</li>
                <li>🏆 Compete in thrilling tournaments</li>
                <li>🚗 Customize and upgrade your vehicles</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Play</h2>
              <ul className="space-y-2 text-gray-700">
                <li>Use arrow keys to control your car</li>
                <li>Collect power-ups during races</li>
                <li>Manage your team's resources</li>
                <li>Win races to unlock new content</li>
              </ul>
            </div>
          </section>

          {/* Game Tips */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pro Tips</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700">
                Master the art of drifting and timing your boosts for maximum speed. Build a balanced team with different specialties to tackle various race types. Remember to upgrade your vehicles strategically and choose the right team members for each race to maximize your chances of victory!
              </p>
            </div>
          </section>
        </main>

        <footer className="bg-gray-900 text-white py-6 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p>&copy; 2024 Road Battle: Gather the Gang. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }

  // New case for game ID 3
  if (id === '3') {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Title Section */}
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Snake Shooter</h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">Survive the ultimate snake battle in 3D arena!</p>
          </section>

          {/* Game Embed Section */}
          <section className="mb-12">
            <div className="relative w-full max-w-[960px] mx-auto overflow-hidden bg-gray-100 rounded-lg shadow-xl">
              <iframe
                ref={iframeRef} // Attach ref
                id="game-iframe-3" // Use a unique ID if needed, though ref is preferred
                className="w-full h-[600px] border-none block" // Use Tailwind equivalent classes
                src="https://www.crazygames.com/embed/snake-shooter-cbu"
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                onError={displayError} // Use React function
                onLoad={hideError} // Use React function
              >
              </iframe>
              {showError && ( // Conditionally render error div based on state
                 <div
                    ref={errorDivRef} // Attach ref
                    id="game-error-3" // Use a unique ID if needed
                    className="w-full h-[600px] text-center p-5 bg-red-100 text-red-800 border border-red-200 rounded flex flex-col justify-center items-center"
                    style={{ display: showError ? 'flex' : 'none' }} // Control display via style based on state
                 >
                     <p className="mb-4">很抱歉，游戏加载失败。请检查您的网络连接或者稍后再试。</p>
                     {/* Optional: Add a link to the game page */} 
                     <a 
                       href="https://www.crazygames.com/game/snake-shooter-cbu"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                     >
                        直接访问游戏页面
                     </a>
                 </div>
              )}
            </div>
          </section>

          {/* Game Features */}
          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Game Features</h2>
                <ul className="space-y-2 text-gray-700">
                    <li>🐍 Immersive 3D snake battles</li>
                    <li>🔫 Multiple weapons & upgradesystem</li> {/* Fix typo: upgradesystem -> upgrade system */} 
                    <li>🎯 Smart enemy AI system</li>
                    <li>🏆 20+ challenging levels</li>
                </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Controls</h2>
              <ul className="space-y-2 text-gray-700">
                  <li>Arrow keys/WASD to move</li>
                  <li>Spacebar to shoot</li>
                  <li>Number keys to switch weapons</li>
                  <li>ESC to pause game</li>
              </ul>
            </div>
          </section>

          {/* 高手技巧 */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pro Tips</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700">
                  Prioritize upgrading movement speed for better mobility. Use environmental obstacles for cover during combat. Collect red energy orbs to activate rage mode. Strategically combine ranged weapons with melee attacks. Study enemy attack patterns and counter with weapon types they're vulnerable to!
              </p>
            </div>
          </section>
        </main>

        <footer className="bg-gray-900 text-white py-6 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p>&copy; 2024 Snake Shooter. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }

  // New case for game ID 4
  if (id === '4') {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <main className="max-w-6xl mx-auto px-4 py-8">
          {/* Title Section */}
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Plants vs. Zombies</h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">Defend your garden against the zombie invasion!</p>
          </section>

          {/* Game Embed Section */}
          <section className="mb-12">
            <div className="relative w-full max-w-[960px] mx-auto overflow-hidden bg-gray-100 rounded-lg shadow-xl">
              <iframe
                ref={iframeRef} // Attach ref
                id="game-iframe-4" // Use a unique ID
                className="w-full h-[600px] border-none block"
                src="https://roblnet13.github.io/pvz/game/iframe.html"
                frameBorder="0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                onError={displayError}
                onLoad={hideError}
              >
              </iframe>
               {showError && ( // Conditionally render error div based on state
                 <div
                    ref={errorDivRef}
                    id="game-error-4"
                    className="w-full h-[600px] text-center p-5 bg-red-100 text-red-800 border border-red-200 rounded flex flex-col justify-center items-center"
                    style={{ display: showError ? 'flex' : 'none' }}
                 >
                     <p className="mb-4">很抱歉，游戏加载失败。请检查您的网络连接或者稍后再试。</p>
                     {/* Optional: Add a link to the game page */} 
                     <a 
                       href="https://roblnet13.github.io/pvz/game/iframe.html"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                     >
                        直接访问游戏页面
                     </a>
                 </div>
              )}
            </div>
          </section>

          {/* Game Description */}
          <section className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Game Features</h2>
              <ul className="space-y-2 text-gray-700">
                  <li>🌻 Strategic plant defense system</li>
                  <li>🧟 26 types of zombie enemies</li>
                  <li>🛡️ 49 powerful plants to collect</li>
                  <li>🏆 50 fun-packed adventure levels</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Play</h2>
              <ul className="space-y-2 text-gray-700">
                  <li>Use mouse to plant defenses</li>
                  <li>Collect sunlight for resources</li>
                  <li>Balance sun production and defenses</li>
                  <li>Stop zombies from entering your house</li>
              </ul>
            </div>
          </section>

          {/* Game Tips */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pro Tips</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700">
                  Plant sunflowers early for maximum sunlight production. Use wall-nuts to slow down zombie advances. Combine peashooters with torchwood for boosted attacks. Remember to use potato mines strategically against buckethead zombies!
              </p>
            </div>
          </section>
        </main>

        <footer className="bg-gray-900 text-white py-6 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p>&copy; 2024 Plants vs. Zombies. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }

  // Default game page content
  // This will be rendered if the game ID is not 1, 2, 3, or 4
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Game Title and Description */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">{game.title}</h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">{game.description}</p>
        </section>

        {/* Placeholder Game Area or additional info */}
        <section className="mb-12">
          <div className="text-center text-gray-700">
            <p>游戏 {game.title} ({game.id}) 的详细页面正在建设中。</p>
            {/* You could add a placeholder image or link here */}
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2024 游戏乐园. 保留所有权利.</p>
        </div>
      </footer>
    </div>
  );
} 