
"use client";

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
import { SidebarTrigger } from '@/components/ui/sidebar'; 
import { Globe, LogOut, UserCircle, Lock, LogIn } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

interface AppHeaderProps {
  userRole?: string; // To display role or customize avatar
}

const AppHeader: FC<AppHeaderProps> = ({ userRole: initialUserRole }) => {
  const [language, setLanguage] = useState<'en' | 'km'>('en');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRoleForDisplay, setUserRoleForDisplay] = useState(initialUserRole);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user && !initialUserRole) {
        // Potentially fetch role from Firestore/custom claims if not passed as prop
        // For now, we can try to use a generic label or email part
        setUserRoleForDisplay(user.email?.split('@')[0] || 'User');
      } else if (!user) {
        setUserRoleForDisplay(undefined);
      }
    });
    return () => unsubscribe();
  }, [initialUserRole]);

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'en' ? 'km' : 'en'));
    // In a real app, this would trigger i18n language change
    toast({ title: language === 'en' ? "ភាសាបានប្តូរទៅជាខ្មែរ" : "Language switched to English" });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: "Logged Out", description: "You have been successfully logged out." });
      router.push('/login');
    } catch (error) {
      console.error("Logout error:", error);
      toast({ title: "Logout Failed", description: "Could not log out. Please try again.", variant: "destructive" });
    }
  };

  const getInitials = (roleOrEmail?: string) => {
    if (!roleOrEmail) return "U";
    if (roleOrEmail.includes('@')) { // it's an email
      return roleOrEmail.substring(0, 1).toUpperCase();
    }
    return roleOrEmail.substring(0, 1).toUpperCase(); // it's a role
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6 shadow-sm">
      <div className="md:hidden"> 
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
        {currentUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={`https://placehold.co/100x100.png?text=${getInitials(currentUser.email || userRoleForDisplay)}`} alt={currentUser.email || userRoleForDisplay || "User"} data-ai-hint="profile person" />
                  <AvatarFallback>{getInitials(currentUser.email || userRoleForDisplay)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                {currentUser.email || "My Account"}
                {userRoleForDisplay && !(currentUser.email) && <span className="text-xs text-muted-foreground">({userRoleForDisplay})</span>}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/patient/settings')}> {/* Generic settings link */}
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/patient/settings')}> {/* Generic settings link */}
                <Lock className="mr-2 h-4 w-4" />
                <span>Change Password</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="outline" onClick={() => router.push('/login')}>
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
