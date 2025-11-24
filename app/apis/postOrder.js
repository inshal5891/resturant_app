const BACKEND_URL = (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_BACKEND_URL) ? process.env.NEXT_PUBLIC_BACKEND_URL : "http://127.0.0.1:8001";

export async function postOrder(data) {
  try {
    const res = await fetch(`${BACKEND_URL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      const message = json && json.detail ? json.detail : res.statusText || "Request failed";
      const err = new Error(message);
      err.status = res.status;
      err.payload = json;
      throw err;
    }

    return json;
  } catch (err) {
    // Normalize network / unexpected errors
    if (err instanceof Error) throw err;
    throw new Error("Network error while posting order");
  }
}
