'use client';

import { useEffect, useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { inviteUser } from '@/lib/actions/user-actions';

// type Profile = {
//   id: string;
//   email: string;
//   first_name: string;
//   last_name: string;
//   role: 'admin' | 'staff';
//   created_at: string;
// };

export default function TeamPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inviting, setInviting] = useState(false);

  // Form state
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('staff');
  const [phone, setPhone] = useState('');

  const fetchUsers = async () => {
    const { data, error } = await supabaseBrowser
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      toast.error('Failed to load users');
    } else {
      setUsers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInvite = async (e) => {
    e.preventDefault();
    setInviting(true);
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('role', role);
      formData.append('phone', phone);
      const result = await inviteUser(formData);
      if (result.success) {
        toast.success(`Invitation sent to ${email}`);
        setDialogOpen(false);
        resetForm();
        fetchUsers(); // refresh list
      } else {
        toast.error(result.error || 'Failed to invite user');
      }
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    }
    setInviting(false);
  };

  const resetForm = () => {
    setEmail('');
    setFirstName('');
    setLastName('');
    setRole('staff');
    setPhone('');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Team Members</CardTitle>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>Invite User</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={(val) => setRole(val)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={inviting}>
                {inviting ? 'Sending...' : 'Send Invitation'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Loading...</div>
        ) : users.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">No users yet</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.first_name} {user.last_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`capitalize px-2 py-1 rounded-full text-xs ${
                      user.role === 'admin' ? 'bg-primary/20 text-primary' : 'bg-muted'
                    }`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}