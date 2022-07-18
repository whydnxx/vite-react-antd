export interface ErrorResponse {
  statusCode?: number;
  message: string | string[];
  error: string;
}

export interface GenericResponse<T = void> {
  message: string;
  datas?: T;
  paging?: {
    limit: number;
    offset: number;
    count: number;
  };
}

export interface ILoginResponse {
  expires: number;
  expiresPrettyPrint: string;
  token: string;
}

export interface IPagingRequest {
  skip: number;
  limit: number;
}

export interface ISorterRequest {
  sortName: string;
  sortOrder: 'asc' | 'desc';
}

export interface IUser {}
