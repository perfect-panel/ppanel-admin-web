'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export function DeleteButton({
  trigger,
  title,
  description,
  onConfirm,
  onCancelText,
  onConfirmText,
}: {
  trigger: string;
  title: string;
  description: string;
  onConfirm: () => void | Promise<void>;
  onCancelText: string;
  onConfirmText: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size='sm' variant='destructive'>
          {trigger}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{onCancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{onConfirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
