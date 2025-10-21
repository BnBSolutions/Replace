import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">Contactează-ne</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Suntem aici pentru tine! Contactează-ne pentru orice întrebare sau programare.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Trimite-ne un mesaj</h2>
            <form className="space-y-4">
              <div>
                <Label>Nume complet</Label>
                <Input placeholder="Ion Popescu" />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="email@example.com" />
              </div>
              <div>
                <Label>Telefon</Label>
                <Input placeholder="+373 60 000 000" />
              </div>
              <div>
                <Label>Mesaj</Label>
                <Textarea rows={4} placeholder="Descrie problema ta..." />
              </div>
              <Button className="w-full" size="lg">
                Trimite mesajul
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Adresă</h3>
                  <p className="text-muted-foreground">
                    str. Ștefan cel Mare 123<br />
                    MD-2012, Chișinău, Moldova
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Telefon</h3>
                  <a href="tel:+37360000000" className="text-muted-foreground hover:text-primary">
                    +373 60 000 000
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a href="mailto:info@gsmservice.md" className="text-muted-foreground hover:text-primary">
                    info@gsmservice.md
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Program</h3>
                  <div className="text-muted-foreground space-y-1">
                    <p>Luni - Vineri: 09:00 - 19:00</p>
                    <p>Sâmbătă: 10:00 - 17:00</p>
                    <p>Duminică: Închis</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Map placeholder */}
            <Card className="p-6 aspect-video bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Hartă Google Maps</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
