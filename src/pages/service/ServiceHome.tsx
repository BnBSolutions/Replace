import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Clock, 
  Award, 
  Phone, 
  MessageCircle,
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ReserveWidget from '@/components/service/ReserveWidget';

export default function ServiceHome() {
  const { t } = useTranslation();
  const { locale } = useParams();

  const features = [
    {
      icon: Shield,
      title: 'Diagnostic gratuit',
      description: 'Analiză completă fără costuri ascunse'
    },
    {
      icon: Clock,
      title: 'Reparație rapidă',
      description: 'Majoritatea reparațiilor în 1-2 ore'
    },
    {
      icon: Award,
      title: 'Garanție 6 luni',
      description: 'Protejăm investiția ta'
    }
  ];

  const services = [
    { name: 'Înlocuire ecran', icon: '📱', desc: 'Ecrane originale, instalare profesională' },
    { name: 'Înlocuire baterie', icon: '🔋', desc: 'Baterii certificate, performanță maximă' },
    { name: 'Reparare port', icon: '🔌', desc: 'Port încărcare, audio, probleme de conectare' },
    { name: 'Cameră & Senzori', icon: '📷', desc: 'Camera față/spate, Face ID, senzori' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-accent-deep pt-20 pb-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1920')] opacity-5 bg-cover bg-center" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                {t('hero.cta')}
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                {t('hero.ctaSecondary')}
              </Button>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto"
          >
            {features.map((feature, i) => (
              <Card key={i} className="glass-card p-6 text-center hover-scale">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reserve Widget Section */}
      <section className="py-20 -mt-20 relative z-20">
        <div className="container mx-auto px-4">
          <ReserveWidget />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Servicii populare</h2>
            <p className="text-muted-foreground text-lg">
              Reparații profesionale pentru toate tipurile de probleme
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 hover-scale cursor-pointer h-full">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to={`/${locale}/services`}>
                Vezi toate serviciile
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass-card p-12 rounded-3xl">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold gradient-text mb-2">5000+</div>
                <p className="text-muted-foreground">Dispozitive reparate</p>
              </div>
              <div>
                <div className="text-5xl font-bold gradient-text mb-2">98%</div>
                <p className="text-muted-foreground">Clienți mulțumiți</p>
              </div>
              <div>
                <div className="text-5xl font-bold gradient-text mb-2">6</div>
                <p className="text-muted-foreground">Luni garanție</p>
              </div>
              <div>
                <div className="text-5xl font-bold gradient-text mb-2">1-2h</div>
                <p className="text-muted-foreground">Timp mediu reparație</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ai nevoie de ajutor rapid?</h2>
          <p className="text-xl mb-8 opacity-90">
            Suntem aici pentru tine! Contactează-ne acum.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="tel:+37360000000" className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>Sună acum</span>
              </a>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <a href="https://wa.me/37360000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
