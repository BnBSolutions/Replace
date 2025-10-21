import ReserveWidget from '@/components/service/ReserveWidget';

export default function Reserve() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">Rezervă reparația</h1>
        <p className="text-xl text-muted-foreground">
          Completează formularul și te vom contacta în cel mai scurt timp.
        </p>
      </div>
      <ReserveWidget />
    </div>
  );
}
