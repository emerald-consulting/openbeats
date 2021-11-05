export interface Post {
  postId: number;
  text?: string;
  title: string;
  genre?: string;
  file?: Express.Multer.File;
}
