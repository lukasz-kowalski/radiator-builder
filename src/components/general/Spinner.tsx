export default function Spinner() {
  return (
    <div
      className="flex justify-center items-center py-6"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Loading...</span>
      <div className="h-6 w-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
}
