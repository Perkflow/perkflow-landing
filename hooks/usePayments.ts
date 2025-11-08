import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  PaymentAPI,
  PaymentIntentCreateRequest,
  PaymentIntentResponse,
  PaymentStatusResponse,
  PaymentOut,
  PaymentHistoryOut,
  RefundCreateRequest,
  RefundOut,
  PaymentMethodOut,
  BillingStatsOut,
} from "@/connection/payment-api";
import { toast } from "sonner";
import React from "react"; // Added missing import for React

const paymentAPI = new PaymentAPI();

// Payment Intent Hooks
export function useCreatePaymentIntent() {
  return useMutation({
    mutationFn: (data: PaymentIntentCreateRequest) =>
      paymentAPI.createPaymentIntent(data),
    onSuccess: (data: PaymentIntentResponse) => {
      console.log("Payment intent created:", data.payment_intent_id);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Failed to create payment intent";
      toast.error(message);
    },
  });
}

export function usePaymentStatus(paymentIntentId?: string) {
  return useQuery({
    queryKey: ["payment-status", paymentIntentId],
    queryFn: () => paymentAPI.getPaymentStatus(paymentIntentId!),
    enabled: !!paymentIntentId,
    refetchInterval: (data) => {
      // Stop polling if payment is complete or failed
      if (
        data?.state?.data?.status === "succeeded" ||
        data?.state?.data?.status === "failed"
      ) {
        return false;
      }
      return 5000; // Poll every 5 seconds for pending payments
    },
  });
}

// Proposal Payments Hooks
export function useProposalPayments(proposalId?: number) {
  return useQuery({
    queryKey: ["proposal-payments", proposalId],
    queryFn: () => paymentAPI.getProposalPayments(proposalId!),
    enabled: !!proposalId,
  });
}

// Payment History Hooks
export function usePaymentHistory() {
  return useQuery({
    queryKey: ["payment-history"],
    queryFn: () => paymentAPI.getPaymentHistory(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Refund Hooks
export function useCreateRefund() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RefundCreateRequest) => paymentAPI.createRefund(data),
    onSuccess: (data: RefundOut, variables) => {
      toast.success("Refund processed successfully");

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ["payment-history"] });
      queryClient.invalidateQueries({ queryKey: ["billing-stats"] });

      // If we know the proposal ID, invalidate its payments
      if (variables.payment_id) {
        queryClient.invalidateQueries({ queryKey: ["proposal-payments"] });
      }
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Failed to process refund";
      toast.error(message);
    },
  });
}

// Payment Methods Hooks
export function usePaymentMethods() {
  return useQuery({
    queryKey: ["payment-methods"],
    queryFn: () => paymentAPI.getPaymentMethods(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

// Billing Stats Hooks
export function useBillingStats() {
  return useQuery({
    queryKey: ["billing-stats"],
    queryFn: () => paymentAPI.getBillingStats(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Legacy Hooks (for backward compatibility)
export function useInitiatePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      proposal_id: number;
      amount: number;
      currency?: string;
      payment_method: string;
      transaction_id?: string;
    }) => paymentAPI.initiatePayment(data),
    onSuccess: (data: PaymentOut, variables) => {
      toast.success("Payment initiated successfully");

      // Invalidate related queries
      queryClient.invalidateQueries({
        queryKey: ["proposal-payments", variables.proposal_id],
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Failed to initiate payment";
      toast.error(message);
    },
  });
}

export function useConfirmPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      paymentId,
      data,
    }: {
      paymentId: number;
      data: {
        status?: string;
        transaction_id?: string;
        stripe_charge_id?: string;
        failure_reason?: string;
        receipt_url?: string;
        payment_method_details?: string;
      };
    }) => paymentAPI.confirmPayment(paymentId, data),
    onSuccess: (data: PaymentOut) => {
      toast.success("Payment confirmed successfully");

      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ["payment-history"] });
      queryClient.invalidateQueries({ queryKey: ["billing-stats"] });
      queryClient.invalidateQueries({
        queryKey: ["proposal-payments", data.proposal_id],
      });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Failed to confirm payment";
      toast.error(message);
    },
  });
}

// Utility hook for payment status polling
export function usePaymentPolling(
  paymentIntentId?: string,
  onSuccess?: (data: PaymentStatusResponse) => void,
) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["payment-polling", paymentIntentId],
    queryFn: () => paymentAPI.getPaymentStatus(paymentIntentId!),
    enabled: !!paymentIntentId,
    refetchInterval: 3000, // Poll every 3 seconds
  });

  // Handle success/failure in useEffect
  React.useEffect(() => {
    if (data) {
      if (data.status === "succeeded") {
        toast.success("Payment completed successfully!");
        onSuccess?.(data);
      } else if (data.status === "failed") {
        toast.error("Payment failed. Please try again.");
      }
    }
  }, [data, onSuccess]);

  return { data, error, isLoading };
}
