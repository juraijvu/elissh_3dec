import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CreditCard, Settings, TestTube, Shield, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiCall } from '@/lib/api';

const PaymentSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [testing, setTesting] = useState(false);
  const [settings, setSettings] = useState([]);
  
  const [vaultSettings, setVaultSettings] = useState({
    isEnabled: false,
    apiKey: '',
    secretKey: '',
    testMode: true,
    settings: {},
    hasApiKey: false,
    hasSecretKey: false
  });

  const [tabbySettings, setTabbySettings] = useState({
    isEnabled: false,
    apiKey: '',
    testMode: true,
    settings: {},
    hasApiKey: false
  });

  const [tamaraSettings, setTamaraSettings] = useState({
    isEnabled: false,
    apiKey: '',
    testMode: true,
    settings: {},
    hasApiKey: false
  });

  useEffect(() => {
    loadPaymentSettings();
  }, []);

  const loadPaymentSettings = async () => {
    try {
      setLoading(true);
      const response = await apiCall('/payments/settings');
      const data = await response.json();
      
      if (data.success) {
        setSettings(data.settings);
        
        // Find Vault settings
        const vault = data.settings.find(s => s.provider === 'vault');
        if (vault) {
          setVaultSettings({
            isEnabled: vault.isEnabled,
            apiKey: vault.apiKey ? '••••••••••••••••' : '',
            secretKey: vault.secretKey ? '••••••••••••••••' : '',
            testMode: vault.testMode,
            settings: vault.settings || {},
            hasApiKey: !!vault.apiKey,
            hasSecretKey: !!vault.secretKey
          });
        }

        // Find Tabby settings
        const tabby = data.settings.find(s => s.provider === 'tabby');
        if (tabby) {
          setTabbySettings({
            isEnabled: tabby.isEnabled,
            apiKey: tabby.apiKey ? '••••••••••••••••' : '',
            testMode: tabby.testMode,
            settings: tabby.settings || {},
            hasApiKey: !!tabby.apiKey
          });
        }

        // Find Tamara settings
        const tamara = data.settings.find(s => s.provider === 'tamara');
        if (tamara) {
          setTamaraSettings({
            isEnabled: tamara.isEnabled,
            apiKey: tamara.apiKey ? '••••••••••••••••' : '',
            testMode: tamara.testMode,
            settings: tamara.settings || {},
            hasApiKey: !!tamara.apiKey
          });
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load payment settings',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const saveVaultSettings = async () => {
    try {
      setLoading(true);
      
      // Only send API key if it's not the masked value
      const settingsToSave = { ...vaultSettings };
      if (vaultSettings.apiKey === '••••••••••••••••') {
        delete settingsToSave.apiKey; // Don't update if it's the masked value
      }
      if (vaultSettings.secretKey === '••••••••••••••••') {
        delete settingsToSave.secretKey; // Don't update if it's the masked value
      }
      
      const response = await apiCall('/payments/settings/vault', {
        method: 'PUT',
        body: JSON.stringify(settingsToSave)
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: 'Success',
          description: 'Vault Payment settings saved successfully'
        });
        loadPaymentSettings();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save settings',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const saveTabbySettings = async () => {
    try {
      setLoading(true);
      
      const settingsToSave = { ...tabbySettings };
      if (tabbySettings.apiKey === '••••••••••••••••') {
        delete settingsToSave.apiKey;
      }
      
      const response = await apiCall('/payments/settings/tabby', {
        method: 'PUT',
        body: JSON.stringify(settingsToSave)
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: 'Success',
          description: 'Tabby Payment settings saved successfully'
        });
        loadPaymentSettings();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save settings',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const saveTamaraSettings = async () => {
    try {
      setLoading(true);
      
      const settingsToSave = { ...tamaraSettings };
      if (tamaraSettings.apiKey === '••••••••••••••••') {
        delete settingsToSave.apiKey;
      }
      
      const response = await apiCall('/payments/settings/tamara', {
        method: 'PUT',
        body: JSON.stringify(settingsToSave)
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: 'Success',
          description: 'Tamara Payment settings saved successfully'
        });
        loadPaymentSettings();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to save settings',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const testVaultConnection = async () => {
    try {
      setTesting(true);
      
      const response = await apiCall('/payments/vault/test', {
        method: 'POST'
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: 'Connection Successful',
          description: 'Vault Payment API connection is working correctly'
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: 'Connection Failed',
        description: error.message || 'Failed to connect to Vault Payment API',
        variant: 'destructive'
      });
    } finally {
      setTesting(false);
    }
  };

  const getStatusBadge = (provider) => {
    const setting = settings.find(s => s.provider === provider);
    if (!setting) {
      return <Badge variant="secondary">Not Configured</Badge>;
    }
    
    if (setting.isEnabled) {
      return (
        <div className="flex items-center gap-2">
          <Badge variant="default" className="bg-green-500">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
          {setting.testMode && (
            <Badge variant="outline" className="text-orange-600 border-orange-600">
              Test Mode
            </Badge>
          )}
        </div>
      );
    } else {
      return (
        <Badge variant="secondary">
          <XCircle className="w-3 h-3 mr-1" />
          Disabled
        </Badge>
      );
    }
  };

  return (
    <div className="p-6 pt-2">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Payment Settings</h1>
          <p className="text-muted-foreground">Configure payment providers and processing options</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadPaymentSettings} disabled={loading}>
            <Settings className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="vault" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="vault" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Vault
          </TabsTrigger>
          <TabsTrigger value="tabby" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Tabby
          </TabsTrigger>
          <TabsTrigger value="tamara" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Tamara
          </TabsTrigger>
          <TabsTrigger value="stripe" disabled>
            <CreditCard className="w-4 h-4" />
            Stripe
          </TabsTrigger>
          <TabsTrigger value="overview">
            <Settings className="w-4 h-4" />
            Overview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vault" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Vault Payment Configuration
                </div>
                {getStatusBadge('vault')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Vault Payment is a secure payment gateway for UAE businesses. 
                  Get your API credentials from your Vault Payment dashboard.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="vault-enabled">Enable Vault Payment</Label>
                    <Switch
                      id="vault-enabled"
                      checked={vaultSettings.isEnabled}
                      onCheckedChange={(checked) => 
                        setVaultSettings(prev => ({ ...prev, isEnabled: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="vault-testmode">Test Mode</Label>
                    <Switch
                      id="vault-testmode"
                      checked={vaultSettings.testMode}
                      onCheckedChange={(checked) => 
                        setVaultSettings(prev => ({ ...prev, testMode: checked }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="vault-apikey">API Key *</Label>
                    <Input
                      id="vault-apikey"
                      type="password"
                      placeholder="Enter your Vault Payment API key"
                      value={vaultSettings.apiKey}
                      onChange={(e) => 
                        setVaultSettings(prev => ({ ...prev, apiKey: e.target.value }))
                      }
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Get this from your Vault Payment dashboard
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="vault-secretkey">Webhook Secret (Optional)</Label>
                    <Input
                      id="vault-secretkey"
                      type="password"
                      placeholder="Enter webhook secret for verification"
                      value={vaultSettings.secretKey}
                      onChange={(e) => 
                        setVaultSettings(prev => ({ ...prev, secretKey: e.target.value }))
                      }
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Used to verify webhook authenticity
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold mb-3">Webhook Configuration</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Label>Webhook URL (Configure this in your Vault Payment dashboard)</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      readOnly
                      value={`${window.location.origin.replace('5173', '5001')}/api/payments/vault/webhook`}
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin.replace('5173', '5001')}/api/payments/vault/webhook`);
                        toast({ title: 'Copied to clipboard' });
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Add this URL to your Vault Payment webhook settings to receive payment notifications
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={saveVaultSettings} 
                  disabled={loading || (!vaultSettings.apiKey && !vaultSettings.hasApiKey)}
                  className="flex-1"
                >
                  {loading ? 'Saving...' : 'Save Settings'}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={testVaultConnection}
                  disabled={testing || !vaultSettings.isEnabled || (!vaultSettings.hasApiKey && !vaultSettings.apiKey)}
                >
                  <TestTube className="w-4 h-4 mr-2" />
                  {testing ? 'Testing...' : 'Test Connection'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tabby" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Tabby Payment Configuration
                </div>
                {getStatusBadge('tabby')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Tabby offers Buy Now, Pay Later solutions for UAE customers.
                  Get your API credentials from your Tabby merchant dashboard.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="tabby-enabled">Enable Tabby Payment</Label>
                    <Switch
                      id="tabby-enabled"
                      checked={tabbySettings.isEnabled}
                      onCheckedChange={(checked) => 
                        setTabbySettings(prev => ({ ...prev, isEnabled: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="tabby-testmode">Test Mode</Label>
                    <Switch
                      id="tabby-testmode"
                      checked={tabbySettings.testMode}
                      onCheckedChange={(checked) => 
                        setTabbySettings(prev => ({ ...prev, testMode: checked }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="tabby-apikey">API Key *</Label>
                    <Input
                      id="tabby-apikey"
                      type="password"
                      placeholder="Enter your Tabby API key"
                      value={tabbySettings.apiKey}
                      onChange={(e) => 
                        setTabbySettings(prev => ({ ...prev, apiKey: e.target.value }))
                      }
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Get this from your Tabby merchant dashboard
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={saveTabbySettings} 
                  disabled={loading || (!tabbySettings.apiKey && !tabbySettings.hasApiKey)}
                  className="flex-1"
                >
                  {loading ? 'Saving...' : 'Save Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tamara" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Tamara Payment Configuration
                </div>
                {getStatusBadge('tamara')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Tamara provides flexible payment solutions including installments.
                  Get your API credentials from your Tamara merchant portal.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="tamara-enabled">Enable Tamara Payment</Label>
                    <Switch
                      id="tamara-enabled"
                      checked={tamaraSettings.isEnabled}
                      onCheckedChange={(checked) => 
                        setTamaraSettings(prev => ({ ...prev, isEnabled: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="tamara-testmode">Test Mode</Label>
                    <Switch
                      id="tamara-testmode"
                      checked={tamaraSettings.testMode}
                      onCheckedChange={(checked) => 
                        setTamaraSettings(prev => ({ ...prev, testMode: checked }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="tamara-apikey">API Key *</Label>
                    <Input
                      id="tamara-apikey"
                      type="password"
                      placeholder="Enter your Tamara API key"
                      value={tamaraSettings.apiKey}
                      onChange={(e) => 
                        setTamaraSettings(prev => ({ ...prev, apiKey: e.target.value }))
                      }
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Get this from your Tamara merchant portal
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={saveTamaraSettings} 
                  disabled={loading || (!tamaraSettings.apiKey && !tamaraSettings.hasApiKey)}
                  className="flex-1"
                >
                  {loading ? 'Saving...' : 'Save Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Providers Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: 'Vault Payment',
                    provider: 'vault',
                    description: 'UAE-based payment gateway supporting local and international cards',
                    features: ['AED Currency', 'Local Cards', 'International Cards', 'Webhooks', 'Refunds']
                  },
                  {
                    name: 'Tabby',
                    provider: 'tabby',
                    description: 'Buy Now, Pay Later solution for UAE customers',
                    features: ['Split Payments', 'No Interest', 'Instant Approval', 'AED Currency']
                  },
                  {
                    name: 'Tamara',
                    provider: 'tamara',
                    description: 'Flexible payment solutions including installments',
                    features: ['Installments', 'Pay Later', 'AED Currency', 'Quick Checkout']
                  },
                  {
                    name: 'Stripe',
                    provider: 'stripe',
                    description: 'Global payment platform (Coming Soon)',
                    features: ['Multiple Currencies', 'Global Cards', 'Apple Pay', 'Google Pay'],
                    disabled: true
                  }
                ].map((provider) => (
                  <div key={provider.provider} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{provider.name}</h3>
                      {provider.disabled ? (
                        <Badge variant="secondary">Coming Soon</Badge>
                      ) : (
                        getStatusBadge(provider.provider)
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{provider.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {provider.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-sm text-muted-foreground">Successful Payments</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">0</div>
                  <div className="text-sm text-muted-foreground">Failed Payments</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">AED 0</div>
                  <div className="text-sm text-muted-foreground">Total Revenue</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentSettings;