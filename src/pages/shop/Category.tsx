import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cart';
import { toast } from 'sonner';
import products from '@/data/products.json';
import categories from '@/data/categories.json';

export default function Category() {
  const { t } = useTranslation();
  const { slug, locale } = useParams();
  const addItem = useCartStore((state) => state.addItem);

  const category = categories.find((c) => c.slug === slug);
  const filteredProducts = products.filter((p) => p.category === category?.id);

  const handleAddToCart = (product: any) => {
    addItem(product as any);
    toast.success(`${product.title} ${t('shop.addedToCart')}`);
  };

  if (!category) {
    return <div className="container mx-auto px-4 py-20">{t('shop.categoryNotFound')}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4">{category.name.ro}</h1>
        <p className="text-xl text-muted-foreground">
          {filteredProducts.length} {t('shop.productsAvailable')}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden group hover-scale">
            <Link to={`/${locale}/shop/product/${product.slug}`}>
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </Link>
            <div className="p-4">
              <div className="flex gap-2 mb-2">
                {product.badges?.map((badge) => (
                  <Badge key={badge} variant="secondary" className="text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
              <Link to={`/${locale}/shop/product/${product.slug}`}>
                <h3 className="font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
                  {product.title}
                </h3>
              </Link>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-2xl font-bold text-primary">
                  {product.price.amount} {product.price.currency}
                </span>
                {product.compareAt && (
                  <span className="text-sm text-muted-foreground line-through">
                    {product.compareAt.amount}
                  </span>
                )}
              </div>
              <Button
                className="w-full"
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? t('shop.outOfStock') : t('shop.addToCart')}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
