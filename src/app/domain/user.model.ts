export interface User {
  id?: string;// 新增用户是没有id，所以是可有可无的
  email: string;
  password: string;
  name: string;
  avatar: string;
  projectIds: string[];
} 