import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import servicesData from '@/data/services.json';

export default function Prices() {
  const { t } = useTranslation();
  const [brandFilter, setBrandFilter] = useState('all');

  const brands = ['all', ...Array.from(new Set(servicesData.map(s => s.deviceBrand)))];
  
  const filteredServices = brandFilter === 'all' 
    ? servicesData 
    : servicesData.filter(s => s.deviceBrand === brandFilter);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">Prețuri reparații</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Prețuri transparente și competitive pentru toate serviciile noastre.
        </p>

        <div className="mb-8">
          <Select value={brandFilter} onValueChange={setBrandFilter}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Filtrează după marcă" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand === 'all' ? 'Toate mărcile' : brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          {filteredServices.map((service) => (
            <Card key={service.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {service.deviceBrand} {service.deviceModel}
                  </h3>
                  <p className="text-muted-foreground mb-3">{service.service}</p>
                  <div className="flex gap-3 text-sm">
                    <Badge variant="secondary">
                      ⏱️ {service.duration} min
                    </Badge>
                    <Badge variant="secondary">
                      ✅ {service.warranty} zile garanție
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">
                    {service.price.amount} {service.price.currency}
                  </div>
                  {service.compareAtPrice && (
                    <div className="text-sm text-muted-foreground line-through">
                      {service.compareAtPrice.amount} {service.compareAtPrice.currency}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
