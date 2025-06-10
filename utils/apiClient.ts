async function fetchData() {
  const res = await fetch("/api/firestoreHandler", {
    method: "GET",
  });
  const json = await res.json();
  return json.data;
}

async function sendData(data) {
  const res = await fetch("/api/firestoreHandler", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });
  const json = await res.json();
  return json;
}
