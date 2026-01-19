import { Card } from './ui/card';
import { Button } from './ui/button';
import { BarChart3, Ticket, Lock, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';

export function MoreFeaturesScreen() {
  const addOnFeatures = [
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Deep insights into your community engagement, member behavior, and content performance',
      icon: BarChart3,
      color: '#6B9BB5',
      features: [
        'Member growth tracking',
        'Engagement metrics',
        'Content performance',
        'Revenue analytics',
        'Custom reports'
      ],
      price: '$29/month'
    },
    {
      id: 'ticketing',
      title: 'Ticketing',
      description: 'Sell tickets to events, manage sales, and track attendance with integrated payment processing',
      icon: Ticket,
      color: '#D4A574',
      features: [
        'Event ticket sales',
        'Payment processing',
        'QR code check-in',
        'Tiered pricing',
        'Discount codes'
      ],
      price: '$39/month'
    }
  ];

  return (
    <div className="flex-1 h-screen overflow-auto bg-gradient-to-br from-[#F5F1E8] to-[#E8DFD0]">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start gap-3 mb-3">
            <Sparkles className="w-8 h-8 text-[#D4A574]" />
            <div>
              <h1 className="text-3xl font-semibold text-[#3A3630] mb-2">More Features</h1>
              <p className="text-[#8B7355] text-lg">
                Enhance your community platform with premium add-ons
              </p>
            </div>
          </div>
        </div>

        {/* Add-on Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl">
          {addOnFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={feature.id}
                className="bg-gradient-to-br from-[#F5F1E8] to-[#E8DFD0] border-2 border-[#8B7355] shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-14 h-14 rounded-xl flex items-center justify-center shadow-md"
                        style={{ backgroundColor: feature.color }}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#3A3630] mb-1">{feature.title}</h3>
                        <Badge className="bg-[#7BD3C4]/20 text-[#3A3630] border border-[#7BD3C4] hover:bg-[#7BD3C4]/30">
                          Add-on Feature
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[#5A4A3A] mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Features List */}
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-[#5A4A3A] uppercase tracking-wider mb-3">
                      What's Included:
                    </h4>
                    <ul className="space-y-2">
                      {feature.features.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-[#5A4A3A]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#D4A574]" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-6 border-t-2 border-[#8B7355]/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-[#3A3630]">{feature.price}</div>
                        <div className="text-xs text-[#8B7355]">per month</div>
                      </div>
                      <Button className="bg-[#6B9BB5] hover:bg-[#5A8AA5] text-white gap-2 rounded-full shadow-md px-6">
                        <Lock className="w-4 h-4" />
                        Upgrade Now
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Info Banner */}
        <Card className="mt-8 bg-gradient-to-r from-[#6B9BB5]/10 to-[#7BD3C4]/10 border-2 border-[#6B9BB5]/30 max-w-6xl">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#6B9BB5]/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-[#6B9BB5]" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-[#3A3630] mb-2">Need a custom package?</h4>
                <p className="text-sm text-[#5A4A3A] mb-3">
                  Contact our team to discuss enterprise features, custom integrations, or volume pricing for your creative community.
                </p>
                <Button variant="outline" className="border-[#6B9BB5] text-[#6B9BB5] hover:bg-[#6B9BB5]/10">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
