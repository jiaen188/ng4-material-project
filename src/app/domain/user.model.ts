// 枚举类型
export enum IdentityType {
  IdCard = 0,
  Insurance,
  Passport,
  Military,
  Other
}

export interface Address {
  province: string;
  city: string;
  district: string;
  street?: string;
}

export interface Identity {
  identityNo: string;
  identityType: IdentityType
}


export interface User {
  id?: string;// 新增用户是没有id，所以是可有可无的
  email: string;
  password: string;
  name: string;
  avatar: string;
  projectIds: string[];
  address?: Address;
  identity?: Identity;
  dateOfBirth?: string;
} 