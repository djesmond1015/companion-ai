// PATCH DELETE

import prismadb from '@/lib/prismadb';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { companionId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, categoryId, instructions, seed } = body;

    if (!params.companionId) {
      return new NextResponse('Companion Id is required', { status: 400 });
    }

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (
      !src ||
      !name ||
      !description ||
      !categoryId ||
      !instructions ||
      !seed
    ) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // TODO: check subscription

    const companion = await prismadb.companion.update({
      where: {
        userId: user.id,
        id: params.companionId,
      },
      data: {
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
        categoryId,
      },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log('[PATCH_COMPANIONID]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
