import type { Invoice, PaymentMethod, Plan, Subscription } from '@features/billing/types';
import { axiosInstance } from '@lib/axios';
import { API_ENDPOINTS } from '@utils/constants';

export const billingService = {
  getPlans: async (): Promise<Plan[]> => {
    const { data } = await axiosInstance.get<Plan[]>(
      API_ENDPOINTS.BILLING.PLANS,
    );
    return data;
  },

  getSubscription: async (): Promise<Subscription | null> => {
    const { data } = await axiosInstance.get<Subscription>(
      API_ENDPOINTS.BILLING.SUBSCRIPTION,
    );
    return data;
  },

  getInvoices: async (): Promise<Invoice[]> => {
    const { data } = await axiosInstance.get<Invoice[]>(
      API_ENDPOINTS.BILLING.INVOICES,
    );
    return data;
  },

  updatePlan: async (planId: string): Promise<Subscription> => {
    const { data } = await axiosInstance.post<Subscription>(
      API_ENDPOINTS.BILLING.UPDATE_PLAN,
      { planId },
    );
    return data;
  },

  cancelSubscription: async (): Promise<void> => {
    await axiosInstance.post(API_ENDPOINTS.BILLING.CANCEL_SUBSCRIPTION);
  },

  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    const { data } = await axiosInstance.get<PaymentMethod[]>(
      API_ENDPOINTS.BILLING.PAYMENT_METHODS,
    );
    return data;
  },

  addPaymentMethod: async (method: Record<string, unknown>): Promise<PaymentMethod> => {
    const { data } = await axiosInstance.post<PaymentMethod>(
      API_ENDPOINTS.BILLING.PAYMENT_METHODS,
      method,
    );
    return data;
  },

  removePaymentMethod: async (id: string): Promise<void> => {
    await axiosInstance.delete(
      `${API_ENDPOINTS.BILLING.PAYMENT_METHODS}/${id}`,
    );
  },

  downloadInvoice: async (invoiceId: string): Promise<Blob> => {
    const { data } = await axiosInstance.get(
      `${API_ENDPOINTS.BILLING.INVOICES}/${invoiceId}/download`,
      { responseType: 'blob' },
    );
    return data;
  },
};
