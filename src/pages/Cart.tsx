import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import products from '@/data/products.json';

export default function Cart() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { locale } = useParams();
  const { lines, updateQty, removeItem, getTotal } = useCartStore();
  
  const total = getTotal();

  if (lines.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20">
        <Card className="max-w-2xl mx-auto p-12 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-3xl font-bold mb-4">{t('shop.cartEmpty')}</h1>
          <p className="text-muted-foreground mb-8">
            {t('shop.cartEmptySubtitle')}
          </p>
          <Button size="lg" asChild>
            <Link to={`/${locale}/shop`}>{t('shop.continueShopping')}</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-5xl font-bold mb-12">{t('shop.shoppingCart')}</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {lines.map((line) => {
            const product = products.find((p) => p.id === line.productId);
            if (!product) return null;

            return (
              <Card key={line.productId} className="p-6">
                <div className="flex gap-6">
                  <img
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
                    <p className="text-muted-foreground mb-4">
                      {line.unitPrice.amount} {line.unitPrice.currency}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => updateQty(line.productId, line.qty - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">{line.qty}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                          onClick={() => updateQty(line.productId, line.qty + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => removeItem(line.productId)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">
                      {line.total.amount} {line.total.currency}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div>
          <Card className="p-6 sticky top-24">
            <h2 className="text-2xl font-semibold mb-6">{t('shop.orderSummary')}</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('shop.subtotal')}</span>
                <span className="font-medium">
                  {total.amount} {total.currency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('shop.deliveryFee')}</span>
                <span className="font-medium">{t('shop.calculatedAtCheckout')}</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-xl font-bold">
                <span>{t('shop.total')}</span>
                <span className="text-primary">
                  {total.amount} {total.currency}
                </span>
              </div>
            </div>
            <Button
              size="lg"
              className="w-full mb-3"
              onClick={() => navigate(`/${locale}/checkout`)}
            >
              {t('shop.checkout')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              asChild
            >
              <Link to={`/${locale}/shop`}>{t('shop.continueShopping')}</Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
