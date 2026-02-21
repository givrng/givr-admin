export const PageLoader: React.FC<{ message?: string, color?:`blue`|`green` }> = ({ message, color="blue" }) => (
  <div className="fixed inset-0 flex flex-col items-center justify-center gap-4">
    <div className="relative w-16 h-16">
      <div className={`absolute inset-0 rounded-full border-4 border-${color}-500/30`}></div>
      <div className={`absolute inset-0 rounded-full border-4 border-${color}-500 border-t-transparent animate-spin`}></div>
    </div>

    {message && (
      <p className="text-sm text-gray-600 animate-pulse">
        {message}
      </p>
    )}
  </div>
);