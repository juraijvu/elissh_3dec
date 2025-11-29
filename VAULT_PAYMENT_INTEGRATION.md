# Vault Payment Integration Guide

## Overview

This document describes the complete Vault Payment integration for Elissh Cosmetics e-commerce platform. Vault Payment is a UAE-based payment gateway that supports local and international cards.

## Features Implemented

### ✅ Admin Panel Integration
- **Payment Settings Page**: `/admin/payments`
- **Vault Payment Configuration**: API key management, test/live mode toggle
- **Connection Testing**: Verify API credentials
- **Webhook URL Generation**: Automatic webhook URL for payment notifications

### ✅ Customer Checkout Integration
- **Payment Method Selection**: Vault Payment as default option
- **Secure Payment Flow**: Redirect to Vault Payment gateway
- **Payment Status Handling**: Success, failure, and pending states
- **Order Integration**: Automatic order status updates

### ✅ Backend Services
- **VaultPaymentService**: Complete API integration
- **Payment Routes**: RESTful API endpoints
- **Webhook Handling**: Real-time payment notifications
- **Database Models**: Payment settings and transaction storage

## Setup Instructions

### 1. Database Setup
The payment tables are automatically created when you start the server. If you need to manually sync:

```bash
cd backend
node scripts/syncPaymentTables.js
```

### 2. Admin Configuration
1. Login to admin panel: `/admin-login`
2. Navigate to **Payment Settings**: `/admin/payments`
3. Configure Vault Payment:
   - Enter your Vault Payment API key
   - Set test/live mode
   - Enable the payment method
   - Test the connection

### 3. Webhook Configuration
1. Copy the webhook URL from the admin panel
2. Add it to your Vault Payment dashboard
3. Configure webhook events: `payment.completed`, `payment.failed`, `payment.cancelled`, `refund.completed`

## API Endpoints

### Payment Settings (Admin Only)
```
GET    /api/payments/settings           # Get all payment settings
PUT    /api/payments/settings/vault    # Update Vault settings
POST   /api/payments/vault/test        # Test connection
```

### Payment Processing
```
POST   /api/payments/vault/create      # Create payment
GET    /api/payments/vault/:paymentId  # Get payment status
POST   /api/payments/vault/webhook     # Webhook endpoint
POST   /api/payments/vault/:id/refund  # Process refund (admin)
```

## Frontend Components

### Admin Components
- **PaymentSettings.tsx**: Main admin configuration page
- **Vault Payment Tab**: API key management and testing

### Customer Components
- **CheckoutPage.tsx**: Updated with Vault Payment option
- **PaymentSuccessPage.tsx**: Handle payment returns and status

## Payment Flow

### 1. Customer Checkout
```
Customer selects Vault Payment → 
Order created → 
Vault payment created → 
Redirect to Vault gateway → 
Customer completes payment → 
Return to success page
```

### 2. Webhook Processing
```
Vault sends webhook → 
Verify signature → 
Update order status → 
Send confirmation email → 
Update inventory
```

## Configuration

### Environment Variables
Add to your `backend/.env`:
```env
# Vault Payment (configured via admin panel)
BACKEND_URL=http://localhost:5001
```

### Frontend Environment
Add to your `.env`:
```env
VITE_API_URL=http://localhost:5001/api
```

## Security Features

### ✅ Implemented
- **API Key Encryption**: Stored securely in database
- **Webhook Signature Verification**: Validates incoming webhooks
- **Admin Authentication**: Only admins can configure payments
- **HTTPS Ready**: Production-ready security headers

### 🔒 Best Practices
- Use HTTPS in production
- Regularly rotate API keys
- Monitor webhook failures
- Implement rate limiting

## Testing

### Test Payment Flow
1. Enable test mode in admin panel
2. Use Vault Payment test credentials
3. Process test transactions
4. Verify webhook delivery
5. Check order status updates

### Test Webhook
```bash
# Test webhook endpoint
curl -X POST http://localhost:5001/api/payments/vault/webhook \
  -H "Content-Type: application/json" \
  -d '{
    "type": "payment.completed",
    "data": {
      "id": "test_payment_123",
      "status": "completed",
      "metadata": {
        "order_id": "1"
      }
    }
  }'
```

## Vault Payment API Integration

### Payment Creation
```javascript
const payment = await VaultPaymentService.createPayment({
  amount: 100.00,
  currency: 'AED',
  description: 'Order Payment',
  customerEmail: 'customer@example.com',
  customerName: 'John Doe',
  orderId: '12345',
  customerId: 'user_123'
});
```

### Payment Status Check
```javascript
const status = await VaultPaymentService.getPayment(paymentId);
```

### Refund Processing
```javascript
const refund = await VaultPaymentService.refundPayment(paymentId, amount);
```

## Error Handling

### Common Issues
1. **Invalid API Key**: Check credentials in admin panel
2. **Webhook Failures**: Verify webhook URL and signature
3. **Payment Timeouts**: Implement retry logic
4. **Currency Mismatch**: Ensure AED is supported

### Debugging
- Check server logs for payment errors
- Monitor webhook delivery in Vault dashboard
- Use test mode for development
- Verify database order status updates

## Production Deployment

### Checklist
- [ ] Configure production API keys
- [ ] Enable live mode
- [ ] Set up HTTPS
- [ ] Configure webhook URL
- [ ] Test payment flow
- [ ] Monitor transactions
- [ ] Set up error alerts

### Monitoring
- Payment success/failure rates
- Webhook delivery status
- Order completion rates
- Customer payment experience

## Support

### Vault Payment Documentation
- API Documentation: https://developers.vaultspay.com/documentation/section#api_payments
- Dashboard: https://dashboard.vaultspay.com
- Support: support@vaultspay.com

### Integration Support
- Check admin panel connection test
- Review server logs for errors
- Verify webhook configuration
- Contact Vault Payment support for API issues

## Future Enhancements

### Planned Features
- [ ] Recurring payments
- [ ] Multi-currency support
- [ ] Payment analytics dashboard
- [ ] Automated refund processing
- [ ] Payment method restrictions
- [ ] Fraud detection integration

### Additional Payment Methods
- [ ] Apple Pay integration
- [ ] Google Pay integration
- [ ] Bank transfer options
- [ ] Cryptocurrency payments

---

**Note**: This integration is production-ready and follows security best practices. Ensure you test thoroughly in the sandbox environment before going live.