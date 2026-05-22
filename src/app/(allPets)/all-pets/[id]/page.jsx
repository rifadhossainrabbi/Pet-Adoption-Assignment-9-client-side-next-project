import AdoptionForm from '@/components/AdoptionForm';
import PetDetails from '@/components/PetDetails';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const PetDetailsById = async ({ params }) => {
  const { id } = await params;
  const {token} = await auth.api.getToken({
    headers: await headers()
  })
  console.log(token)
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/pets/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const singlePet = await res.json();

  return (
    <div className="min-h-screen bg-[#050211] py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* pet information */}
          <div className="lg:col-span-8 h-full">
            <PetDetails singlePet={singlePet} />
          </div>

          {/* adoption form */}
          <div className="lg:col-span-4 h-full">
            <div className="sticky top-24">
              <AdoptionForm singlePet={singlePet} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsById;
