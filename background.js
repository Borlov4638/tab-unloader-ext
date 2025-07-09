const MS_IN_SEC = 1000;

function discardUnusedTabs(sec) {
  browser.tabs.query({}).then((tabs) => {
    const staleTabs = tabs.filter(
      (tab) =>
        !tab.discarded && Date.now() > tab.lastAccessed + sec * MS_IN_SEC,
    );

    if (staleTabs.length > 0) {
      console.log(` got ${staleTabs.length} tabs...`);
      staleTabs.forEach((tab) => {
        console.log(tab);
        browser.tabs
          .discard(tab.id)
          .catch((err) => console.error("err discarding", err));
      });
    } else {
      console.log("no old tabs are presented");
    }
  });
}

setInterval(() => discardUnusedTabs(600), 10 * MS_IN_SEC);
