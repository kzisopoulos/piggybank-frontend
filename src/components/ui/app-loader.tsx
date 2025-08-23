import { LoaderCircle } from "lucide-react";

export default function AppLoader() {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <LoaderCircle className="size-10 animate-spin text-primary" />
    </div>
  );
}
