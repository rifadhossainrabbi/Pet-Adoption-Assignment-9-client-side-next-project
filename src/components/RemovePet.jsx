'use client';

import { AlertDialog, Button } from '@heroui/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';

export function RemovePet({ petId }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/pets/${petId}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json();

      if (res.ok) {
        toast.success('Pet listing removed successfully');
        router.refresh();
      } else {
        toast.error('Failed to delete');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <AlertDialog>
      <Button
        variant="light"
        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-2xl hover:bg-rose-600 hover:text-white transition-all duration-300 font-bold text-xs active:scale-95 cursor-pointer h-auto w-full min-w-0"
      >
        <FaTrashAlt size={14} />
        <span>Delete</span>
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Pet Listing?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete this pet listing and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete Permanently
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
