"use client";

import {useState} from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {EditUserDialog} from "@/components/edit-user-dialog";
import {DeleteUserDialog} from "@/components/delete-user-dialog";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {generateUserProfileSummary} from "@/ai/flows/generate-user-profile-summary";

// Define the structure for user data
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

// Initial hardcoded user data
const initialUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Editor",
    status: "Inactive",
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "Viewer",
    status: "Active",
  },
];

export function UserTable() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [profileSummary, setProfileSummary] = useState<string | null>(null);

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleAISummary = async (user: User) => {
    setSelectedUser(user);
    setOpen(true);
    try {
      const summary = await generateUserProfileSummary({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
      setProfileSummary(summary.profileSummary);
    } catch (error) {
      console.error("Failed to generate summary:", error);
      setProfileSummary("Failed to generate profile summary.");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <Table>
        <TableCaption>A list of Firebase Studio users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
              <TableCell className="text-right font-medium">
                <div className="flex justify-end gap-2">
                  <EditUserDialog user={user} onUpdateUser={handleUpdateUser} />
                  <DeleteUserDialog userId={user.id} userName={user.name} onDeleteUser={handleDeleteUser} />
                  <Dialog open={open && selectedUser?.id === user.id} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        AI Summary
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>AI Profile Summary</DialogTitle>
                        <DialogDescription>
                          {selectedUser?.name} - {selectedUser?.email}
                        </DialogDescription>
                      </DialogHeader>
                      {profileSummary ? (
                        <div className="mt-4">{profileSummary}</div>
                      ) : (
                        <div className="mt-4">Loading summary...</div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
