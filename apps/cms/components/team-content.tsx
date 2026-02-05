'use client';

import { Copy, Mail, MoreHorizontal, Plus, Shield, User } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const teamMembers = [
  {
    id: '1',
    name: 'ba Dan',
    email: 'badan@life.com',
    role: 'Owner',
    status: 'active',
    joined: 'Jan 2024',
    apiCalls: '1.2M',
  },
  {
    id: '2',
    name: 'Alice Chen',
    email: 'alice@life.com',
    role: 'Admin',
    status: 'active',
    joined: 'Feb 2024',
    apiCalls: '850K',
  },
  {
    id: '3',
    name: 'Bob Smith',
    email: 'bob@life.com',
    role: 'Developer',
    status: 'active',
    joined: 'Mar 2024',
    apiCalls: '420K',
  },
  {
    id: '4',
    name: 'Carol White',
    email: 'carol@life.com',
    role: 'Developer',
    status: 'inactive',
    joined: 'Apr 2024',
    apiCalls: '180K',
  },
  {
    id: '5',
    name: 'David Lee',
    email: 'david@life.com',
    role: 'Viewer',
    status: 'active',
    joined: 'May 2024',
    apiCalls: '45K',
  },
];

const apiKeys = [
  {
    name: 'Production API Key',
    key: 'sk_live_...8f2a',
    created: 'Jan 2024',
    lastUsed: '2 min ago',
  },
  { name: 'Staging API Key', key: 'sk_test_...4b1c', created: 'Feb 2024', lastUsed: '1 hour ago' },
  { name: 'Development', key: 'sk_dev_...9d3e', created: 'Mar 2024', lastUsed: '2 days ago' },
];

export function TeamContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground">Manage your team members and API access.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage access and permissions for your team.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10">
                          {member.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{member.name}</span>
                          <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                            {member.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-sm font-medium">{member.role}</div>
                        <div className="text-sm text-muted-foreground">Joined {member.joined}</div>
                      </div>
                      <div className="text-right w-24">
                        <div className="text-sm font-medium">{member.apiCalls}</div>
                        <div className="text-sm text-muted-foreground">API calls</div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Send email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" />
                            Change role
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Remove member
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-keys">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage your API keys for accessing Life AI</CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Key
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div
                    key={apiKey.name}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium">{apiKey.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Created {apiKey.created}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="font-mono text-sm bg-muted px-3 py-1 rounded">
                        {apiKey.key}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Last used: {apiKey.lastUsed}
                      </div>
                      <Button variant="ghost" size="icon">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                name: 'Owner',
                description: 'Full access to all resources and billing',
                permissions: ['All permissions'],
              },
              {
                name: 'Admin',
                description: 'Can manage team members and API keys',
                permissions: ['Manage team', 'Manage API keys', 'View usage', 'View billing'],
              },
              {
                name: 'Developer',
                description: 'Can use API and view usage',
                permissions: ['Use API', 'View own usage', 'Create API keys'],
              },
              {
                name: 'Viewer',
                description: 'Read-only access to usage and team',
                permissions: ['View usage', 'View team'],
              },
            ].map((role) => (
              <Card key={role.name}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    <CardTitle>{role.name}</CardTitle>
                  </div>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {role.permissions.map((perm) => (
                      <li key={perm} className="flex items-center gap-2 text-sm">
                        <Shield className="h-3 w-3 text-muted-foreground" />
                        {perm}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
