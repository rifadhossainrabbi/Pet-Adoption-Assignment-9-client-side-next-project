'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  FaEdit,
  FaRegEye,
  FaTrashAlt,
  FaUsers,
  FaTimes,
  FaUserCircle,
} from 'react-icons/fa';
import { RemovePet } from './RemovePet';

const MyListPetCard = ({ pet, clientRequests }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const specificRequests = clientRequests?.filter(
    req => String(req.petId) === String(pet._id),
  );
  console.log(specificRequests);

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/request/${requestId}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        toast.success(`Request ${newStatus} successfully`);
        router.refresh();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group flex flex-col h-full relative">
      {/*Pet Image Section */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={pet.imageUrl}
          alt={pet.PetName}
          fill
          sizes="(max-width: 768px) 100vw, 16vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
      </div>

      {/* Pet Info Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-xl font-bold text-gray-800 truncate group-hover:text-orange-600 transition-colors">
            {pet.PetName}
          </h3>
          <span className="text-orange-600 font-black text-lg">
            ${pet.adoptionFee}
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-6">
          {pet.species} • {pet.breed}
        </p>

        {/* Buttons  */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 font-bold text-xs active:scale-95 cursor-pointer"
          >
            <FaUsers size={14} />
            <span>Requests</span>
          </button>

          <Link
            href={`/update-pet/${pet._id}`}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all duration-300 font-bold text-xs text-center"
          >
            <FaEdit size={14} /> <span>Edit</span>
          </Link>

          <Link
            href={`/all-pets/${pet._id}`}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-50 text-slate-600 border border-slate-200 rounded-2xl hover:bg-slate-600 hover:text-white transition-all duration-300 font-bold text-xs text-center"
          >
            <FaRegEye size={14} /> <span>View</span>
          </Link>

          <RemovePet petId={pet._id} />
        </div>
      </div>

      {/* Request Modal*/}
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
              <h2 className="text-2xl font-black text-gray-800">
                Adoption Requests For {pet.PetName}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full cursor-pointer"
              >
                <FaTimes className="text-gray-400" size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 max-h-[70vh] overflow-y-auto bg-gray-50/30">
              {specificRequests.length > 0 ? (
                specificRequests.map((req, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row gap-5 p-6 rounded-[28px] bg-white border border-gray-100 mb-6 shadow-sm"
                  >
                    {/* User Avatar */}
                    <div className="shrink-0">
                      {req.image ? (
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-orange-100 shadow-sm">
                          <Image
                            src={req.image}
                            alt={req.clientName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                          <FaUserCircle className="text-gray-300 w-full h-full" />
                        </div>
                      )}
                    </div>

                    {/* Info Content */}
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-black text-gray-800 text-xl">
                            {req.clientName || 'Anonymous'}
                          </h4>
                          <p className="text-gray-400 text-sm font-medium">
                            {req.email}
                          </p>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                            req.status === 'approved'
                              ? 'bg-emerald-50 text-emerald-500 border-emerald-100'
                              : req.status === 'rejected'
                                ? 'bg-rose-50 text-rose-500 border-rose-100'
                                : 'bg-orange-50 text-orange-500 border-orange-100'
                          }`}
                        >
                          {req.status}
                        </span>
                      </div>

                      <div className="space-y-3 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <p className="text-gray-700 font-bold text-sm">
                          Pickup Date: {req.pickupDate}
                        </p>
                        <p className="text-gray-600 font-medium text-sm italic">
                          {req.message}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-end gap-3 mt-6">
                        {req.status === 'pending' && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusUpdate(req._id, 'approved')
                              }
                              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl px-8 py-2.5 transition-all active:scale-95 text-sm cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(req._id, 'rejected')
                              }
                              className="bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl px-8 py-2.5 transition-all active:scale-95 text-sm cursor-pointer"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center text-gray-400 italic">
                  No requests yet.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListPetCard;
