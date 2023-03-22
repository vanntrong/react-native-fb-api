export type TUserGroup = {
  name: string;
  picture: {
    data: {
      url: string;
    };
  };
  description?: string;
  id: string;
};

export type TUserGroups = {
  id: string;
  data: TUserGroup[];
  paging: {
    cursors: {
      before: string;
      after: string;
    };
    next: string;
  };
};
