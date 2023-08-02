import { Companion } from '@prisma/client';
import Image from 'next/image';
import { Card, CardFooter, CardHeader } from './ui/card';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';

interface CompanionsProps {
  data: (Companion & {
    _count: {
      messages: number;
    };
  })[];
}

export const Companions = ({ data }: CompanionsProps) => {
  if (data.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center pt-10 space-y-3'>
        <div className='relative h-60 w-60'>
          <Image
            fill
            alt='Empty State'
            src='/empty.png'
            className='grayscale'
          />
        </div>
        <p className='text-sm text-muted-foreground'>No Companion found.</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-2 gap-4 pb-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
      {data.map((item) => (
        <Card
          key={item.name}
          className='transition border-0 cursor-pointer rounded-xl bg-primary/10 hover:opacity-75'
        >
          <Link href={`/chat/${item.id}`}>
            <CardHeader className='flex items-center justify-center text-center text-muted-foreground'>
              <div className='relative w-32 h-32'>
                <Image
                  fill
                  alt='Companion Character'
                  className='object-cover rounded-xl'
                  src={item.src}
                />
              </div>
              <p className='font-bold'>{item.name}</p>
              <p className='text-xs'>{item.description}</p>
            </CardHeader>
            <CardFooter className='flex items-center justify-between text-xs text-muted-foreground'>
              <p className='lowercase'>@{item.userName}</p>
              <div className='flex items-center'>
                <MessageSquare className='w-3 h-3 mr-1' />
                {item._count.messages}
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};
