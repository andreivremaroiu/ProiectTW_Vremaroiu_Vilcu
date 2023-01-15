import React from 'react';

export default (props) => {
  const mockProjectDetailData = [
    {
      bugId: 321,
      description: 'a bug 1',
      status: 'status',
    },
    {
      bugId: 3212,
      description: 'a bug 2',
      status: 'status',
    },
    {
      bugId: 123,
      description: 'a bug 3',
      status: 'status',
    },
  ];
  return (
    <div className="container bg-white rounded-lg p-4">
      <ul className="list-reset">
        {mockProjectDetailData.map((item) => {
          return (
            <li className="py-2 flex items-center border-b border-gray-300 hover:bg-gray-200">
              <div className="w-1/3 text-lg font-medium text-gray-800">{item.bugId}</div>
              <div className="w-1/3 text-lg font-medium text-gray-800">{item.description}</div>
              <div className="w-1/3 text-lg font-medium text-gray-800">{item.status}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
