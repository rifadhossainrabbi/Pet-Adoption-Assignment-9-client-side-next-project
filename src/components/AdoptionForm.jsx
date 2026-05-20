'use client';
import { authClient } from '@/lib/auth-client';
import React from 'react';
import { useForm } from 'react-hook-form';

const AdoptionForm = ({ singlePet }) => {
  const { PetName } = singlePet;
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <>
      {user?.email === singlePet.ownerEmail ? (
        <p className="text-center font-bold text-red-500 p-10 bg-red-50 rounded-3xl">
          You cannot adopt your own pet
        </p>
      ) : (
        <div className="bg-[#FFF5F1] p-8 rounded-[32px] border border-orange-100 h-full flex flex-col shadow-sm">
          <h2 className="text-2xl font-black text-[#1A202C] mb-8">
            Adoption Request
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col flex-grow space-y-5"
          >
            {/* Pet Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                Pet Name
              </label>
              <input
                type="text"
                defaultValue={PetName}
                readOnly
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-white/70 text-gray-500 font-medium"
                {...register('petName')}
              />
            </div>

            {/* User Name  */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                Your Name
              </label>
              <input
                type="text"
                defaultValue={user?.name}
                readOnly
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-white/70 text-gray-500 font-medium"
                {...register('clientName')}
              />
            </div>

            {/* User Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase ml-1">
                Your Email
              </label>
              <input
                type="email"
                defaultValue={user?.email}
                readOnly
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none bg-white/70 text-gray-500 font-medium"
                {...register('email')}
              />
            </div>

            {/* Pickup Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                Pickup Date
              </label>
              <input
                type="date"
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-white text-gray-700 ${
                  errors.pickupDate
                    ? 'border-red-400'
                    : 'border-gray-200 focus:border-orange-300'
                }`}
                {...register('pickupDate', {
                  required: 'Please select a date',
                })}
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5 flex-grow">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">
                Message
              </label>
              <textarea
                placeholder="Tell us why you want to adopt..."
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all bg-white text-gray-700 flex-grow min-h-[120px] resize-none ${
                  errors.message
                    ? 'border-red-400'
                    : 'border-gray-200 focus:border-orange-300'
                }`}
                {...register('message', {
                  required: 'Please write a short message',
                })}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl text-white font-black text-lg shadow-lg shadow-orange-200 transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-4 bg-orange-500 hover:cursor-pointer"
            >
              🐾 Adopt Request
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AdoptionForm;
