// src/components/RuleDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface RuleDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function RuleDialog({ open, onClose }: RuleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Game Rules</DialogTitle>
          <DialogDescription>
            Learn how to play SkyFly Crash before you start betting.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 text-sm text-gray-700">
          <p>
            1️⃣ Place your bet before the round starts.  
          </p>
          <p>
            2️⃣ The plane (multiplier) will take off and rise randomly.  
          </p>
          <p>
            3️⃣ Cash out before the plane flies away to secure your winnings.  
          </p>
          <p>
            4️⃣ If you don’t cash out in time, your bet is lost.  
          </p>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={onClose} className="rounded-xl px-6">
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
