export interface Project {
  id?: string;
  name: string;
  desc?: string;
  coverImg: string;
  taskLists?: string[]; // 存放列表 id
  members?: string[]; // 成员 id 
}