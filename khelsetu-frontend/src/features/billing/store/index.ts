import type {
  Invoice,
  PaymentMethod,
  Plan,
  Subscription,
} from '@features/billing/types';
import { create } from 'zustand';

interface BillingState {
  subscription: Subscription | null;
  invoices: Invoice[];
  availablePlans: Plan[];
  paymentMethods: PaymentMethod[];
  setSubscription: (subscription: Subscription | null) => void;
  setInvoices: (invoices: Invoice[]) => void;
  setPlans: (plans: Plan[]) => void;
  setPaymentMethods: (methods: PaymentMethod[]) => void;
  clearBilling: () => void;
}

export const useBillingStore = create<BillingState>((set) => ({
  subscription: null,
  invoices: [],
  availablePlans: [],
  paymentMethods: [],
  setSubscription: (subscription) => set({ subscription }),
  setInvoices: (invoices) => set({ invoices }),
  setPlans: (plans) => set({ availablePlans: plans }),
  setPaymentMethods: (methods) => set({ paymentMethods: methods }),
  clearBilling: () =>
    set({
      subscription: null,
      invoices: [],
      availablePlans: [],
      paymentMethods: [],
    }),
}));
