'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditUserDialog } from "@/components/edit-user-dialog";
import { DeleteUserDialog } from "@/components/delete-user-dialog";
import { useUser } from '@/context/user-context';
import { toast } from 'react-toastify';

interface User {
  id: string;
  username: string;
  roles: string | null;
  authorities: { authority: string }[];
  enabled: boolean;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
}

export function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:9093/users/get-all', {
          headers: {
            'Authorization': `Bearer ${user?.jwtToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUsers(data);
        } else {
          toast.error('Failed to fetch users.');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('An error occurred while fetching users.');
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
            <TableHead>Username</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Authorities</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.roles ?? 'N/A'}</TableCell>
              <TableCell>{user.enabled ? 'Active' : 'Inactive'}</TableCell>
              <TableCell>
                {user.authorities.map((auth, i) => (
                  <span key={i} className="inline-block mr-2">{auth.authority}</span>
                ))}
              </TableCell>
              <TableCell className="text-right font-medium">
                <div className="flex justify-end gap-2">
                  <EditUserDialog user={user} onUpdateUser={handleUpdateUser} />
                  <DeleteUserDialog userId={user.id} userName={user.username} onDeleteUser={handleDeleteUser} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
