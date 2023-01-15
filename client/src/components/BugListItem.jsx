import React from 'react';
export default ({
  id,
  project_id,
  author,
  assigned_to,
  description,
  status,
  onClick,
}) => {
  return (
    <li onClick={onClick} className="flex gap-2 border-b border-gray-400 hover:bg-gray-200">
      <div className="flex-1 text-lg font-medium text-gray-800 m-2 pl-2">{project_id}</div>
      <div className="flex-1 text-lg font-medium text-gray-800 m-2 pl-2">{description}</div>
      <div className="flex-1 text-lg font-medium text-gray-800 m-2 pl-2">{status}</div>
</li>
  );
};
