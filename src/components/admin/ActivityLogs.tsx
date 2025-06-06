
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Activity, Filter } from 'lucide-react';

const ActivityLogs: React.FC = () => {
  const [actionFilter, setActionFilter] = useState('all');
  const [tableFilter, setTableFilter] = useState('all');

  const { data: logs, isLoading } = useQuery({
    queryKey: ['activity-logs', actionFilter, tableFilter],
    queryFn: async () => {
      let query = supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (actionFilter !== 'all') {
        query = query.eq('action', actionFilter);
      }

      if (tableFilter !== 'all') {
        query = query.eq('table_name', tableFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  const getActionColor = (action: string) => {
    switch (action) {
      case 'INSERT': return 'bg-green-100 text-green-800';
      case 'UPDATE': return 'bg-blue-100 text-blue-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTableColor = (tableName: string) => {
    switch (tableName) {
      case 'products': return 'bg-purple-100 text-purple-800';
      case 'blog_posts': return 'bg-orange-100 text-orange-800';
      case 'orders': return 'bg-blue-100 text-blue-800';
      case 'inventory_transactions': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatChanges = (oldValues: any, newValues: any) => {
    if (!oldValues && newValues) {
      // INSERT operation
      const keys = Object.keys(newValues).slice(0, 3);
      return keys.map(key => `${key}: ${newValues[key]}`).join(', ');
    }
    
    if (oldValues && newValues) {
      // UPDATE operation
      const changes = [];
      for (const key in newValues) {
        if (oldValues[key] !== newValues[key] && !['id', 'created_at', 'updated_at'].includes(key)) {
          changes.push(`${key}: ${oldValues[key]} → ${newValues[key]}`);
        }
      }
      return changes.slice(0, 2).join(', ');
    }
    
    if (oldValues && !newValues) {
      // DELETE operation
      return `Deleted: ${oldValues.name || oldValues.title || oldValues.id}`;
    }
    
    return 'No changes';
  };

  if (isLoading) {
    return <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-corporate"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Activity Logs</h2>
          <p className="text-gray-600">Track all admin actions and system changes</p>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="INSERT">Created</SelectItem>
              <SelectItem value="UPDATE">Updated</SelectItem>
              <SelectItem value="DELETE">Deleted</SelectItem>
            </SelectContent>
          </Select>
          <Select value={tableFilter} onValueChange={setTableFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tables</SelectItem>
              <SelectItem value="products">Products</SelectItem>
              <SelectItem value="blog_posts">Blog Posts</SelectItem>
              <SelectItem value="orders">Orders</SelectItem>
              <SelectItem value="inventory_transactions">Inventory</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="mr-2 h-5 w-5" />
            Recent Activity ({logs?.length || 0})
          </CardTitle>
          <CardDescription>
            Last 100 admin actions and system changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Table</TableHead>
                  <TableHead>Changes</TableHead>
                  <TableHead>User</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs?.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell className="font-mono text-sm">
                      {new Date(log.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={getActionColor(log.action)}>
                        {log.action}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getTableColor(log.table_name)}>
                        {log.table_name?.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <div className="text-sm text-gray-600 truncate">
                        {formatChanges(log.old_values, log.new_values)}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {log.user_id?.slice(0, 8)}...
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {logs?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No activity logs found for the selected filters.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityLogs;
