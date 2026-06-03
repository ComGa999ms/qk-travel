const PREMIUM_PLAN_IDS = new Set([2, 3]);

export const hasPremiumAccess = (user) => {
  if (!user) return false;

  const subscriptionPlanId = Number(user.subscriptionPlanId);
  if (PREMIUM_PLAN_IDS.has(subscriptionPlanId)) return true;

  const planName = (user.subscriptionPlan || "").toString().toLowerCase();
  return planName.includes("premium");
};
