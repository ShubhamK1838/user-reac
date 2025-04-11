'use client';

import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

const SettingsPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-background">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage your application settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            {/* Add your settings components here */}
            <p>Here you can manage your app settings:</p>
            <ul>
              <li>- Change Password</li>
              <li>- Update Email Preferences</li>
              <li>- Manage Notifications</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;

