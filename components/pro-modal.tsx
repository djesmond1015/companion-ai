'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import { useProModal } from '@/hooks/use-pro-modal';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

export const ProModal = () => {
  const proModal = useProModal();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onSubscribe = async () => {
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
    <Dialog
      open={proModal.isOpen}
      onOpenChange={proModal.onClose}
    >
      <DialogContent>
        <DialogHeader className='space-y-4'>
          <DialogTitle className='text-center'>Upgrade to Pro</DialogTitle>
          <DialogDescription className='space-y-2 text-center'>
            Create
            <span className='mx-1 font-medium text-sky-500'>Custom AI</span>
            Companions!
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className='flex justify-between'>
          <p className='text-2xl font-medium'>
            $9 <span className='text-sm font-normal'>.99 / mo</span>
          </p>
          <Button
            onClick={onSubscribe}
            disabled={loading}
            variant='premium'
          >
            Subscribe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
