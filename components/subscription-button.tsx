'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import axios from 'axios';

import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

interface SubscriptionButtonProps {
  isPro: boolean;
}

export const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);

      const response = await axios.get('/api/stripe');

      window.location.href = response.data.url;
    } catch (error) {
      toast({
        description: 'Something went wrong',
        duration: 3000,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size='sm'
      onClick={onClick}
      disabled={loading}
      variant={isPro ? 'default' : 'premium'}
    >
      {isPro ? 'Manage Subscription' : 'Upgrade'}
      {!isPro && <Sparkles className='w-4 h-4 ml-2' />}
    </Button>
  );
};
