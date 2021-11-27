import { Comment } from "./Comment";
import { Post } from "./Post";

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  evaluatedPosts: Post[];
  comments: Comment[];
}