
import React from 'react';

interface CardProps {
  title: string;
  value: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, value, children }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</h3>
    <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
    {children}
  </div>
);