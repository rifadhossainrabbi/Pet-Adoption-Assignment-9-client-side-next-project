'use client';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaRegEye } from 'react-icons/fa';
import { CancleModal } from './CancleModal';

const RequestCard = ({ clientRequest }) => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const myRequests =
    clientRequest?.filter(req => req.email === user?.email) || [];

  if (isPending)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#C084FC] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-black text-white mb-6">
        My Adoption Requests
      </h1>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-4 border-b border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-500">
          <div className="col-span-4">Pet</div>
          <div className="col-span-2">Request Date</div>
          <div className="col-span-2">Pickup Date</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-right">Action</div>
        </div>
        <div className="divide-y divide-white/5">
          {myRequests.length > 0 ? (
            myRequests.map(req => (
              <div
                key={req._id}
                className="grid grid-cols-12 items-center px-6 py-4 hover:bg-white/5 transition-colors"
              >
                <div className="col-span-4 flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/10 shrink-0">
                    <Image
                      src={req.petImage || '/placeholder-pet.png'}
                      alt={req.petName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-bold text-white text-sm truncate">
                    {req.petName}
                  </span>
                </div>
                <div className="col-span-2 text-sm text-gray-500 font-semibold">
                  N/A
                </div>
                <div className="col-span-2 text-sm text-gray-400 font-semibold">
                  {new Date(req.pickupDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>
                <div className="col-span-2 flex justify-center">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                      req.status === 'pending'
                        ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                        : req.status === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <Link href={`/all-pets/${req.petId}`}>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 rounded-xl font-bold text-[10px] uppercase hover:bg-blue-500/20 hover:border-blue-500/40 hover:text-blue-400 transition-all">
                      <FaRegEye size={12} /> View
                    </button>
                  </Link>
                  <CancleModal myRequests={req._id} status={req.status} />
                </div>
              </div>
            ))
          ) : (
            <div className="p-16 text-center text-gray-600 italic">
              No requests found.
            </div>
          )}
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {myRequests.length > 0 ? (
          myRequests.map(req => (
            <div
              key={req._id}
              className="bg-white/5 border border-white/10 rounded-2xl p-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
                  <Image
                    src={req.petImage || '/placeholder-pet.png'}
                    alt={req.petName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-black text-white truncate">
                    {req.petName}
                  </h3>
                  <p className="text-gray-500 text-xs">
                    Pickup:{' '}
                    {new Date(req.pickupDate).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase border shrink-0 ${
                    req.status === 'pending'
                      ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                      : req.status === 'approved'
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                  }`}
                >
                  {req.status}
                </span>
              </div>
              <div className="flex gap-2">
                <Link href={`/all-pets/${req.petId}`} className="flex-1">
                  <button className="w-full flex items-center justify-center gap-2 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-xl font-bold text-xs hover:bg-blue-500/20 hover:text-blue-400 transition-all">
                    <FaRegEye size={12} /> View
                  </button>
                </Link>
                <div className="flex-1">
                  <CancleModal myRequests={req._id} status={req.status} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-16 text-center text-gray-600 italic bg-white/5 rounded-2xl border border-white/10">
            No requests found.
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
