
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
import { auth, db } from '@/lib/firebase'; // Added db
import { signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { doc, getDoc } from "firebase/firestore"; // Added doc, getDoc
import { useToast } from '@/hooks/use-toast';

interface AppHeaderProps {
  userRole?: string; // This prop comes from the layout (e.g., AdminLayout)
}

interface UserProfile {
  fullName?: string;
  email?: string | null;
  role?: string;
}

const AppHeader: FC<AppHeaderProps> = ({ userRole: layoutDefinedRole }) => {
  const [language, setLanguage] = useState<'en' | 'km'>('en');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch user data from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setUserProfile({
            fullName: data.fullName,
            email: user.email,
            role: data.role,
          });
        } else {
          // User exists in Auth but not Firestore (should not happen with current setup)
          setUserProfile({ email: user.email, role: layoutDefinedRole || "User" }); 
        }
      } else {
        setUserProfile(null);
      }
    });
    return () => unsubscribe();
  }, [layoutDefinedRole]);

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'en' ? 'km' : 'en'));
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

  const getInitials = (profile?: UserProfile | null) => {
    if (!profile) return "U";
    if (profile.fullName) {
      return profile.fullName.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
    }
    if (profile.email) {
      return profile.email.substring(0, 1).toUpperCase();
    }
    if (profile.role) {
      return profile.role.substring(0, 1).toUpperCase();
    }
    return "U";
  }
  
  const displayName = userProfile?.fullName || userProfile?.email || "My Account";
  const displayRole = userProfile?.role;

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
                  <AvatarImage src={`https://placehold.co/100x100.png?text=${getInitials(userProfile)}`} alt={displayName} data-ai-hint="profile person" />
                  <AvatarFallback>{getInitials(userProfile)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                {displayName}
                {displayRole && <span className="block text-xs text-muted-foreground font-normal">({displayRole})</span>}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push(`/${(displayRole || 'patient').toLowerCase()}/settings`)}>
                <UserCircle className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push(`/${(displayRole || 'patient').toLowerCase()}/settings`)}>
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
