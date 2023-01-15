import React from 'react';

export default (props) => {
  const mockProjectDetailData = [
    {
      bugId: 1,
      description: 'primul bug',
      status: 'solved',
    },
    {
      bugId: 2,
      description: 'second bug',
      status: 'unsolved',
    },
    {
      bugId: 3,
      description: 'what is this',
      status: 'solved',
    },
  ];
  return (
    <table className="table-auto">
    <thead>
        <tr className="bg-gray-300">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Status</th>
        </tr>
    </thead>
    <tbody>
        {mockProjectDetailData.map((item) => {
            return (
                <tr className="border-b border-gray-300 hover:bg-gray-200">
                    <td className="px-4 py-2 text-lg font-medium text-gray-800">{item.bugId}</td>
                    <td className="px-4 py-2 text-lg font-medium text-gray-800">{item.description}</td>
                    <td className="px-4 py-2 text-lg font-medium text-gray-800">{item.status}</td>
                </tr>
            );
        })}
    </tbody>
</table>
  );
};
