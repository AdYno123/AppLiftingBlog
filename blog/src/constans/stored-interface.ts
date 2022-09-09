//http object response
export interface ServiceResponse<T> {
  message: string;
  success: boolean;
  data: T | null;
}
export interface ILogin {
  username: string;
  password: string;
}
export interface IAccessToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}
export interface ITenant {
  tenantId: string;
  apiKey: string;
  name: string;
  password: string;
  createdAt: string;
  lastUsedAt: string;
}
export interface IAuthContext {
  token: string;
  isLogged: boolean;
  userInfo: ITenant;
  login: (loginInfo: IAccessToken) => string;
  logout: (logout: true) => void;
}
export interface IArticles {
  pagination: IArtcilesPagination;
  items: IArtcilesItems[];
}
export interface IArtcilesPagination {
  offset: number;
  limit: number;
  total: number;
}
export interface IArtcilesItems {
  articleId?: string;
  title: string;
  perex?: string;
  imageId?: string;
  createdAt?: string;
  lastUpdatedAt?: string;
  comments?: IComment[];
  content?: string;
}
export interface IComment {
  commentId?: string;
  articleId: string;
  author: string;
  content: string;
  postedAt?: string;
  score?: number;
}
export interface IImageSend {
  image: IImageSendArray;
}
export interface IImageSendArray {
  type: string;
  format: string;
}
export enum EarticleFormIsOn {
  Edit = 0,
  NewArticle = 1,
}
