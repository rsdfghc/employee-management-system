interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

function ErrorMessage({
  message,
  onRetry,
}: ErrorMessageProps) {
  return (
    <div>
      <p>{message}</p>

      {onRetry && (
        <button onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;