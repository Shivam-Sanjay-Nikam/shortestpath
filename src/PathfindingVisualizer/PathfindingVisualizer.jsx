import React, { useEffect, useState } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import '../PathfindingVisualizer/PathfindingVisualizer.css';
import Navbar from './Navbar';

const START_NODE_ROW = Math.floor(Math.random() * 40);
const START_NODE_COL = Math.floor(Math.random() * 100);
const FINISH_NODE_ROW = Math.floor(Math.random() * 40);
const FINISH_NODE_COL = Math.floor(Math.random() * 100);

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState(() => getInitialGrid());
  const [ct, setct] = useState(100)
  const [visible, setvisible] = useState(true)

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (!node.isStart) {
          document.getElementById(`node-${node.row}-${node.col}`).classList.add('bg-emerald-200');
        }
      }, 10 * i);
    }
  };

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (!node.isStart) {
          document.getElementById(`node-${node.row}-${node.col}`).classList.remove('bg-emerald-200');
          document.getElementById(`node-${node.row}-${node.col}`).classList.add('bg-rose-400');
        }
      }, 50 * i);
    }
  };

 
  const visualizeDijkstra = () => {
    setvisible(false);
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  function resetMaze() {
    setct(100);
  }

  useEffect(() => {
    if (ct !== 0) {
      setvisible(true);
      setGrid(getInitialGrid());
      setct(ct - 1);
    } else {
      setvisible(false);
    }
  }, [ct]);

  function getInitialGrid() {
    const initialGrid = [];
    for (let row = 0; row < 40; row++) {
      const currentRow = [];
      for (let col = 0; col < 100; col++) {
        const isStart = row === START_NODE_ROW && col === START_NODE_COL;
        const isFinish = row === FINISH_NODE_ROW && col === FINISH_NODE_COL;
        const isWall = !isStart && !isFinish && Math.random() < 0.1; // 30% probability of a cell being a wall
        currentRow.push({
          col,
          row,
          isStart,
          isFinish,
          distance: Infinity,
          isVisited: false,
          isWall,
          previousNode: null,
        });
      }
      initialGrid.push(currentRow);
    }
    return initialGrid;
  }

  return (
    <>
      <Navbar />
      <div className='m-4 justify-center border border-black'>
        <div className="border grid grid-cols-100 ">
          {grid.map((row, rowIdx) => (
            row.map((node, nodeIdx) => {
              const { row, col, isFinish, isStart, isWall } = node;
              return (
                <Node
                  key={nodeIdx}
                  col={col}
                  isFinish={isFinish}
                  isStart={isStart}
                  isWall={isWall}
                  row={row}
                />
              );
            })
          ))}
        </div>
      </div>
      <div className='flex justify-center gap-6'>
        <button
          className="bg-purple-800 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={visualizeDijkstra}
        >
          Visualize Dijkstra's Algorithm
        </button>
        <button
          className="bg-teal-800 hover:bg-teal-400 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={resetMaze}
        >
          Regenerate Random Maze
        </button>
        <div className='flex justify-center mt-4'>
          <div className={`rounded-lg border-4 border-purple-800 p-4 ${visible ? 'bg-purple-200' : 'bg-yellow-200'}`}>
            <p className="text-xl font-bold">
              {visible ? 'MAKING MAZE' : 'ENJOY THE VISUALIZATION'}
            </p>
          </div>
        </div>
      </div>
    </>
  );

};export default PathfindingVisualizer;
