export const getExpiryStatus = (expiryDate: string): { status: 'fresh' | 'expiring' | 'expired'; daysLeft: number } => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) {
    return { status: 'expired', daysLeft };
  } else if (daysLeft <= 3) {
    return { status: 'expiring', daysLeft };
  } else {
    return { status: 'fresh', daysLeft };
  }
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export const isExpiringSoon = (expiryDate: string): boolean => {
  const { status } = getExpiryStatus(expiryDate);
  return status === 'expiring';
};

export const getTodayString = (): string => {
  return new Date().toISOString().split('T')[0];
};