type PaginateParams = {
  values: Array<Object>;
  page: number;
}

export function paginate(params: PaginateParams) {
  const response = {
    page: params.page,
    size: params.values.length,
    limit: 15,
    data: params.values,
  };

  return response;
}
