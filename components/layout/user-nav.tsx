'use client';

import { useTranslations } from 'next-intl';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useGlobalStore from '@/hooks/use-global';
import { Logout } from '@/lib';

export function UserNav() {
  const t = useTranslations('auth');

  const { user } = useGlobalStore();

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size='icon' variant='default'>
            <Avatar className='size-8'>
              <AvatarImage alt={user?.avatar ?? ''} src={user?.avatar ?? ''} />
              <AvatarFallback className='rounded-none bg-transparent'>
                {user?.email?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent forceMount align='end' className='w-56'>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-sm font-medium leading-none'>{user?.email}</p>
              {/* <p className='text-xs leading-none text-muted-foreground'>ID: {user?.id}</p> */}
            </div>
          </DropdownMenuLabel>
          {/* <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={Logout}>
            {t('logout')}
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
