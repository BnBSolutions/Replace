import { create } from 'zustand';
import { ServiceTicket } from '@/types';

type BookingStore = {
  currentBooking: Partial<ServiceTicket> | null;
  updateBooking: (data: Partial<ServiceTicket>) => void;
  clearBooking: () => void;
  submitBooking: () => Promise<void>;
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  currentBooking: null,

  updateBooking: (data) => {
    set((state) => ({
      currentBooking: {
        ...state.currentBooking,
        ...data,
      },
    }));
  },

  clearBooking: () => {
    set({ currentBooking: null });
  },

  submitBooking: async () => {
    const booking = get().currentBooking;
    if (!booking) return;

    // TODO: Replace with actual API call
    console.log('Submitting booking:', booking);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate WhatsApp message
    const message = `
Rezervare nouă:
📱 Model: ${booking.deviceBrand} ${booking.deviceModel}
🔧 Problemă: ${booking.issue}
👤 Nume: ${booking.customer?.name}
📞 Telefon: ${booking.customer?.phone}
📧 Email: ${booking.customer?.email || 'N/A'}
    `.trim();

    const whatsappUrl = `https://wa.me/37360000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    set({ currentBooking: null });
  },
}));
