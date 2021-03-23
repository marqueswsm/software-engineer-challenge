/* eslint-disable no-unused-vars */
export function errorHandler(err, req, res, next): void {
  let status = 500;

  if (err.code === 'USERS_NOT_FOUND') {
    status = 204;
  }

  res.status(status).send({
    name: err.name,
    message: err.message,
  });
}
