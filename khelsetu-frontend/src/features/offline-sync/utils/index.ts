export const offlineSyncUtils = {
  shouldRetry: (item: { retryCount: number }) => item.retryCount < 3,
  getOldestItem: (queue: { createdAt: string }[]) =>
    queue.length > 0
      ? queue.reduce((oldest, item) =>
          new Date(item.createdAt) < new Date(oldest.createdAt) ? item : oldest,
        )
      : null,
};
