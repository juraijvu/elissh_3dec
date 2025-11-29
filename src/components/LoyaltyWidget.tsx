import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Gift, Wallet, TrendingUp } from 'lucide-react';

const LoyaltyWidget = () => {
  const loyaltyData = {
    currentPoints: 2450,
    nextRewardAt: 3000,
    walletBalance: 125.50,
    tier: 'Gold',
    pointsToNextTier: 550,
    recentEarnings: [
      { date: '2024-01-20', points: 150, reason: 'Purchase Order #ORD-002' },
      { date: '2024-01-18', points: 50, reason: 'Product Review' },
      { date: '2024-01-15', points: 200, reason: 'Purchase Order #ORD-001' }
    ]
  };

  const progressPercentage = (loyaltyData.currentPoints / loyaltyData.nextRewardAt) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Loyalty Points Card */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full -translate-y-16 translate-x-16" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Loyalty Points
            <Badge variant="secondary" className="ml-auto">{loyaltyData.tier}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-bold text-yellow-600">{loyaltyData.currentPoints}</span>
                <span className="text-sm text-muted-foreground">/ {loyaltyData.nextRewardAt}</span>
              </div>
              <div className="w-full bg-muted h-2 rounded-full">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {loyaltyData.nextRewardAt - loyaltyData.currentPoints} points to next reward
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Recent Earnings</h4>
              {loyaltyData.recentEarnings.map((earning, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{earning.reason}</span>
                  <span className="font-medium text-green-600">+{earning.points}</span>
                </div>
              ))}
            </div>

            <Button className="w-full" variant="outline">
              <Gift className="w-4 h-4 mr-2" />
              Redeem Rewards
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Balance Card */}
      <Card className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-full -translate-y-16 translate-x-16" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-green-500" />
            Wallet Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <span className="text-3xl font-bold text-green-600">AED {loyaltyData.walletBalance}</span>
              <p className="text-sm text-muted-foreground">Available store credit</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button size="sm" variant="outline">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Add Funds
                </Button>
                <Button size="sm" variant="outline">
                  View History
                </Button>
              </div>
            </div>

            <div className="p-3 bg-muted rounded">
              <p className="text-sm">
                <strong>Tip:</strong> Earn 1 point for every AED spent and get store credit from returns!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoyaltyWidget;