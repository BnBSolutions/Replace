import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Check, Package, Truck } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { toast } from 'sonner';
import products from '@/data/products.json';

export default function ProductDetail() {
  const { t } = useTranslation();
  const { slug, locale } = useParams();
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((state) => state.addItem);

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">{t('shop.productNotFound')}</h1>
        <Button asChild>
          <Link to={`/${locale}/shop`}>{t('shop.backToShop')}</Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product as any, qty);
    toast.success(`${qty}x ${product.title} ${t('shop.addedToCart')}`);
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
              <img
                src={product.images[0].src}
                alt={product.images[0].alt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <div className="flex gap-2 mb-3">
                {product.badges?.map((badge) => (
                  <Badge key={badge}>{badge}</Badge>
                ))}
              </div>
              <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-primary">
                  {product.price.amount} {product.price.currency}
                </span>
                {product.compareAt && (
                  <span className="text-xl text-muted-foreground line-through">
                    {product.compareAt.amount} {product.compareAt.currency}
                  </span>
                )}
              </div>
            </div>

            {/* Features */}
            {product.features && (
              <div className="space-y-2">
                {product.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.stock > 0 ? (
                <>
                  <Package className="w-5 h-5 text-green-500" />
                  <span className="text-green-500">{t('shop.inStock')} ({product.stock} buc)</span>
                </>
              ) : (
                <>
                  <Package className="w-5 h-5 text-destructive" />
                  <span className="text-destructive">{t('shop.outOfStock')}</span>
                </>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">{t('shop.quantity')}</span>
                <div className="flex items-center gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{qty}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setQty(Math.min(product.stock, qty + 1))}
                    disabled={qty >= product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? t('shop.outOfStock') : t('shop.addToCart')}
              </Button>
            </Card>

            {/* Delivery Info */}
            <Card className="p-6">
              <div className="flex gap-3">
                <Truck className="w-6 h-6 text-primary shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">{t('shop.deliveryAndPickup')}</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• {t('shop.freePickup')}</li>
                    <li>• {t('shop.courierDelivery')}</li>
                    <li>• {t('shop.mountingIncluded')}</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
