import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, Package, CreditCard } from 'lucide-react';
import { apiCall } from '@/lib/api';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState('loading');
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState('');

  const paymentId = searchParams.get('payment_id');
  const orderId = searchParams.get('order_id');
  const status = searchParams.get('status');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!paymentId) {
          setPaymentStatus('error');
          setError('Payment ID not found');
          return;
        }

        const response = await apiCall(`/payments/vault/${paymentId}`);
        const data = await response.json();

        if (data.success) {
          const payment = data.payment;
          setPaymentStatus(payment.status);

          if (payment.status === 'completed' && payment.metadata?.order_id) {
            const orderResponse = await apiCall(`/orders/${payment.metadata.order_id}`);
            const orderData = await orderResponse.json();
            
            if (orderData.success) {
              setOrderDetails(orderData.order);
            }
          }
        } else {
          setPaymentStatus('error');
          setError(data.message || 'Failed to verify payment');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setPaymentStatus('error');
        setError('Failed to verify payment status');
      }
    };

    verifyPayment();
  }, [paymentId]);

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'completed':
        return <CheckCircle className="w-16 h-16 text-green-500" />;
      case 'pending':
        return <Clock className="w-16 h-16 text-yellow-500" />;
      case 'failed':
      case 'cancelled':
      case 'error':
        return <XCircle className="w-16 h-16 text-red-500" />;
      default:
        return <Clock className="w-16 h-16 text-gray-400 animate-spin" />;
    }
  };

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case 'completed':
        return {
          title: 'Payment Successful!',
          description: 'Your payment has been processed successfully. Your order is being prepared for shipment.'
        };
      case 'pending':
        return {
          title: 'Payment Pending',
          description: 'Your payment is being processed. You will receive a confirmation email once completed.'
        };
      case 'failed':
        return {
          title: 'Payment Failed',
          description: 'Your payment could not be processed. Please try again or use a different payment method.'
        };
      case 'cancelled':
        return {
          title: 'Payment Cancelled',
          description: 'You have cancelled the payment. You can try again or choose a different payment method.'
        };
      case 'error':
        return {
          title: 'Payment Error',
          description: error || 'An error occurred while processing your payment. Please contact support.'
        };
      default:
        return {
          title: 'Verifying Payment...',
          description: 'Please wait while we verify your payment status.'
        };
    }
  };

  const statusMessage = getStatusMessage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                {getStatusIcon()}
              </div>
              <CardTitle className="text-2xl">{statusMessage.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-center text-muted-foreground">
                {statusMessage.description}
              </p>

              {paymentId && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="w-4 h-4" />
                    <span className="font-semibold">Payment Details</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Payment ID:</span>
                      <span className="font-mono">{paymentId}</span>
                    </div>
                    {orderId && (
                      <div className="flex justify-between">
                        <span>Order ID:</span>
                        <span className="font-mono">{orderId}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={`capitalize ${
                        paymentStatus === 'completed' ? 'text-green-600' :
                        paymentStatus === 'pending' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {orderDetails && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4" />
                    <span className="font-semibold">Order Information</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Order Number:</span>
                      <span className="font-mono">{orderDetails.orderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Amount:</span>
                      <span className="font-semibold">AED {orderDetails.totalAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Items:</span>
                      <span>{orderDetails.items?.length || 0} items</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                {paymentStatus === 'completed' && orderDetails ? (
                  <>
                    <Button 
                      onClick={() => window.location.href = `/orders/${orderDetails.id}`}
                      className="flex-1"
                    >
                      View Order Details
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => window.location.href = '/'}
                      className="flex-1"
                    >
                      Continue Shopping
                    </Button>
                  </>
                ) : paymentStatus === 'failed' || paymentStatus === 'cancelled' ? (
                  <>
                    <Button 
                      onClick={() => window.location.href = '/checkout'}
                      className="flex-1"
                    >
                      Try Again
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => window.location.href = '/cart'}
                      className="flex-1"
                    >
                      Back to Cart
                    </Button>
                  </>
                ) : paymentStatus === 'pending' ? (
                  <>
                    <Button 
                      onClick={() => window.location.reload()}
                      variant="outline"
                      className="flex-1"
                    >
                      Refresh Status
                    </Button>
                    <Button 
                      onClick={() => window.location.href = '/orders'}
                      className="flex-1"
                    >
                      View My Orders
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={() => window.location.href = '/'}
                    className="w-full"
                  >
                    Back to Home
                  </Button>
                )}
              </div>

              {(paymentStatus === 'failed' || paymentStatus === 'error') && (
                <div className="text-center text-sm text-muted-foreground">
                  <p>Need help? Contact our support team at:</p>
                  <p className="font-semibold">support@elisshbeauty.ae | 800-ELISSH</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;