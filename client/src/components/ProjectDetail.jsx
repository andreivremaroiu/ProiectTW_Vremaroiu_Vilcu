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
    <div className="container">
      <ul className="list-reset">
        {mockProjectDetailData.map((item) => {
          return (
            <li className="py-2 flex border-b border-gray-300">
              <div className="w-1/3 text-gray-600">{item.bugId}</div>
              <div className="w-1/3 text-gray-600">{item.description}</div>
              <div className="w-1/3 text-gray-600">{item.status}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
