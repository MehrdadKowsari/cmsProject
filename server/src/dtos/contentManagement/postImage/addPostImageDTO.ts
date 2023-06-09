export interface AddPostImageDTO{
  postId: string;
  name: string;
  description: string | null;
  image: string | null;
  imageSavePath: string | null;
  priority: number | null;
}

