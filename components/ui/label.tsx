import React from "react";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ children, ...props }) => (
  <label className="block text-sm font-medium text-gray-700 mb-1" {...props}>
    {children}
  </label>
);
