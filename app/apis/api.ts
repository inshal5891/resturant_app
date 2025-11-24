const BACKEND_URL =
  typeof process !== "undefined" && process.env?.NEXT_PUBLIC_BACKEND_URL
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : "https://restuarnt-manegment-production.up.railway.app/";

export interface OrderItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

export interface OrderIn {
  name: string;
  phone: string;
  items: OrderItem[];
  total_price: number;
  delivery_type: string;
  address: string;
}

export interface OrderOut {
  id: number;
  name: string;
  items: OrderItem[];
  phone: string;
  status: string;
  total_price: number;
  delivery_type: string;
  address: string;
  created_at: string | null;
}

export class ApiError extends Error {
  status?: number;
  payload?: any;
  raw?: string | null;
}

// Helper to format backend error details into a readable string
export function formatDetail(detail: any): string {
  if (!detail) return "Request failed";

  if (typeof detail === "string") return detail;

  if (Array.isArray(detail)) {
    const parts = detail.map((d: any) => {
      if (d?.loc && d?.msg) {
        const loc = Array.isArray(d.loc) ? d.loc.join(".") : String(d.loc);
        const msg = typeof d.msg === "string" ? d.msg : JSON.stringify(d.msg);
        return `${loc}: ${msg}`;
      }

      if (d?.loc && d?.detail) {
        const loc = Array.isArray(d.loc) ? d.loc.join(".") : String(d.loc);
        const msg = typeof d.detail === "string" ? d.detail : JSON.stringify(d.detail);
        return `${loc}: ${msg}`;
      }

      if (d?.msg) return typeof d.msg === "string" ? d.msg : JSON.stringify(d.msg);
      if (d?.detail) return typeof d.detail === "string" ? d.detail : JSON.stringify(d.detail);
      return JSON.stringify(d);
    });
    return parts.join("; ");
  }

  if (typeof detail === "object") return JSON.stringify(detail);

  return String(detail);
}

export const getOrders = async (): Promise<OrderOut[]> => {
  try {
    const res = await fetch(`${BACKEND_URL}/orders`);
    // Read response as text first so we can preserve raw body when JSON parsing fails
    const text = await res.text().catch(() => null);
    let json: any = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = null;
    }

    if (!res.ok) {
      const detail = json?.detail ?? json ?? text;
      const message = detail ? formatDetail(detail) : res.statusText ?? "Request failed";

      const err = new ApiError(message);
      err.status = res.status;
      err.payload = json ?? (text ?? null);
      err.raw = text;
      throw err;
    }

    // Prefer parsed JSON on success, but return raw text if parsing failed
    return (json ?? text) as any;
  } catch (err) {
    if (err instanceof Error) throw err;
    throw new Error("Network error while fetching orders");
  }
};

export const postOrder = async (order: OrderIn): Promise<OrderOut> => {
  // helper to POST a payload and return parsed result or throw ApiError
  const doPost = async (payload: any) => {
    const res = await fetch(`${BACKEND_URL}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text().catch(() => null);
    let json: any = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = null;
    }

    if (!res.ok) {
      const detail = json?.detail ?? json ?? text;
      const message = detail ? formatDetail(detail) : res.statusText ?? "Request failed";

      const err = new ApiError(message);
      err.status = res.status;
      err.payload = json ?? (text ?? null);
      err.raw = text;
      throw err;
    }

    return (json ?? text) as any;
  };

  try {
    return await doPost(order);
  } catch (err: any) {
    // If backend complains that `item` should be a string, retry by stringifying `item`.
    if (err instanceof ApiError) {
      const raw = (err as any).raw ?? "";
      const payloadHasItem = (order as any).item !== undefined;

      const indicatesStringType =
        raw && typeof raw === "string" && raw.includes('"type":"string_type"');
      const indicatesLocItem =
        raw && typeof raw === "string" && raw.includes('"loc":["body","item"]');

      if ((indicatesStringType || indicatesLocItem) && payloadHasItem) {
        const retryPayload = { ...order } as any;
        try {
          retryPayload.item = JSON.stringify(retryPayload.item);
        } catch {
          retryPayload.item = String(retryPayload.item);
        }

        try {
          return await doPost(retryPayload);
        } catch (err2) {
          throw err2;
        }
      }
    }

    if (err instanceof Error) throw err;
    throw new Error("Network error while posting order");
  }
};
