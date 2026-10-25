const { generateSlug, getErrorMessage } = (() => {
  const generateSlug = (text) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

  const getErrorMessage = (err) =>
    err.response ? err.response.data.message : err.message;

  return { generateSlug, getErrorMessage };
})();

module.exports = { generateSlug, getErrorMessage };
