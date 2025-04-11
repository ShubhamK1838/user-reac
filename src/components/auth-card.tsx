"use client";

import React from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onSubmit: () => void;
  submitButtonText: string;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  title,
  description,
  children,
  onSubmit,
  submitButtonText,
}) => {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
        <Button onClick={onSubmit}>{submitButtonText}</Button>
      </CardContent>
    </Card>
  );
};
