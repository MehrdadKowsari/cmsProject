export interface AddPostImageDTO{
  postId: string;
  name: string;
  description: string | null;
  image: string | null;
  imageSavePath: string | null;
  imageExtension: string | null;
  imageSize: number | null;
  priority: number | null;
}

