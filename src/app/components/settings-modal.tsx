import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Bell, Lock, Palette, Shield, Users, Zap, Plus, Trash2, Eye, EyeOff } from 'lucide-react';
// import logoImage from 'figma:asset/da66afec8308d820a80087d80cf52148e60777e5.png';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { CommunityInviteCustomizer } from './community-invite-customizer';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

interface RoleMember {
  email: string;
}

interface PermissionRow {
  name: string;
  owner: boolean;
  leader: boolean;
  admin: boolean;
}

export function SettingsModal({ open, onClose }: SettingsModalProps) {
  const [ownerEmail] = useState('name@gmail.com');
  const [leaderMembers, setLeaderMembers] = useState<RoleMember[]>([
    { email: 'name@gmail.com' }
  ]);
  const [adminMembers, setAdminMembers] = useState<RoleMember[]>([]);
  const [inviteCustomizerOpen, setInviteCustomizerOpen] = useState(false);
  const [visibleOnKyozo, setVisibleOnKyozo] = useState(true);
  const [privacyType, setPrivacyType] = useState<'public' | 'private' | 'secret'>('public');
  
  const [permissions, setPermissions] = useState<PermissionRow[]>([
    { name: 'View Permissions', owner: true, leader: true, admin: true },
    { name: 'Edit Permission', owner: true, leader: true, admin: true },
    { name: 'Add/Edit User Roles', owner: true, leader: true, admin: false },
    { name: 'Add User', owner: true, leader: true, admin: true },
    { name: 'Delete User', owner: true, leader: true, admin: false },
    { name: 'Approve/Decline', owner: true, leader: true, admin: true },
    { name: 'Broadcast And Announce', owner: true, leader: true, admin: true },
    { name: 'Chat To Users', owner: true, leader: true, admin: true },
    { name: 'Analytics', owner: true, leader: true, admin: true },
  ]);

  const togglePermission = (index: number, role: 'leader' | 'admin') => {
    setPermissions(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [role]: !updated[index][role] };
      return updated;
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-[1200px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            {/* <img src={logoImage} alt="Kyozo" className="h-8 w-auto" /> */}
            <div className="w-full h-auto">
              <h1 className="text-2xl font-bold">Kyozo</h1>
            </div>
          </div>
          <DialogTitle className="text-2xl">Settings</DialogTitle>
          <DialogDescription>
            Manage your community settings and preferences
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6 mt-6">
            <Card className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <Palette className="w-5 h-5 text-purple-600 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Community Information</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Update your community name and description
                  </p>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="community-name">Community Name</Label>
                      <Input id="community-name" defaultValue="Willer" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <textarea
                        id="description"
                        className="w-full mt-1.5 px-3 py-2 border rounded-md min-h-24"
                        placeholder="Describe your community..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3">
                <Eye className="w-5 h-5 text-[#6B8A4E] mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Visibility</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Do you want your community to be visible on Kyozo?
                  </p>
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => setVisibleOnKyozo(true)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                        visibleOnKyozo
                          ? 'border-[#6B8A4E] bg-[#F5F1E8]'
                          : 'border-gray-300 bg-white hover:border-gray-400'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        visibleOnKyozo ? 'border-[#6B8A4E]' : 'border-gray-300'
                      }`}>
                        {visibleOnKyozo && (
                          <div className="w-3 h-3 rounded-full bg-[#6B8A4E]" />
                        )}
                      </div>
                      <span className="font-medium">Yes</span>
                    </button>
                    <button
                      onClick={() => setVisibleOnKyozo(false)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                        !visibleOnKyozo
                          ? 'border-[#6B8A4E] bg-[#F5F1E8]'
                          : 'border-gray-300 bg-white hover:border-gray-400'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        !visibleOnKyozo ? 'border-[#6B8A4E]' : 'border-gray-300'
                      }`}>
                        {!visibleOnKyozo && (
                          <div className="w-3 h-3 rounded-full bg-[#6B8A4E]" />
                        )}
                      </div>
                      <span className="font-medium">No</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#6B8A4E] mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Privacy Settings</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Control who can see and join your community
                  </p>
                  <RadioGroup value={privacyType} onValueChange={(value) => setPrivacyType(value as 'public' | 'private' | 'secret')}>
                    <div className="space-y-3">
                      {/* Public Option */}
                      <label
                        className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          privacyType === 'public'
                            ? 'border-[#6B8A4E] bg-[#F5F1E8]'
                            : 'border-gray-300 bg-white hover:border-gray-400'
                        }`}
                      >
                        <RadioGroupItem value="public" id="privacy-public" className="mt-0.5" />
                        <div className="flex-1">
                          <p className="font-semibold mb-1">Public</p>
                          <p className="text-sm text-gray-600">
                            Anyone can find and join without approval
                          </p>
                        </div>
                      </label>

                      {/* Private Option */}
                      <label
                        className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          privacyType === 'private'
                            ? 'border-[#6B8A4E] bg-[#F5F1E8]'
                            : 'border-gray-300 bg-white hover:border-gray-400'
                        }`}
                      >
                        <RadioGroupItem value="private" id="privacy-private" className="mt-0.5" />
                        <div className="flex-1">
                          <p className="font-semibold mb-1">Private</p>
                          <p className="text-sm text-gray-600">
                            Anyone can find, but to join they must be approved by the community leaders
                          </p>
                        </div>
                      </label>

                      {/* Secret Option */}
                      <label
                        className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          privacyType === 'secret'
                            ? 'border-[#6B8A4E] bg-[#F5F1E8]'
                            : 'border-gray-300 bg-white hover:border-gray-400'
                        }`}
                      >
                        <RadioGroupItem value="secret" id="privacy-secret" className="mt-0.5" />
                        <div className="flex-1">
                          <p className="font-semibold mb-1">Secret</p>
                          <p className="text-sm text-gray-600">
                            Community is not visible on the Kyozo app, unless user has accepted private invite
                          </p>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </Card>

            <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setInviteCustomizerOpen(true)}>
              <div className="flex items-start gap-3">
                <Palette className="w-5 h-5 text-[#7BD3C4] mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold mb-1">Customise Your Community Invite</h3>
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">
                    Personalise your sign-on invite with custom colors and branding
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="space-y-6 mt-6">
            <Card className="p-6">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-purple-600 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Member Permissions</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Configure what members can do in your community
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Members can post</p>
                        <p className="text-sm text-gray-600">Allow members to create posts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Members can comment</p>
                        <p className="text-sm text-gray-600">Allow members to comment on posts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Members can invite others</p>
                        <p className="text-sm text-gray-600">Let members send invites</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card className="p-6">
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-purple-600 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Notification Preferences</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Choose what notifications you want to receive
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Members</p>
                        <p className="text-sm text-gray-600">When someone joins</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Posts</p>
                        <p className="text-sm text-gray-600">When members create posts</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Direct Messages</p>
                        <p className="text-sm text-gray-600">When you receive messages</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6 mt-6">
            <Card className="p-6">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-purple-600 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Connected Services</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Manage integrations with external platforms
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Lock className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">WhatsApp</p>
                          <p className="text-sm text-gray-600">Connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg opacity-60">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">Zapier</p>
                          <p className="text-sm text-gray-600">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="mt-6">
            {/* Dark theme permissions panel matching the image */}
            <div className="bg-[#2D3748] rounded-lg p-8 text-white">
              <div className="grid grid-cols-[280px,1fr] gap-12">
                {/* Left Column - Role Sections */}
                <div className="space-y-8">
                  {/* Community Owner */}
                  <div>
                    <p className="text-xs text-gray-400 font-semibold mb-3 tracking-wide">COMMUNITY OWNER</p>
                    <div className="bg-[#1A202C] rounded-md px-4 py-2.5 text-sm">
                      {ownerEmail}
                    </div>
                  </div>

                  {/* Community Leader */}
                  <div>
                    <p className="text-xs text-gray-400 font-semibold mb-3 tracking-wide">COMMUNITY LEADER</p>
                    <div className="space-y-2">
                      {leaderMembers.map((member, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="bg-[#1A202C] rounded-md px-4 py-2.5 text-sm flex-1">
                            {member.email}
                          </div>
                          <button
                            className="text-gray-400 hover:text-gray-300"
                            onClick={() => setLeaderMembers(prev => prev.filter((_, i) => i !== index))}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Community Admin */}
                  <div>
                    <p className="text-xs text-gray-400 font-semibold mb-3 tracking-wide">COMMUNITY ADMIN</p>
                    <div className="space-y-2">
                      {adminMembers.map((member, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="bg-[#1A202C] rounded-md px-4 py-2.5 text-sm flex-1">
                            {member.email}
                          </div>
                          <button
                            className="text-gray-400 hover:text-gray-300"
                            onClick={() => setAdminMembers(prev => prev.filter((_, i) => i !== index))}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-300"
                        onClick={() => setAdminMembers(prev => [...prev, { email: 'name@gmail.com' }])}
                      >
                        <Plus className="w-4 h-4" />
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column - Permissions Table */}
                <div className="bg-[#3A4556] rounded-lg p-6">
                  {/* Table Header Row */}
                  <div className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-6 pb-4 mb-4">
                    <div className="text-sm font-medium text-purple-300">Permissions</div>
                    <div className="text-sm font-medium text-teal-300 text-center">Owner</div>
                    <div className="text-sm font-medium text-teal-300 text-center">Leader</div>
                    <div className="text-sm font-medium text-teal-300 text-center">Admin</div>
                  </div>

                  {/* Table Body - Permission Rows */}
                  <div className="space-y-1">
                    {permissions.map((permission, index) => (
                      <div 
                        key={index} 
                        className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-6 items-center py-3 hover:bg-[#2D3748]/50 rounded px-2 -mx-2"
                      >
                        {/* Permission Name (Row Label) */}
                        <div className="text-sm text-gray-200">{permission.name}</div>
                        
                        {/* Owner Checkbox (Column 1) */}
                        <div className="flex justify-center">
                          <div className={`w-5 h-5 rounded flex items-center justify-center ${
                            permission.owner 
                              ? 'bg-teal-500/20 border border-teal-500' 
                              : 'bg-gray-700 border border-gray-600'
                          }`}>
                            {permission.owner && (
                              <svg className="w-3 h-3 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                        
                        {/* Leader Checkbox (Column 2) */}
                        <div className="flex justify-center">
                          <button
                            onClick={() => togglePermission(index, 'leader')}
                            className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                              permission.leader 
                                ? 'bg-teal-500/20 border border-teal-500' 
                                : 'bg-gray-700 border border-gray-600 hover:border-gray-500'
                            }`}
                          >
                            {permission.leader && (
                              <svg className="w-3 h-3 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </button>
                        </div>
                        
                        {/* Admin Checkbox (Column 3) */}
                        <div className="flex justify-center">
                          <button
                            onClick={() => togglePermission(index, 'admin')}
                            className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${
                              permission.admin 
                                ? 'bg-teal-500/20 border border-teal-500' 
                                : 'bg-gray-700 border border-gray-600 hover:border-gray-500'
                            }`}
                          >
                            {permission.admin && (
                              <svg className="w-3 h-3 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Save Changes Button */}
                  <div className="flex justify-end mt-8 pt-6 border-t border-gray-600">
                    <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={onClose}>
            Save Changes
          </Button>
        </div>
      </DialogContent>

      <CommunityInviteCustomizer 
        open={inviteCustomizerOpen} 
        onClose={() => setInviteCustomizerOpen(false)} 
      />
    </Dialog>
  );
}