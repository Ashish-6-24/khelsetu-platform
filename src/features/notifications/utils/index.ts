export const notificationUtils = {
  groupByDate: (notifications: { createdAt: string }[]) => {
    const groups: Record<string, typeof notifications> = {};
    notifications.forEach((n) => {
      const date = new Date(n.createdAt).toLocaleDateString();
      groups[date] ??= [];
      groups[date].push(n);
    });
    return groups;
  },
};
