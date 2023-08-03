import prismadb from '@/lib/prismadb';
import { auth, redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { CompanionForm } from './components/companion-form';
import { checkSubscription } from '@/lib/subscription';

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const validSubscription = await checkSubscription();

  if (!validSubscription) {
    return redirect('/');
  }

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.companionId,
      userId,
    },
  });

  const categories = await prismadb.category.findMany();

  return (
    <div className='bg-primary/10'>
      <CompanionForm
        initialData={companion}
        categories={categories}
      />
    </div>
  );
};

export default CompanionIdPage;
