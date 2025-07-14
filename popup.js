document.getElementById("set-time-btn").addEventListener("click", () => {
  const input = document.getElementById("discard-time");
  const newTime = parseInt(input.value, 10);
  if (!isNaN(newTime) && newTime >= 0 && newTime <= 10000) {
    browser.runtime
      .sendMessage({
        type: "update_discard_time",
        value: newTime,
      })
      .then((response) => {
        if (response.status === "success") {
          console.log("Discard time updated successfully");
        } else {
          console.error("Failed to update discard time:", response.message);
        }
      })
      .catch((err) => {
        console.error("Error sending message:", err);
      });
  } else {
    console.error("Invalid discard time entered");
  }
});
