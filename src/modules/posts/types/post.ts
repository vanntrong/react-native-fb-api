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
  attachments?: {
    data: {
      media: {
        image: {
          height: number;
          src: string;
          width: number;
        };
        source: string;
      };
      target: {
        id: string;
        url: string;
      };
      type: 'video_autoplay' | 'photo' | 'album' | 'video_inline';
      url: string;
    }[];
  };
};

export type TGetPostsResponse = {
  data: TPost[];
  paging: {
    next: string;
    previous: string;
  };
};
