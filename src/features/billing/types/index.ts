export interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  features: string[];
  maxTournaments?: number;
  maxTeams?: number;
  maxPlayers?: number;
  priority: number;
}

export interface Subscription {
  id: string;
  planId: string;
  planName: string;
  status: 'active' | 'cancelled' | 'expired' | 'trialing';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  amount: number;
  currency: string;
}

export interface Invoice {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'overdue' | 'refunded';
  date: string;
  dueDate: string;
  description: string;
  pdfUrl?: string;
}

export interface BillingState {
  subscription: Subscription | null;
  invoices: Invoice[];
  availablePlans: Plan[];
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'khalti' | 'esewa';
  last4?: string;
  brand?: string;
  isDefault: boolean;
}
