import { create } from 'zustand';

type UIStore = {
  mobileMenuOpen: boolean;
  cartOpen: boolean;
  searchOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
};

export const useUIStore = create<UIStore>((set) => ({
  mobileMenuOpen: false,
  cartOpen: false,
  searchOpen: false,

  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setCartOpen: (open) => set({ cartOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
}));
