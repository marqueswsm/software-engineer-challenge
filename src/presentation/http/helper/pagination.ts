import * as R from 'ramda';

type PaginateParams = {
  entity: string;
  values: Array<Object>;
  page: string;
}

const LIMIT = 2;
const START_PAGE = 0;

export function paginate(params: PaginateParams) {
  let page = parseInt(params.page, 10);
  let startIndex;
  let endIndex;

  if (!page || page < 0) {
    page = START_PAGE;
    startIndex = page * LIMIT;
    endIndex = LIMIT;
  } else if (page === 1) {
    startIndex = START_PAGE;
    endIndex = LIMIT;
  } else {
    startIndex = (page - 1) * LIMIT;
    endIndex = page * LIMIT;
  }

  let response = {
    [params.entity]: params.values.slice(startIndex, endIndex),
    totalRegisters: params.values.length,
    limit: LIMIT,
  };

  if (endIndex > params.values.length) {
    response = R.assoc('hasNextPage', false, response);
  } else {
    response = R.mergeDeepRight(response, {
      hasNextPage: true,
      nextPage: page + 1,
    });
  }

  if (page === 1) {
    response = R.assoc('hasPreviusPage', false, response);
  } else {
    response = R.mergeDeepRight(response, {
      hasPreviusPage: true,
      previusPage: page - 1,
    });
  }

  return response;
}
