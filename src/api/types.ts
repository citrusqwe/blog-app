export type UserLogin = {
  identifier: string;
  password: string;
};
export type UserRegister = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  avatar?: string;
};

export type ResponseLoginUser = {
  jwt: string;
  user: {
    blocked: null;
    confirmed: boolean;
    created_at: string;
    email: string;
    id: number;
    provider: string;
    role: {
      id: number;
      name: string;
      description: string;
      type: string;
    };
    updated_at: string;
    username: string;
  };
};
