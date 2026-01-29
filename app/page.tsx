import PasteForm from "@/components/PasteForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Create a Paste
        </h1>
        <p className="text-zinc-400">
          Share text securely with optional expiration and view limits
        </p>
      </div>
      <PasteForm />
    </div>
  );
}
