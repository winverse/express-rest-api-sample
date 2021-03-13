const validateSchema = (res, schema, body) => {
  const { error } = schema.validate(body);
  const isDev = process.env.NODE_ENV !== 'production';
  if (error) {
    const message = isDev ? error.details[0].message : 'Bad request';
    res.status(400).send(message);
    return false;
  }
  return true;
};

module.exports = {
  validateSchema,
};
