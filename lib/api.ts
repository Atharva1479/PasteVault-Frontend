export interface CreatePasteRequest {
  content: string;
  ttl_seconds?: number;
  max_views?: number;
}

export interface CreatePasteResponse {
  id: string;
  url: string;
}

export interface PasteResponse {
  content: string;
  remaining_views: number | null;
  expires_at: string | null;
}

export interface ApiError {
  message: string;
  timestamp?: string;
}

function getApiBase(): string {
  if (typeof window === "undefined") {
    return process.env.BACKEND_URL || "http://localhost:8080";
  }
  return "";
}

export async function createPaste(
  data: CreatePasteRequest
): Promise<CreatePasteResponse> {
  const response = await fetch(`${getApiBase()}/api/pastes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({
      message: "Failed to create paste",
    }));
    throw new Error(error.message);
  }

  return response.json();
}

export async function getPaste(id: string): Promise<PasteResponse> {
  const response = await fetch(`${getApiBase()}/api/pastes/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Paste not found or expired");
    }
    const error: ApiError = await response.json().catch(() => ({
      message: "Failed to fetch paste",
    }));
    throw new Error(error.message);
  }

  return response.json();
}

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${getApiBase()}/api/healthz`);
    const data = await response.json();
    return data.ok === true;
  } catch {
    return false;
  }
}
