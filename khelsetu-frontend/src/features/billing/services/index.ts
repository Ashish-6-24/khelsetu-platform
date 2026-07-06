import type {
  Invoice,
  PaymentMethod,
  Plan,
  Subscription,
} from '@features/billing/types';
import { axiosInstance } from '@lib/axios';
import { API_ENDPOINTS } from '@shared/utils/constants';
import { normalizeArray, normalizeObject } from '@shared/utils/normalize';

export const billingService = {
  getPlans: async (): Promise<Plan[]> => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.BILLING.PLANS);
    return normalizeArray<Plan>(data);
  },

  getSubscription: async (): Promise<Subscription | null> => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.BILLING.SUBSCRIPTION);
    return normalizeObject<Subscription>(data);
  },

  getInvoices: async (): Promise<Invoice[]> => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.BILLING.INVOICES);
    return normalizeArray<Invoice>(data);
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
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.BILLING.PAYMENT_METHODS,
    );
    return normalizeArray<PaymentMethod>(data);
  },

  addPaymentMethod: async (
    method: Record<string, unknown>,
  ): Promise<PaymentMethod> => {
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
