"use client";

import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from 'react-toastify';
import {useUser} from '@/context/user-context';

interface DeleteUserDialogProps {
  userId: string;
  userName: string;
  onDeleteUser: (userId: string) => void;
}

export function DeleteUserDialog({userId, userName, onDeleteUser}: DeleteUserDialogProps) {
  const {user} = useUser();
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:9093/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user?.jwtToken}`,
        },
      });

      if (response.ok) {
        onDeleteUser(userId);
        toast.success(`User ${userName} deleted successfully!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(`Failed to delete user ${userName}.`, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error(`Error deleting user ${userName}.`, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75">
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user &lt;strong>{userName}&lt;/strong> from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end space-x-2">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
