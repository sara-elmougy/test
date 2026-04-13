interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
      {message && <p className="text-sm text-gray-500">{message}</p>}
    </div>
  );
}
