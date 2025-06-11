interface Message {
  text: string;
  createdAt: number;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}
