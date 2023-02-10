import React from 'react';
import PageContent from './PageContent';

const ErrorMessage = ({ error = 'Something went wrong' }) => {
  if (!error) return null;

  return (
    <PageContent title="An error has occurred!">
      <div className="error">
        <p className="error-message">{error}</p>
      </div>
    </PageContent>
  );
};

export default ErrorMessage;
