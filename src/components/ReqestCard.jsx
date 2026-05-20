'use client';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaRegEye, FaTrashAlt } from 'react-icons/fa';
import { CancleModal } from './CancleModal';

const RequestCard = ({ clientRequest }) => {
  console.log(clientRequest);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const myRequests =
    clientRequest?.filter(req => req.email === user?.email) || [];

  if (isPending)
    return <div className="p-10 text-center font-bold">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-black text-gray-800 mb-8">
        My Adoption Requests
      </h1>

      <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
        {/* Table Header - Desktop Only */}
        <div className="hidden md:grid grid-cols-12 bg-gray-50/50 p-6 border-b border-gray-100 text-[11px] font-black uppercase tracking-widest text-gray-400">
          <div className="col-span-4">Pet</div>
          <div className="col-span-2">Request Date</div>
          <div className="col-span-2">Pickup Date</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        {/* Data Rows */}
        <div className="divide-y divide-gray-50">
          {myRequests.length > 0 ? (
            myRequests.map(req => (
              <div
                key={req._id}
                className="grid grid-cols-1 md:grid-cols-12 items-center p-6 hover:bg-gray-50/30 transition-colors gap-4 md:gap-0"
              >
                {/* Pet Info */}
                <div className="col-span-4 flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-gray-100 shadow-sm shrink-0">
                    <Image
                      src={req.petImage || '/placeholder-pet.png'}
                      alt={req.petName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-bold text-gray-800">{req.petName}</span>
                </div>

                {/* Request Date */}
                <div className="col-span-2 text-sm font-semibold text-gray-500">
                  <span className="md:hidden text-[10px] block uppercase text-gray-300">
                    Request Date
                  </span>
                  N/A
                </div>

                {/* Pickup Date */}
                <div className="col-span-2 text-sm font-semibold text-gray-500">
                  <span className="md:hidden text-[10px] block uppercase text-gray-300">
                    Pickup Date
                  </span>
                  {new Date(req.pickupDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>

                {/* Status Pill */}
                <div className="col-span-2 flex justify-center">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      req.status === 'pending'
                        ? 'bg-orange-50 text-orange-500 border-orange-100'
                        : req.status === 'approved'
                          ? 'bg-emerald-50 text-emerald-500 border-emerald-100'
                          : 'bg-rose-50 text-rose-500 border-rose-100'
                    }`}
                  >
                    {req.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex justify-end gap-2">
                  <Link href={`/all-pets/${req.petId}`}>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold text-[10px] uppercase tracking-wider hover:bg-blue-600 hover:text-white transition-all active:scale-95">
                      <FaRegEye size={14} />
                      View
                    </button>
                  </Link>
                  {/* <button className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl font-bold text-[10px] uppercase tracking-wider hover:bg-rose-600 hover:text-white transition-all active:scale-95">
                    <FaTrashAlt size={12} />
                    Cancel
                  </button> */}

                  <CancleModal myRequests={req._id} />
                </div>
              </div>
            ))
          ) : (
            <div className="p-20 text-center text-gray-400 italic">
              No requests found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
