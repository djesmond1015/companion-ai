export type ChatMessageType = {
  role: 'system' | 'user';
  content?: string;
  isLoading?: boolean;
  src?: string;
};

export type CompanionKeyType = {
  companionName: string;
  modelName: string;
  userId: string;
};
