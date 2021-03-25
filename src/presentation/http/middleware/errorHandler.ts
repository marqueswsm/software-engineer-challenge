/* eslint-disable no-unused-vars */
export function errorHandler(err: any, req: any, res: any, next: any): void {
  let status = 500;
  let name = 'Error';

  if (err.code === 'USERS_NOT_FOUND') {
    status = 204;
  }

  if (err.code === 'BAD_REQUEST') {
    name = err.code;
    status = 400;
  }
  res.status(status).send({
    name,
    message: err.message,
    details: err.details,
  });
}
