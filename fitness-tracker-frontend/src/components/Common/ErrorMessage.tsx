import React from 'react';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <div className="error-message">
      <span>{message}</span>
      {onClose && (
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;