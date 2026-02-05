'use client';

import { Copy, Eye, MoreHorizontal, Plus } from 'lucide-react';

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

const models = [
  {
    id: 'grok-2-latest',
    name: 'Grok 2 Latest',
    description: 'Our most capable model with vision capabilities',
    status: 'active',
    type: 'chat',
    contextWindow: '128K tokens',
    pricing: '$5 / 1M tokens',
    latency: 'Fast',
  },
  {
    id: 'grok-2-vision',
    name: 'Grok 2 Vision',
    description: 'Vision-enabled model for image understanding',
    status: 'active',
    type: 'vision',
    contextWindow: '128K tokens',
    pricing: '$10 / 1M tokens',
    latency: 'Medium',
  },
  {
    id: 'grok-2',
    name: 'Grok 2',
    description: 'Standard text model for general tasks',
    status: 'active',
    type: 'chat',
    contextWindow: '128K tokens',
    pricing: '$3 / 1M tokens',
    latency: 'Fast',
  },
  {
    id: 'grok-beta',
    name: 'Grok Beta',
    description: 'Experimental model with latest features',
    status: 'beta',
    type: 'chat',
    contextWindow: '32K tokens',
    pricing: '$2 / 1M tokens',
    latency: 'Variable',
  },
];

export function ModelsContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Models</h1>
        <p className="text-muted-foreground">Manage and deploy AI models for your applications.</p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Models</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="vision">Vision</TabsTrigger>
            <TabsTrigger value="embedding">Embedding</TabsTrigger>
          </TabsList>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Deploy Model
          </Button>
        </div>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {models.map((model) => (
              <Card key={model.id}>
                <CardHeader className="flex flex-row items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle>{model.name}</CardTitle>
                      <Badge variant={model.status === 'active' ? 'default' : 'secondary'}>
                        {model.status}
                      </Badge>
                    </div>
                    <CardDescription>{model.description}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy model ID
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Test in playground</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <span className="text-muted-foreground">Model ID</span>
                      <div className="font-mono text-xs">{model.id}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-muted-foreground">Type</span>
                      <div className="capitalize">{model.type}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-muted-foreground">Context Window</span>
                      <div>{model.contextWindow}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-muted-foreground">Pricing</span>
                      <div>{model.pricing}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
