const HISTORY_ENTRY_NOTICE_SEEN_KEY = "moodtail-history-entry-notice-seen";

export const hasSeenHistoryEntryNotice = (): boolean =>
  localStorage.getItem(HISTORY_ENTRY_NOTICE_SEEN_KEY) === "true";

export const markHistoryEntryNoticeAsSeen = (): void => {
  localStorage.setItem(HISTORY_ENTRY_NOTICE_SEEN_KEY, "true");
};

export const resetHistoryEntryNotice = (): void => {
  localStorage.removeItem(HISTORY_ENTRY_NOTICE_SEEN_KEY);
};
