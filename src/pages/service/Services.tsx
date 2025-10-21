import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Services() {
  const { t } = useTranslation();

  const services = [
    {
      category: 'Ecran',
      items: ['Înlocuire ecran complet', 'Reparare ecran spart', 'Calibrare touch screen']
    },
    {
      category: 'Baterie',
      items: ['Înlocuire baterie originală', 'Diagnostic capacitate baterie', 'Optimizare consum']
    },
    {
      category: 'Port & Conectivitate',
      items: ['Reparare port încărcare', 'Reparare port audio', 'Fix probleme WiFi/Bluetooth']
    },
    {
      category: 'Cameră',
      items: ['Înlocuire cameră principală', 'Reparare cameră selfie', 'Fix Face ID/Touch ID']
    }
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">Servicii de reparații</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Echipa noastră oferă reparații profesionale pentru toate tipurile de dispozitive mobile.
        </p>

        <div className="space-y-6">
          {services.map((service, i) => (
            <Card key={i} className="p-6">
              <h2 className="text-2xl font-semibold mb-4">{service.category}</h2>
              <ul className="space-y-2">
                {service.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
