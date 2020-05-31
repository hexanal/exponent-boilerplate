let viewportLockedAtScroll = null;

export function saveScrollPosition() {
  viewportLockedAtScroll = window.scrollY;
}

export function restoreScrollPosition() {
  if (viewportLockedAtScroll) {
    window.scrollTo({ top: viewportLockedAtScroll });
    viewportLockedAtScroll = null; // reset lock scroll distance
  }
}

export function toggleSavedScrollPosition(toggle) {
  if (toggle) {
    saveScrollPosition();
  } else {
    restoreScrollPosition();
  }
}

export function lockViewport(shouldLock = true) {
  if (shouldLock) saveScrollPosition();

  document.documentElement.dataset.scrollLock = shouldLock;

  if (!shouldLock) {
    restoreScrollPosition(); // gotta be after we "unlock" the document element so it can scroll again
  }

  return viewportLockedAtScroll;
}

// alias
export function releaseViewport() {
  return restoreScrollPosition();
}
