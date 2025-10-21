import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Gallery() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const gallery = [
    {
      id: '1',
      before: 'https://images.unsplash.com/photo-1603891219583-11b3abf8c5a4?w=600',
      after: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600',
      device: 'iPhone 15 Pro',
      service: 'Înlocuire ecran',
      duration: 60
    },
    {
      id: '2',
      before: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
      after: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600',
      device: 'Samsung S24 Ultra',
      service: 'Reparare spate sticlă',
      duration: 90
    },
    {
      id: '3',
      before: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600',
      after: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600',
      device: 'iPhone 14',
      service: 'Înlocuire baterie',
      duration: 45
    }
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">Galerie Before/After</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Vezi rezultatele muncii noastre profesionale.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden hover-scale cursor-pointer"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={hoveredId === item.id ? item.after : item.before}
                  alt={`${item.device} ${item.service}`}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute top-2 right-2">
                  <Badge>
                    {hoveredId === item.id ? 'After' : 'Before'}
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{item.device}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.service}</p>
                <Badge variant="secondary" className="text-xs">
                  ⏱️ {item.duration} min
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
