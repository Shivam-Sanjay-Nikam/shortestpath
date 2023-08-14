import React from 'react';

const Node = ({
  col,
  isFinish,
  isStart,
  isWall,
  row,
}) => {
  const extraClassName = isFinish
    ? 'bg-emerald-500 animate-spin'
    : isStart
    ? 'bg-yellow-500 animate-spin'
    : isWall
    ? 'bg-gray-400 border-0'
    : '';

  return (
    <div
      id={`node-${row}-${col}`}
      className={`border-[0.5px] border-gray-10  h-[15px] ${extraClassName}`}
    ></div>
  );
};

export default Node;
