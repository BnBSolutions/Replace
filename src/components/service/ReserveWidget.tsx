import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Smartphone, Wrench, Calendar as CalendarIcon, User, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { useBookingStore } from '@/store/booking';
import { toast } from 'sonner';
import { format, addDays, setHours, setMinutes } from 'date-fns';
import { ro } from 'date-fns/locale';
import modelsData from '@/data/models.json';
import servicesData from '@/data/services.json';

type Step = 'device' | 'issue' | 'slot' | 'details';

export default function ReserveWidget() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { locale } = useParams();
  const [step, setStep] = useState<Step>('device');
  const { currentBooking, updateBooking, submitBooking } = useBookingStore();

  const [form, setForm] = useState({
    brand: '',
    model: '',
    issue: '',
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Generate available time slots (9:00 - 18:00, every hour)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour < 18) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const issues = [
    { id: 'screen', name: 'Ecran spart/defect', icon: '📱' },
    { id: 'battery', name: 'Baterie slabă', icon: '🔋' },
    { id: 'port', name: 'Port încărcare', icon: '🔌' },
    { id: 'camera', name: 'Cameră defectă', icon: '📷' },
    { id: 'water-damage', name: 'Contact cu apă', icon: '💧' },
    { id: 'other', name: 'Altceva', icon: '🔧' }
  ];

  const handleNext = () => {
    if (step === 'device' && (!form.brand || !form.model)) {
      toast.error('Selectează marca și modelul');
      return;
    }
    if (step === 'issue' && !form.issue) {
      toast.error('Selectează problema');
      return;
    }
    if (step === 'slot' && (!selectedDate || !selectedTime)) {
      toast.error('Selectează data și ora');
      return;
    }
    if (step === 'details') {
      handleSubmit();
      return;
    }

    const steps: Step[] = ['device', 'issue', 'slot', 'details'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex < steps.length - 1) {
      setStep(steps[currentIndex + 1]);
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone) {
      toast.error('Completează numele și telefonul');
      return;
    }

    // Create slot from selected date and time
    let slot;
    if (selectedDate && selectedTime) {
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const startDate = setMinutes(setHours(selectedDate, hours), minutes);
      const endDate = addDays(startDate, 0); // Can adjust duration based on service
      
      slot = {
        start: startDate.toISOString(),
        end: endDate.toISOString(),
      };
    }

    updateBooking({
      deviceBrand: form.brand,
      deviceModel: form.model,
      issue: form.issue,
      slot,
      customer: {
        name: form.name,
        phone: form.phone,
        email: form.email
      },
      notes: form.notes,
      status: 'pending'
    });

    await submitBooking();
    toast.success('Rezervare trimisă! Te vom contacta în curând.');
    
    // Reset form
    setForm({
      brand: '',
      model: '',
      issue: '',
      name: '',
      phone: '',
      email: '',
      notes: ''
    });
    setSelectedDate(undefined);
    setSelectedTime('');
    setStep('device');
  };

  const selectedBrandModels = modelsData.find(b => b.brand === form.brand)?.models || [];

  return (
    <Card className="glass-card p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">{t('service.reserve')}</h2>
        <div className="flex items-center gap-2 mt-4">
          {['device', 'issue', 'slot', 'details'].map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`h-2 rounded-full flex-1 ${
                  ['device', 'issue', 'slot', 'details'].indexOf(step) >= i
                    ? 'bg-primary'
                    : 'bg-muted'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 'device' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Smartphone className="w-6 h-6" />
                <h3 className="text-xl font-semibold">{t('service.selectDevice')}</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Marca</Label>
                  <Select value={form.brand} onValueChange={(v) => setForm({ ...form, brand: v, model: '' })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Alege marca" />
                    </SelectTrigger>
                    <SelectContent>
                      {modelsData.map((b) => (
                        <SelectItem key={b.brand} value={b.brand}>
                          {b.brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {form.brand && (
                  <div>
                    <Label>Model</Label>
                    <Select value={form.model} onValueChange={(v) => setForm({ ...form, model: v })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Alege modelul" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedBrandModels.map((m) => (
                          <SelectItem key={m} value={m}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 'issue' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Wrench className="w-6 h-6" />
                <h3 className="text-xl font-semibold">{t('service.selectIssue')}</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {issues.map((issue) => (
                  <button
                    key={issue.id}
                    onClick={() => setForm({ ...form, issue: issue.name })}
                    className={`p-4 rounded-lg border-2 transition-all hover-scale ${
                      form.issue === issue.name
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card'
                    }`}
                  >
                    <div className="text-3xl mb-2">{issue.icon}</div>
                    <div className="text-sm font-medium">{issue.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 'slot' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-primary mb-4">
                <CalendarIcon className="w-6 h-6" />
                <h3 className="text-xl font-semibold">{t('service.selectSlot')}</h3>
              </div>

              <div className="space-y-6">
                {/* Calendar */}
                <div>
                  <Label className="mb-2 block">Selectează data</Label>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => {
                        // Disable past dates and Sundays
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today || date.getDay() === 0;
                      }}
                      locale={ro}
                      className="rounded-lg border pointer-events-auto"
                    />
                  </div>
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div>
                    <Label className="mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Selectează ora
                    </Label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={selectedTime === time ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                          className="w-full"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedDate && selectedTime && (
                  <div className="bg-primary/10 rounded-lg p-4 text-center">
                    <p className="text-sm font-medium">
                      📅 {format(selectedDate, 'EEEE, d MMMM yyyy', { locale: ro })}
                    </p>
                    <p className="text-sm font-medium mt-1">
                      🕐 {selectedTime}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 'details' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-primary mb-4">
                <User className="w-6 h-6" />
                <h3 className="text-xl font-semibold">{t('service.yourDetails')}</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>{t('service.name')}</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ion Popescu"
                  />
                </div>
                <div>
                  <Label>{t('service.phone')}</Label>
                  <Input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+373 60 000 000"
                  />
                </div>
                <div>
                  <Label>{t('service.email')}</Label>
                  <Input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <Label>{t('service.notes')}</Label>
                  <Input
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Alte detalii..."
                  />
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="font-medium">Sumar rezervare:</p>
                <p className="text-sm text-muted-foreground">
                  Dispozitiv: {form.brand} {form.model}
                </p>
                <p className="text-sm text-muted-foreground">Problemă: {form.issue}</p>
                {selectedDate && selectedTime && (
                  <p className="text-sm text-muted-foreground">
                    Data: {format(selectedDate, 'd MMMM yyyy', { locale: ro })} la {selectedTime}
                  </p>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={() => {
            const steps: Step[] = ['device', 'issue', 'slot', 'details'];
            const currentIndex = steps.indexOf(step);
            if (currentIndex > 0) setStep(steps[currentIndex - 1]);
          }}
          disabled={step === 'device'}
        >
          Înapoi
        </Button>
        <Button onClick={handleNext} className="gap-2">
          {step === 'details' ? t('service.confirm') : 'Continuă'}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
