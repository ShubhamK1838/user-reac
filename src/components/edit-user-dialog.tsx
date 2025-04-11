"use client";

import * as React from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useToast} from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  role: z.string().min(3, {
    message: "Role must be at least 3 characters.",
  }),
  status: z.string().min(4, {
    message: "Status must be at least 4 characters.",
  }),
});

interface EditUserDialogProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
}

export function EditUserDialog({user, onUpdateUser}: EditUserDialogProps) {
  const {toast} = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedUser: User = {
      id: user.id,
      ...values,
    };
    onUpdateUser(updatedUser);
    toast({
      title: "User updated successfully!",
      description: `User ${values.name} has been updated.`,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Edit the details of the selected user.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>This is the user's full name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormDescription>This is the user's email address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input placeholder="Admin" {...field} />
                  </FormControl>
                  <FormDescription>This is the user's role in the system.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input placeholder="Active" {...field} />
                  </FormControl>
                  <FormDescription>This is the user's current status.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Update</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
