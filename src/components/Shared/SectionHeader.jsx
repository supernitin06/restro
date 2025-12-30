import React from 'react';

const SectionHeader = ({ title, description, action }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          {title}
        </h2>
        {description && (
          <p className="text-gray-400 mt-2">{description}</p>
        )}
      </div>
      {action && (
        <div className="mt-4 md:mt-0">
          {action}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;