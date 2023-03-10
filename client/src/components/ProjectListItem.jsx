import React from 'react';

export default ({ projectName, id, activeBugs, onClick }) => {
  return (
    <div className='flex justify-center'>
      <li onClick={onClick} className="flex justify-between">
        <div>{projectName}</div>
        <div>{id}</div>
        <div>{activeBugs}</div>
      </li>
    </div>
  );
};
