export enum EPrivacy {
  SELF = 'SELF',
  ALL_FRIENDS = 'ALL_FRIENDS',
  EVERYONE = 'EVERYONE',
}

export type TPost = {
  name?: string;
  full_picture?: string;
  id: string;
  caption?: string;
  description?: string;
  created_time?: string;
  privacy: {
    allow: string;
    deny: string;
    description: string;
    friends: string;
    value: EPrivacy;
  };
};

export type TGetPostsResponse = {
  data: TPost[];
  paging: {
    next: string;
    previous: string;
  };
};
