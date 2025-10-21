import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cart';
import { useUIStore } from '@/store/ui';
import products from '@/data/products.json';

export default function CartDrawer() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { locale } = useParams();
  const { cartOpen, setCartOpen } = useUIStore();
  const { lines, updateQty, removeItem, getTotal } = useCartStore();
  
  const total = getTotal();

  const handleCheckout = () => {
    setCartOpen(false);
    navigate(`/${locale}/checkout`);
  };

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Coș de cumpărături</span>
            <span className="text-sm font-normal text-muted-foreground">
              {lines.length} {lines.length === 1 ? 'produs' : 'produse'}
            </span>
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 flex flex-col h-[calc(100vh-200px)]">
          {lines.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <p className="text-muted-foreground mb-4">Coșul tău este gol</p>
                <Button onClick={() => setCartOpen(false)} asChild>
                  <a href={`/${locale}/shop`}>Continuă cumpărăturile</a>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4">
                {lines.map((line) => {
                  const product = products.find((p) => p.id === line.productId);
                  if (!product) return null;

                  return (
                    <div key={line.productId} className="flex gap-4 p-4 bg-card rounded-lg">
                      <img
                        src={product.images[0].src}
                        alt={product.images[0].alt}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{product.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {line.unitPrice.amount} {line.unitPrice.currency}
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7"
                            onClick={() => updateQty(line.productId, line.qty - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{line.qty}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7"
                            onClick={() => updateQty(line.productId, line.qty + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 ml-auto"
                            onClick={() => removeItem(line.productId)}
                          >
                            <Trash2 className="w-3 h-3 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t pt-4 mt-4 space-y-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>
                    {total.amount} {total.currency}
                  </span>
                </div>
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  {t('shop.checkout')}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
