export type ChatMessageType = {
  role: 'system' | 'user';
  content?: string;
  isLoading?: boolean;
  src?: string;
};
