import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Check, ExternalLink, Calendar, Instagram, Mail, UtensilsCrossed, Music } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  connected: boolean;
}

const integrations: Integration[] = [
  {
    id: 'eventbrite',
    name: 'Eventbrite',
    description: 'Import event attendees and ticket sales data from your Eventbrite events.',
    category: 'Events & Ticketing',
    icon: <Calendar className="w-10 h-10" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    connected: false,
  },
  {
    id: 'residentadvisor',
    name: 'Resident Advisor',
    description: 'Sync your RA events and connect with attendees from the electronic music community.',
    category: 'Events & Ticketing',
    icon: <Music className="w-10 h-10" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    connected: false,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Connect your Instagram account to import followers and engage with your community.',
    category: 'Social Media',
    icon: <Instagram className="w-10 h-10" />,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    connected: false,
  },
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Sync contacts from Gmail and send emails directly from your Kyozo community.',
    category: 'Communication',
    icon: <Mail className="w-10 h-10" />,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    connected: false,
  },
  {
    id: 'sevenrooms',
    name: 'SevenRooms',
    description: 'Import reservations and guest data from your SevenRooms hospitality platform.',
    category: 'Hospitality',
    icon: <UtensilsCrossed className="w-10 h-10" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    connected: false,
  },
];

export function IntegrationsScreen() {
  const [integrationsList, setIntegrationsList] = useState<Integration[]>(integrations);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [email, setEmail] = useState('');

  const handleOpenConnectModal = (integration: Integration) => {
    setSelectedIntegration(integration);
    setConnectModalOpen(true);
    setApiKey('');
    setEmail('');
  };

  const handleConnect = () => {
    if (!selectedIntegration) return;

    setIntegrationsList(list =>
      list.map(item =>
        item.id === selectedIntegration.id
          ? { ...item, connected: true }
          : item
      )
    );

    setConnectModalOpen(false);
    setSelectedIntegration(null);
  };

  const handleDisconnect = (integrationId: string) => {
    setIntegrationsList(list =>
      list.map(item =>
        item.id === integrationId
          ? { ...item, connected: false }
          : item
      )
    );
  };

  const connectedIntegrations = integrationsList.filter(i => i.connected);
  const availableIntegrations = integrationsList.filter(i => !i.connected);

  return (
    <div className="flex-1 h-screen overflow-auto bg-gray-50">
      <div className="p-8">
        <Card className="bg-white p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold mb-1">Integrations</h1>
            <p className="text-gray-600">Connect your favorite platforms to grow and manage your community.</p>
          </div>

          {/* Connected Integrations */}
          {connectedIntegrations.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold mb-4">Connected ({connectedIntegrations.length})</h2>
              <div className="grid grid-cols-2 gap-6">
                {connectedIntegrations.map((integration) => (
                  <Card
                    key={integration.id}
                    className="p-6 hover:shadow-lg transition-all border-2 border-green-200 bg-green-50/30"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`${integration.bgColor} ${integration.color} p-4 rounded-xl`}>
                        {integration.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{integration.name}</h3>
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 gap-1">
                            <Check className="w-3 h-3" />
                            Connected
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{integration.description}</p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Configure
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDisconnect(integration.id)}
                          >
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Available Integrations */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {connectedIntegrations.length > 0 ? 'Available' : 'All Integrations'}
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {availableIntegrations.map((integration) => (
                <Card
                  key={integration.id}
                  className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-purple-200"
                  onClick={() => handleOpenConnectModal(integration)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`${integration.bgColor} ${integration.color} p-4 rounded-xl`}>
                      {integration.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold mb-1">{integration.name}</h3>
                      <Badge variant="outline" className="mb-3 text-xs">
                        {integration.category}
                      </Badge>
                      <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenConnectModal(integration);
                        }}
                      >
                        Connect
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Connect Modal */}
      <Dialog open={connectModalOpen} onOpenChange={setConnectModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              {selectedIntegration && (
                <div className={`${selectedIntegration.bgColor} ${selectedIntegration.color} p-3 rounded-lg`}>
                  {selectedIntegration.icon}
                </div>
              )}
              <div>
                <DialogTitle className="text-2xl">Connect {selectedIntegration?.name}</DialogTitle>
                <DialogDescription>
                  Authorize Kyozo to access your {selectedIntegration?.name} account
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {selectedIntegration?.id === 'gmail' ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Google Account Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> You'll be redirected to Google's secure authentication page to grant permissions.
                  </p>
                </div>
              </div>
            ) : selectedIntegration?.id === 'instagram' ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">Instagram Username</Label>
                  <Input
                    id="username"
                    placeholder="@yourusername"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                  <p className="text-sm text-pink-900">
                    <strong>Note:</strong> You'll be redirected to Instagram to authorize access to your account.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter your API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="mt-1.5"
                  />
                  <p className="text-xs text-gray-500 mt-1.5">
                    Find your API key in your {selectedIntegration?.name} account settings
                  </p>
                </div>
                <div>
                  <Label htmlFor="account-email">Account Email</Label>
                  <Input
                    id="account-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>
            )}

            {/* Permission List */}
            <div>
              <Label className="mb-3 block">This integration will be able to:</Label>
              <div className="space-y-2">
                {selectedIntegration?.id === 'eventbrite' && (
                  <>
                    <div className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Read event attendee information</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Access ticket sales data</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Import contact information</span>
                    </div>
                  </>
                )}
                {selectedIntegration?.id === 'residentadvisor' && (
                  <>
                    <div className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Sync event listings</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Access attendee data</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>View ticket information</span>
                    </div>
                  </>
                )}
                {selectedIntegration?.id === 'instagram' && (
                  <>
                    <div className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Read follower list</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>View post engagement</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Send direct messages</span>
                    </div>
                  </>
                )}
                {selectedIntegration?.id === 'gmail' && (
                  <>
                    <div className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Read and import contacts</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Send emails on your behalf</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Access email metadata</span>
                    </div>
                  </>
                )}
                {selectedIntegration?.id === 'sevenrooms' && (
                  <>
                    <div className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Access reservation data</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Import guest profiles</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>Sync booking history</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <Button variant="outline" onClick={() => setConnectModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={handleConnect}
            >
              Authorize & Connect
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
