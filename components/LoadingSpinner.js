export default function LoadingSpinner() {
  return (
    <div>
      <div
        style={{ borderTopColor: "transparent" }}
        className="w-6 h-6 border-4 border-green-400 border-solid rounded-full animate-spin"
      ></div>
    </div>
  );
}
