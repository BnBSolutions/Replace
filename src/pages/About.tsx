import { Card } from '@/components/ui/card';
import { Shield, Users, Award, Clock } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Shield,
      title: 'Calitate garantată',
      description: 'Folosim doar piese originale și oferim garanție de 6 luni pentru toate reparațiile.'
    },
    {
      icon: Users,
      title: 'Echipă profesionistă',
      description: 'Tehnicieni certificați cu peste 10 ani de experiență în reparații mobile.'
    },
    {
      icon: Award,
      title: 'Service autorizat',
      description: 'Partener autorizat pentru cele mai importante branduri de telefoane.'
    },
    {
      icon: Clock,
      title: 'Rapiditate',
      description: 'Majoritatea reparațiilor sunt finalizate în 1-2 ore, chiar în aceeași zi.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">Despre noi</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Cu peste 10 ani de experiență, suntem liderul pieței în reparații profesionale de dispozitive mobile în Chișinău.
        </p>

        <div className="prose prose-lg dark:prose-invert mb-16">
          <p>
            Replace a fost fondat în 2014 cu misiunea de a oferi servicii de reparații de cea mai înaltă calitate 
            pentru dispozitive mobile. De-a lungul anilor, am reparat peste 5000 de telefoane și am construit o bază 
            solidă de clienți mulțumiți.
          </p>
          <p>
            Echipa noastră de tehnicieni certificați folosește echipamente profesionale și piese originale pentru a 
            garanta că dispozitivul tău este reparat la cele mai înalte standarde. Oferim diagnostic gratuit și 
            garanție de 6 luni pentru toate reparațiile.
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-8">Valorile noastre</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {values.map((value, i) => (
            <Card key={i} className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
