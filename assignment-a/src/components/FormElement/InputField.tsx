// components/InputField.tsx

import React, { ChangeEvent } from "react";

interface InputFieldProps {
  type: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  id,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      type={type}
      className="form-control"
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputField;
