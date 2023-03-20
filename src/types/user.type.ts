export type TUser = {
  email: string;
  firstName: string;
  imageURL: string;
  lastName: string;
  linkURL: string | null;
  middleName: string | null;
  name: string;
  userID: string;
  friendCount?: number;
};
