import React from 'react';
import BodyNav from './BodyNav';
import DisplaySection from './DisplaySection';

export default () => {
  return (
    <div className="w-full bg-gray-200 rounded-lg p-4 flex justify-center align-center">
      <BodyNav className="mx-4" />
      <DisplaySection className="mx-4"/>
    </div>
  );
};
