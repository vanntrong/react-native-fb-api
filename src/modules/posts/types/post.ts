export type TPost = {
  name?: string;
  full_picture?: string;
  id: string;
  caption?: string;
  description?: string;
  created_time?: string;
};

export type TGetPostsResponse = {
  data: TPost[];
  paging: {
    next: string;
    previous: string;
  };
};
