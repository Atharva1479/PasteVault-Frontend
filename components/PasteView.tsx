"use client";

import { PasteResponse } from "@/lib/api";
import CopyButton from "./CopyButton";
import Link from "next/link";

interface PasteViewProps {
  paste: PasteResponse;
}

function formatExpiry(expiresAt: string | null): string {
  if (!expiresAt) return "Never";

  const expiry = new Date(expiresAt);
  const now = new Date();
  const diff = expiry.getTime() - now.getTime();

  if (diff <= 0) return "Expired";

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  return `${minutes}m`;
}

export default function PasteView({ paste }: PasteViewProps) {
  return (
    <div className="w-full max-w-4xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Views remaining:</span>
            <span className="text-white font-medium">
              {paste.remaining_views !== null ? paste.remaining_views : "Unlimited"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">Expires:</span>
            <span className="text-white font-medium">
              {formatExpiry(paste.expires_at)}
            </span>
          </div>
        </div>
        <CopyButton text={paste.content} label="Copy Content" />
      </div>

      <div className="bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden">
        <pre className="p-4 overflow-x-auto text-sm text-zinc-100 font-mono whitespace-pre-wrap break-words">
          {paste.content}
        </pre>
      </div>

      <Link
        href="/"
        className="inline-block px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg transition-colors font-medium"
      >
        Create New Paste
      </Link>
    </div>
  );
}
