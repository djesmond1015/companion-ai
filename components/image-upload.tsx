'use client';

import { useEffect, useState } from 'react';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
}

export const ImageUpload = ({
  value,
  onChange,
  disabled,
}: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return false;
  }

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div className='flex flex-col items-center justify-center w-full space-y-4'>
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={onUpload}
        uploadPreset='buspanz6'
      >
        <div className='flex flex-col items-center justify-center p-4 space-y-2 transition border-4 border-dashed rounded-lg border-primary/10 hover:opacity-75'>
          <div className='relative w-40 h-40'>
            <Image
              fill
              alt='Upload'
              src={value || '/placeholder.svg'}
              className='object-cover rounded-lg'
            />
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};
