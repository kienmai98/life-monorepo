import * as SheetPrimitive from '@radix-ui/react-dialog';

export const Sheet = SheetPrimitive.Root;
export const SheetTrigger = SheetPrimitive.Trigger;
export const SheetClose = SheetPrimitive.Close;
export const SheetPortal = SheetPrimitive.Portal;

export {
  Dialog as SheetOverlay,
  DialogContent as SheetContent,
} from '@/components/ui/dialog';
