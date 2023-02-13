const getIdFromUrl = (url) => {
  return url.match(/[0-9]+/);
};

export { getIdFromUrl };
