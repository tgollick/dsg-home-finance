import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export const LoadingFallback = () => {
  return (
    <Card className="w-full p-6">
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded-md animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 rounded-md animate-pulse w-1/2" />
        <div className="h-4 bg-gray-200 rounded-md animate-pulse w-2/3" />
      </div>
    </Card>
  );
};

export const ErrorFallback = ({ error }: { error: Error }) => {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error.message || "Something went wrong. Please try again later."}
      </AlertDescription>
    </Alert>
  );
};
