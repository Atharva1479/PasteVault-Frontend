"use client";

import { useState } from "react";
import { createPaste, CreatePasteResponse } from "@/lib/api";
import CopyButton from "./CopyButton";

const TTL_OPTIONS = [
  { label: "Never expires", value: undefined },
  { label: "5 minutes", value: 300 },
  { label: "1 hour", value: 3600 },
  { label: "1 day", value: 86400 },
  { label: "7 days", value: 604800 },
  { label: "30 days", value: 2592000 },
];

export default function PasteForm() {
  const [content, setContent] = useState("");
  const [ttlSeconds, setTtlSeconds] = useState<number | undefined>(undefined);
  const [maxViews, setMaxViews] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CreatePasteResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!content.trim()) {
      setError("Content is required");
      return;
    }

    setLoading(true);

    try {
      const response = await createPaste({
        content: content,
        ttl_seconds: ttlSeconds,
        max_views: maxViews ? parseInt(maxViews, 10) : undefined,
      });
      setResult(response);
      setContent("");
      setTtlSeconds(undefined);
      setMaxViews("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create paste");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAnother = () => {
    setResult(null);
    setError(null);
  };

  if (result) {
    return (
      <div className="w-full max-w-2xl space-y-6">
        <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-green-400 mb-4">
            Paste Created!
          </h2>
          <p className="text-zinc-400 text-sm mb-3">Share this URL:</p>
          <div className="flex items-center gap-3">
            <input
              type="text"
              readOnly
              value={result.url}
              className="flex-1 bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-3 text-white font-mono text-sm"
            />
            <CopyButton text={result.url} label="Copy URL" />
          </div>
        </div>
        <button
          onClick={handleCreateAnother}
          className="w-full py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg transition-colors font-medium"
        >
          Create Another Paste
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-5">
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-zinc-300 mb-2"
        >
          Paste Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your text, code, or content here..."
          rows={12}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white font-mono text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="ttl"
            className="block text-sm font-medium text-zinc-300 mb-2"
          >
            Expiration
          </label>
          <select
            id="ttl"
            value={ttlSeconds ?? ""}
            onChange={(e) =>
              setTtlSeconds(e.target.value ? parseInt(e.target.value, 10) : undefined)
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {TTL_OPTIONS.map((option) => (
              <option key={option.label} value={option.value ?? ""}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="maxViews"
            className="block text-sm font-medium text-zinc-300 mb-2"
          >
            Max Views (optional)
          </label>
          <input
            type="number"
            id="maxViews"
            value={maxViews}
            onChange={(e) => setMaxViews(e.target.value)}
            placeholder="Unlimited"
            min="1"
            max="10000"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !content.trim()}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
      >
        {loading ? "Creating..." : "Create Paste"}
      </button>
    </form>
  );
}
