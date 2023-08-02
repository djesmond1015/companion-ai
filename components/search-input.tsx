'use client';

import qs from 'query-string';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

import { useDebounce } from '@/hooks/use-debounce';
import { Input } from '@/components/ui/input';

export const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get('categoryId');
  const name = searchParams.get('name');

  const [value, setValue] = useState(name || '');
  const debounceValue = useDebounce<string>(value, 500);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const query = {
      name: debounceValue,
      categoryId: categoryId,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );

    router.push(url);
  }, [debounceValue, categoryId, router]);

  return (
    <div className='relative'>
      <Search className='absolute w-4 h-4 top-3 left-4 text-muted-foreground' />
      <Input
        onChange={onChange}
        value={value}
        placeholder='Search...'
        className='pl-10 bg-primary/10'
      />
    </div>
  );
};
