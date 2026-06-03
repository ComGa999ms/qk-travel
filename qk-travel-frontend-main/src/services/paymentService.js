import api from "./api";

const paymentService = {
  createPaymentOrder: async (subscriptionPlanId, giftcode = null) => {
    try {
      const payload = { subscriptionPlanId };
      if (giftcode) {
        payload.giftcode = giftcode;
      }
      const response = await api.post("/api/Payment/create-order", payload);
      return response.data;
    } catch (error) {
      console.error("Error creating payment order:", error);
      throw error;
    }
  },

  getPaymentStatus: async (paymentId) => {
    try {
      const response = await api.get(`/api/Payment/${paymentId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching payment status:", error);
      throw error;
    }
  },

  checkStatus: async (orderCode) => {
    try {
      const response = await api.get(`/api/Payment/check-status/${orderCode}`);
      return response.data;
    } catch (error) {
      console.error("Error checking payment status:", error);
      throw error;
    }
  },
};

export default paymentService;
