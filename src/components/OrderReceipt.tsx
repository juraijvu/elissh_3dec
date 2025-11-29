import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';

interface OrderReceiptProps {
  order: any;
  onClose: () => void;
}

const OrderReceipt = ({ order, onClose }: OrderReceiptProps) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate PDF logic would go here
    const element = document.getElementById('receipt-content');
    if (element) {
      // Use html2pdf or similar library
      console.log('Downloading receipt for order:', order.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <CardContent className="p-0">
          {/* Action Buttons */}
          <div className="flex justify-between items-center p-4 border-b print:hidden">
            <h2 className="text-lg font-semibold">Order Receipt</h2>
            <div className="flex gap-2">
              <Button size="sm" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button size="sm" variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>

          {/* Receipt Content */}
          <div id="receipt-content" className="p-8 bg-white">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary mb-2">Elissh Beauty</h1>
              <p className="text-sm text-muted-foreground">Premium Beauty & Cosmetics</p>
              <p className="text-sm text-muted-foreground">Dubai, United Arab Emirates</p>
              <p className="text-sm text-muted-foreground">TRN: 100123456700003</p>
            </div>

            {/* Order Info */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold mb-3">Order Information</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Order ID:</strong> {order.id}</p>
                  <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString('en-AE')}</p>
                  <p><strong>Status:</strong> <span className="capitalize">{order.status}</span></p>
                  <p><strong>Payment Method:</strong> Credit Card</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Billing Address</h3>
                <div className="text-sm">
                  <p>Ahmed Al Mansouri</p>
                  <p>Apartment 1205, Marina Heights</p>
                  <p>Dubai Marina, Dubai</p>
                  <p>United Arab Emirates</p>
                  <p>Phone: +971 50 123 4567</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-semibold mb-3">Shipping Address</h3>
              <div className="text-sm">
                <p>Ahmed Al Mansouri</p>
                <p>Apartment 1205, Marina Heights</p>
                <p>Dubai Marina, Dubai</p>
                <p>United Arab Emirates</p>
                <p>Phone: +971 50 123 4567</p>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-8">
              <h3 className="font-semibold mb-4">Order Items</h3>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 p-3 text-left">Item</th>
                    <th className="border border-gray-300 p-3 text-center">Qty</th>
                    <th className="border border-gray-300 p-3 text-right">Unit Price</th>
                    <th className="border border-gray-300 p-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-gray-300 p-3">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">SKU: PROD-{index + 1}</p>
                        </div>
                      </td>
                      <td className="border border-gray-300 p-3 text-center">{item.qty}</td>
                      <td className="border border-gray-300 p-3 text-right">AED {item.price}</td>
                      <td className="border border-gray-300 p-3 text-right">AED {(item.price * item.qty).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-8">
              <div className="w-64">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>AED {(order.total * 0.85).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-AED {(order.total * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>AED 15.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT (5%):</span>
                    <span>AED {(order.total * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>AED {order.total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-muted-foreground border-t pt-4">
              <p>Thank you for shopping with Elissh Beauty!</p>
              <p>For support, contact us at support@elisshbeauty.ae or call 800-ELISSH</p>
              <p className="mt-2">This is a computer-generated receipt and does not require a signature.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderReceipt;