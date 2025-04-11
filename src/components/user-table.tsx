"use client";

import {useState, useEffect} from 'react';
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
import {useUser} from '@/context/user-context';

// Define the structure for user data
interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "User";
  status: "Active" | "Inactive";
}

export function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const {user} = useUser();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/users/get-all', {
          headers: {
            'Authorization': `Bearer ${user?.jwtToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [user?.jwtToken]);

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
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
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
