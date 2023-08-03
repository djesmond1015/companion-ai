'use client';

import { BeatLoader } from 'react-spinners';
import { useTheme } from 'next-themes';
import { Copy } from 'lucide-react';

import { cn } from '@/lib/utils';
import { ChatMessageType } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { BotAvatar } from '@/components/bot-avatar';
import { UserAvatar } from '@/components/user-avatar';
import { Button } from '@/components/ui/button';

export const ChatMessage = ({
  role,
  content,
  isLoading,
  src,
}: ChatMessageType) => {
  const { toast } = useToast();
  const { theme } = useTheme();

  const onCopy = () => {
    if (!content) {
      return;
    }

    navigator.clipboard.writeText(content);
    toast({
      description: 'Message copied to clipboard',
      duration: 3000,
    });
  };

  return (
    <div
      className={cn(
        'group flex items-center gap-x-3 py-4 w-full',
        role === 'user' && 'justify-end'
      )}
    >
      {role !== 'user' && src && <BotAvatar src={src} />}
      <div className='max-w-sm px-4 py-2 text-sm rounded-md bg-primary/10'>
        {isLoading ? (
          <BeatLoader color={theme === 'light' ? 'black' : 'white'} />
        ) : (
          content
        )}
      </div>
      {role === 'user' && <UserAvatar />}
      {role !== 'user' && !isLoading && (
        <Button
          onClick={onCopy}
          className='transition opcaity-0 group-hover:opacity-100'
          size='icon'
          variant='ghost'
          aria-label='Copy to clipboard'
        >
          <Copy className='w-4 h-4' />
        </Button>
      )}
    </div>
  );
};
