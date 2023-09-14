export interface IPost {
  postId: string;
  username: string;
  userId: string;
  createdAt: string;
  caption: string;
  numLikes: number;
  media: string[] | null;
}
