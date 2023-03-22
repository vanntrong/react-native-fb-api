export type TUserPageLike = {
  picture: {
    data: {
      url: string;
    };
  };
  description?: string;
  about?: string;
  name: string;
  id: string;
  followers_count: number;
};

export type TUserPageLikes = {
  id: string;
  data: TUserPageLike[];
  paging: {
    cursors: {
      before: string;
      after: string;
    };
    next: string;
  };
};
