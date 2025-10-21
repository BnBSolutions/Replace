import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCartStore } from '@/store/cart';
import { toast } from 'sonner';
import products from '@/data/products.json';

export default function Checkout() {
  const { t } = useTranslation();
  const { lines, getTotal, clearCart } = useCartStore();
  const total = getTotal();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    fulfillment: 'pickup',
    address: '',
    payment: 'cod'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.phone) {
      toast.error(t('shop.fillRequired'));
      return;
    }

    if (form.fulfillment === 'courier' && !form.address) {
      toast.error(t('shop.addDeliveryAddress'));
      return;
    }

    // Simulate order placement
    toast.success(t('shop.orderSuccess'));
    clearCart();
    
    // Generate WhatsApp message
    const message = `
Comandă nouă:
👤 ${form.name}
📞 ${form.phone}
📧 ${form.email}
🚚 ${form.fulfillment === 'pickup' ? 'Ridicare din service' : `Livrare: ${form.address}`}
💰 Total: ${total.amount} ${total.currency}
    `.trim();

    const whatsappUrl = `https://wa.me/37360000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (lines.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">{t('shop.cartEmpty')}</h1>
        <Button asChild>
          <a href="/shop">{t('shop.continueShopping')}</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-5xl font-bold mb-12">{t('shop.checkoutTitle')}</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Details */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">{t('shop.contactDetails')}</h2>
              <div className="space-y-4">
                <div>
                  <Label>{t('shop.fullName')} *</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ion Popescu"
                    required
                  />
                </div>
                <div>
                  <Label>{t('shop.phone')} *</Label>
                  <Input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+373 60 000 000"
                    required
                  />
                </div>
                <div>
                  <Label>{t('shop.email')}</Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>
              </div>
            </Card>

            {/* Fulfillment */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">{t('shop.fulfillmentMethod')}</h2>
              <RadioGroup
                value={form.fulfillment}
                onValueChange={(v) => setForm({ ...form, fulfillment: v })}
              >
                <div className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                    <div className="font-semibold mb-1">{t('shop.pickupFromService')}</div>
                    <p className="text-sm text-muted-foreground">
                      {t('shop.pickupDescription')}
                    </p>
                  </Label>
                </div>
                <div className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer">
                  <RadioGroupItem value="courier" id="courier" />
                  <Label htmlFor="courier" className="flex-1 cursor-pointer">
                    <div className="font-semibold mb-1">{t('shop.courierDeliveryMethod')}</div>
                    <p className="text-sm text-muted-foreground">
                      {t('shop.courierDescription')}
                    </p>
                  </Label>
                </div>
              </RadioGroup>

              {form.fulfillment === 'courier' && (
                <div className="mt-4">
                  <Label>{t('shop.deliveryAddress')} *</Label>
                  <Input
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder={t('shop.addressPlaceholder')}
                    required
                  />
                </div>
              )}
            </Card>

            {/* Payment */}
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6">{t('shop.payment')}</h2>
              <RadioGroup
                value={form.payment}
                onValueChange={(v) => setForm({ ...form, payment: v })}
              >
                <div className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex-1 cursor-pointer">
                    <div className="font-semibold">{t('shop.cashOnDelivery')}</div>
                  </Label>
                </div>
              </RadioGroup>
            </Card>

            <Button type="submit" size="lg" className="w-full">
              {t('shop.placeOrder')}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="p-6 sticky top-24">
            <h2 className="text-2xl font-semibold mb-6">{t('shop.summary')}</h2>
            <div className="space-y-3 mb-6">
              {lines.map((line) => {
                const product = products.find((p) => p.id === line.productId);
                if (!product) return null;
                return (
                  <div key={line.productId} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {line.qty}x {product.title.substring(0, 30)}...
                    </span>
                    <span className="font-medium">{line.total.amount} MDL</span>
                  </div>
                );
              })}
            </div>
            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('shop.subtotal')}</span>
                <span className="font-medium">{total.amount} MDL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('shop.deliveryFee')}</span>
                <span className="font-medium">
                  {form.fulfillment === 'pickup' ? t('shop.free') : '50 MDL'}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between text-xl font-bold">
                <span>{t('shop.total')}</span>
                <span className="text-primary">
                  {form.fulfillment === 'pickup' ? total.amount : total.amount + 50} MDL
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
