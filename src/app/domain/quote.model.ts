export interface Quote {
  id?: string; // 插入数据库的时候，id是后台生成的，所以不一定有
  cn: string;
  pic: string;
  en: string;
}