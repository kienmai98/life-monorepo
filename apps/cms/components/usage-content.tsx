'use client';

import { Download, Filter, Zap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const usageData = [
  { model: 'grok-2-latest', requests: '1.2M', tokens: '45.2M', cost: '$226', percentage: 65 },
  { model: 'grok-2-vision', requests: '420K', tokens: '12.8M', cost: '$128', percentage: 25 },
  { model: 'grok-2', requests: '180K', tokens: '5.4M', cost: '$16', percentage: 8 },
  { model: 'grok-beta', requests: '45K', tokens: '1.2M', cost: '$2.4', percentage: 2 },
];

const _dailyData = [
  { date: 'Mon', requests: 125000 },
  { date: 'Tue', requests: 142000 },
  { date: 'Wed', requests: 138000 },
  { date: 'Thu', requests: 165000 },
  { date: 'Fri', requests: 189000 },
  { date: 'Sat', requests: 145000 },
  { date: 'Sun', requests: 132000 },
];

export function UsageContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Usage</h1>
          <p className="text-muted-foreground">
            Monitor your API usage and billing across all models.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4M</div>
            <p className="text-xs text-muted-foreground">+12% vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tokens</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">64.6M</div>
            <p className="text-xs text-muted-foreground">+8% vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$372.40</div>
            <p className="text-xs text-muted-foreground">+15% vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Latency</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145ms</div>
            <p className="text-xs text-muted-foreground">-5% vs last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="models" className="space-y-4">
        <TabsList>
          <TabsTrigger value="models">By Model</TabsTrigger>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="endpoints">By Endpoint</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage by Model</CardTitle>
              <CardDescription>Breakdown of requests and costs per model</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {usageData.map((item) => (
                  <div key={item.model} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.model}</span>
                        <Badge variant="secondary">{item.percentage}%</Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <span className="text-muted-foreground">{item.requests} requests</span>
                        <span className="text-muted-foreground">{item.tokens} tokens</span>
                        <span className="font-medium">{item.cost}</span>
                      </div>
                    </div>
                    <Progress value={item.percentage} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Daily Requests</CardTitle>
              <CardDescription>Request volume over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="text-4xl font-bold mb-2">📈</div>
                <p>Daily usage chart coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
