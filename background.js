const MS_IN_SEC = 1000;
let DISCARD_TIME_SEC = 600;

function discardUnusedTabs(sec) {
  browser.tabs.query({}).then((tabs) => {
    const staleTabs = tabs.filter(
      (tab) =>
        !tab.discarded && Date.now() > tab.lastAccessed + sec * MS_IN_SEC,
    );

    if (staleTabs.length > 0) {
      console.log(`Got ${staleTabs.length} tabs to discard...`);
      staleTabs.forEach((tab) => {
        console.log(tab);
        browser.tabs
          .discard(tab.id)
          .catch((err) => console.error("Error discarding tab:", err));
      });
    } else {
      console.log("No stale tabs found");
    }
  });
}

setInterval(() => discardUnusedTabs(DISCARD_TIME_SEC), 10 * MS_IN_SEC);

browser.runtime.onMessage.addListener((message) => {
  if (message.type === "update_discard_time") {
    const newTime = parseInt(message.value, 10);
    if (!isNaN(newTime) && newTime >= 0 && newTime <= 10000) {
      DISCARD_TIME_SEC = newTime;
      console.log(`Discard time updated to ${DISCARD_TIME_SEC} seconds`);
      return Promise.resolve({ status: "success" });
    } else {
      console.error("Invalid discard time received");
      return Promise.resolve({ status: "error", message: "Invalid time" });
    }
  }
});
