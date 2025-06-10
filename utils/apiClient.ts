interface MessagePayload {
  text: string;
  createdAt: number;
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  [key: string]: any; // Gerekirse ek alanlar
}

export async function fetchData(): Promise<any> {
  const res = await fetch("/api/rtdbHandler", {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const json = await res.json();
  return json.data;
}

export async function sendData(data: MessagePayload): Promise<any> {
  const res = await fetch("/api/rtdbHandler", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), // RTDB için doğrudan data yollanıyor
  });

  if (!res.ok) {
    throw new Error("Failed to send data");
  }

  return await res.json();
}
