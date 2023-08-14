import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-black p-4 justify-center">
      <div className="container mx-auto justify-center">
        <div className="flex items-center justify-center">
          <div className="text-white font-bold text-xl justify-center">Pathfinding Visualizer</div>
          {/* Add your navigation links here */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
