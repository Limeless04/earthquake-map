"use client";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-[90vh] items-center justify-center">
      <div className="rounded-2xl p-6 text-center shadow-md bg-[var(--background)] text-[var(--primary)]">
        <main className="flex flex-col items-center justify-center w-full h-full">
          <h2 className="text-xl font-semibold">Error</h2>
          <p className="mt-2">{error.message}</p>
          <button
            onClick={reset}
            className="mt-4 px-4 py-2 text-white bg-[var(--primary)] rounded transition hover:opacity-90"
          >
            Try Again
          </button>
        </main>
      </div>
    </div>
  );
}
