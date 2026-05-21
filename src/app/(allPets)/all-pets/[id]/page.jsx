import AdoptionForm from '@/components/AdoptionForm';
import PetDetails from '@/components/PetDetails';
import React from 'react';

const PetDetailsById = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`http://localhost:5000/pets/${id}`, {
    cache: 'no-store',
  });
  const singlePet = await res.json();

  return (
    <div className="min-h-screen bg-[#050211] py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* পেট ইনফরমেশন */}
          <div className="lg:col-span-8 h-full">
            <PetDetails singlePet={singlePet} />
          </div>

          {/* অ্যাডোপশন ফর্ম */}
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
