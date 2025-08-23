import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export default function OverviewPage() {
  const { toggleSidebar } = useSidebar();
  return (
    <div>
      Overview Page <Button onClick={toggleSidebar}>Hey dude</Button>
    </div>
  );
}
