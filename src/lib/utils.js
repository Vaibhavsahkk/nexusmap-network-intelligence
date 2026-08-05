/**
 * NexusMap Shared Utility Functions
 */

export function getAvatarUrl(name) {
  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=00d2ff,8b5cf6,10b981`;
}

export function formatDegreeLabel(degree) {
  if (degree === 1) return '1st Degree (Direct)';
  if (degree === 2) return '2nd Degree (Mutual)';
  if (degree === 3) return '3rd Degree (Network)';
  return `${degree}th Degree`;
}

export function truncateText(str, maxLength = 60) {
  if (!str) return '';
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
}
