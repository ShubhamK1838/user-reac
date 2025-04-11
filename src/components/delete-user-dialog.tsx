
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

interface DeleteUserDialogProps {
  userId: string;
  userName: string;
  onDeleteUser: (userId: string) => void;
}

export function DeleteUserDialog({userId, userName, onDeleteUser}: DeleteUserDialogProps) {
  const handleDelete = () => {
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
