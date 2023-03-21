export type TUser = {
  first_name: string;
  last_name: string;
  birthday: string;
  name: string;
  hometown?: {
    id: string;
    name: string;
  };
  gender?: string;
  picture?: {
    data: {
      url: string;
    };
  };
  email: string;
  friends?: TUserFriend;
  id: string;
};

export type TUserFriend = {
  data: any[];
  summary: {
    total_count: number;
  };
};

export type TUserLike = {
  id: string;
  data: {
    picture: {
      data: {
        url: string;
      };
    };
    name: string;
    id: string;
    followers_count: number;
  }[];
  paging: {
    cursors: {
      before: string;
      after: string;
    };
    next: string;
  };
};
