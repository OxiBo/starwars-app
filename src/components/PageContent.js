function PageContent({ title, children }) {
  return (
    <div className="container">
      <h1 className="container__header">{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;
