// Utility to get cart for a user (id or email)
export function getUserCart(userIdOrEmail) {
  if (!userIdOrEmail) return [];
  try {
    return JSON.parse(localStorage.getItem(`cart_${userIdOrEmail}`) || '[]');
  } catch (e) {
    return [];
  }
}
