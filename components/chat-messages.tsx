'use client';

import { ElementRef, useEffect, useRef, useState } from 'react';

import { ChatMessageType } from '@/types';
import { Companion } from '@prisma/client';
import { ChatMessage } from '@/components/chat-message';

interface ChatMessagesProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  companion: Companion;
}

export const ChatMessages = ({
  messages = [],
  isLoading,
  companion,
}: ChatMessagesProps) => {
  const scrollRef = useRef<ElementRef<'div'>>(null);

  const [fakeLoading, setFakeLoading] = useState(
    messages.length === 0 ? true : false
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFakeLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  return (
    <div className='flex-1 pr-4 overflow-y-auto'>
      <ChatMessage
        isLoading={fakeLoading}
        src={companion.src}
        role='system'
        content={`Hello, I am ${companion.name}, ${companion.description}`}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          src={companion.src}
          content={message.content}
          role={message.role}
        />
      ))}
      {isLoading && (
        <ChatMessage
          src={companion.src}
          role='system'
          isLoading
        />
      )}
      <div ref={scrollRef} />
    </div>
  );
};
