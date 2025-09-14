async function sendToZapier() {
  const link = document.getElementById("ytLink").value.trim();
  const resultBox = document.getElementById("resultBox");

  if (!link || !link.includes("youtube.com")) {
    resultBox.textContent = "❌ Please enter a valid YouTube link.";
    return;
  }

  resultBox.textContent = "⏳ Analyzing video... Please wait.";

  try {
    const response = await fetch("https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: link })
    });

    const data = await response.json();

    if (data.summary) {
      resultBox.textContent = data.summary;
    } else {
      resultBox.textContent = "⚠️ No summary returned. Check Zapier or Galaxy AI setup.";
    }
  } catch (error) {
    resultBox.textContent = "🚫 Error contacting backend. Check your Zapier webhook.";
    console.error(error);
  }
}

function copyResult() {
  const text = document.getElementById("resultBox").textContent;
  navigator.clipboard.writeText(text).then(() => {
    alert("✅ Result copied to clipboard!");
  });
}
