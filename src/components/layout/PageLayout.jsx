import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ThemeToggle";

export function PageLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-10 bg-background border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Left side: Sidebar Toggle */}
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Sidebar</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-white dark:bg-gray-950">
              <SheetHeader>
                <SheetTitle className="dark:text-white">Sidebar</SheetTitle>
                <SheetDescription className="dark:text-gray-400">
                  This is the sidebar content. You can add navigation links or
                  other elements here.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          {/* Center: Service Name */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-xl font-bold">성균홀덤대회</h1>
          </div>

          {/* Right side: Profile & Theme Toggle */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a href="/my-page" aria-label="My Page">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </a>
          </div>
        </div>
      </header>
      <main className="pt-16">{children}</main>
    </div>
  );
}