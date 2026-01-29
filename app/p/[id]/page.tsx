import { getPaste } from "@/lib/api";
import PasteView from "@/components/PasteView";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ViewPastePage({ params }: PageProps) {
  const { id } = await params;

  try {
    const paste = await getPaste(id);
    return (
      <div className="flex flex-col items-center">
        <PasteView paste={paste} />
      </div>
    );
  } catch {
    return (
      <div className="flex flex-col items-center">
        <div className="text-center space-y-6">
          <div className="text-6xl">404</div>
          <h1 className="text-2xl font-bold text-white">
            Paste Not Found
          </h1>
          <p className="text-zinc-400 max-w-md">
            This paste may have expired, reached its view limit, or never existed.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            Create New Paste
          </Link>
        </div>
      </div>
    );
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  return {
    title: `Paste ${id} - PasteVault`,
    description: "View shared paste content",
  };
}
