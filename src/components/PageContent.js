function PageContent({ title, children }) {
  return (
    <div className="container u-margin-top-small u-margin-bottom-big">
      <h1 className="container__header">{title}</h1>
      <hr className="style-two u-margin-top-small" />
      {children}
    </div>
  );
}

export default PageContent;
