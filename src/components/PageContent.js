function PageContent({ title, children, className }) {
  return (
    <div
      className={`${
        className ? '' : 'container u-margin-top-small u-margin-bottom-big'
      }`}
    >
      <h1 className={`container__header ${className}`}>{title}</h1>
      <hr className={`style-two ${className ? '' : 'u-margin-top-small'}`} />
      {children}
    </div>
  );
}

export default PageContent;
