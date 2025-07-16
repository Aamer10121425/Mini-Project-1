export function getExpiryStatus(expiryDate: string): {
  status: 'Expired' | 'Expiring Soon' | 'Fresh';
  daysLeft: number;
} {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let status: 'Expired' | 'Expiring Soon' | 'Fresh';
  if (daysLeft < 0) {
    status = 'Expired';
  } else if (daysLeft <= 3) {
    status = 'Expiring Soon';
  } else {
    status = 'Fresh';
  }

  return { status, daysLeft };
}
