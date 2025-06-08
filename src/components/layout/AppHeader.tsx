"use client";

import type { FC } from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar'; // Assuming this exists from ShadCN sidebar
import { Globe, LogOut, UserCircle, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppHeaderProps {
  userRole?: string; // To display role or customize avatar
}

const AppHeader: FC<AppHeaderProps> = ({ userRole }) => {
  const [language, setLanguage] = useState<'en' | 'km'>('en');

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'en' ? 'km' : 'en'));
    // In a real app, this would trigger i18n language change
  };

  const getInitials = (role?: string) => {
    if (!role) return "U";
    return role.substring(0, 1).toUpperCase();
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6 shadow-sm">
      <div className="md:hidden"> {/* Show trigger only on mobile, as per typical ShadCN sidebar usage */}
        <SidebarTrigger />
      </div>
      <div className="flex-1">
        {/* Optional: Breadcrumbs or page title can go here */}
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={toggleLanguage} aria-label="Toggle language">
          <Globe className="h-5 w-5" />
          <span className="ml-2 text-sm font-medium">
            {language === 'en' ? '🇰🇭 KH' : '🇺🇸 EN'}
          </span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://placehold.co/100x100.png" alt={userRole || "User"} data-ai-hint="profile person" />
                <AvatarFallback>{getInitials(userRole)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account {userRole && <span className="text-xs text-muted-foreground">({userRole})</span>}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Lock className="mr-2 h-4 w-4" />
              <span>Change Password</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => window.location.href = '/login'}> {/* Simple logout */}
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AppHeader;
