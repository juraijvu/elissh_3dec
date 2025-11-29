import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, CheckCircle, XCircle } from 'lucide-react';

const MockPayment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  
  const paymentId = searchParams.get('id');
  const amount = searchParams.get('amount');
  const orderId = searchParams.get('order');
  const provider = searchParams.get('provider') || 'vault';

  const simulatePayment = async (success: boolean) => {
    setProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (success) {
      navigate(`/order-success?orderId=${orderId}&payment=success`);
    } else {
      navigate(`/checkout?orderId=${orderId}&error=payment_failed`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <CreditCard className="w-8 h-8 text-blue-600" />
          </div>
          <CardTitle>Mock {provider.charAt(0).toUpperCase() + provider.slice(1)} Payment</CardTitle>
          <Badge variant="outline" className="mx-auto">Development Mode</Badge>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground">Payment ID</div>
            <div className="font-mono text-sm bg-gray-100 p-2 rounded">{paymentId}</div>
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground">Amount</div>
            <div className="text-2xl font-bold">AED {amount}</div>
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground">Order ID</div>
            <div className="font-mono text-sm">{orderId}</div>
          </div>
          
          <div className="border-t pt-6 space-y-3">
            <p className="text-sm text-muted-foreground text-center">
              This is a mock {provider} payment page for testing. Choose an outcome:
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => simulatePayment(true)}
                disabled={processing}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {processing ? 'Processing...' : 'Success'}
              </Button>
              
              <Button
                variant="destructive"
                onClick={() => simulatePayment(false)}
                disabled={processing}
              >
                <XCircle className="w-4 h-4 mr-2" />
                {processing ? 'Processing...' : 'Fail'}
              </Button>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground text-center">
            In production, this would redirect to the actual {provider.charAt(0).toUpperCase() + provider.slice(1)} Payment gateway
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MockPayment;