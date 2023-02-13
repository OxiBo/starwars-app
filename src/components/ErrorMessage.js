import React from 'react';
import PageContent from './PageContent';

const ErrorMessage = ({
  error = 'Woops! Something went wrong',
  titleStyle,
  textStyle,
}) => {
  if (!error) return null;

  return (
    <PageContent title="An error has occurred!" className={titleStyle}>
      <div
        className={`error ${
          titleStyle ? '' : 'u-margin-top-medium u-margin-bottom-medium'
        }`}
      >
        <p className={`error-message ${textStyle}`}>{error}</p>
      </div>
    </PageContent>
  );
};

export default ErrorMessage;
