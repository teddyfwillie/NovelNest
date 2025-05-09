import Link from 'next/link'
import { BookText, 
    ImageIcon, 
    LayoutDashboard, 
    PenSquare, 
    FileText, 
    NotebookPen, 
    BookOpen,
    Settings, 
    LogOut,
    Menu,
    Bell} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const navItems = [
    { href: '/', label: 'Book Writing Tools', icon: LayoutDashboard },
    { href: '/dashboard/book-cover', label: 'Book Cover Image Generator', icon: ImageIcon },
    { href: '/dashboard/book-title', label: 'Book Title Generator', icon: PenSquare },
    { href: '/dashboard/book-outline', label: 'Book Outline Generator', icon: BookText },
    { href: '/dashboard/book-chapter', label: 'Book Chapter Generator', icon: FileText },
    { href: '/dashboard/chapter-content', label: 'Book Chapter Content Generator', icon: NotebookPen },
    { href: '/dashboard/image-generator', label: 'Image Generator', icon: Settings },
  ];

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const Sidebar = () => (
    <div className="h-full flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold">Novel Nest</h1>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg",
                "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          )
        })}
      </nav>
      <div className="p-3">
        <Button 
          variant="ghost" 
          className="w-full justify-start px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar for medium and larger screens */}
        <aside className="hidden md:block w-64 bg-card border-r border-border overflow-y-auto">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="h-16 bg-background border-b border-border flex items-center justify-between px-4 md:px-6">
            <div className="flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                  <Sidebar />
                </SheetContent>
              </Sheet>
              <div className="ml-4 md:ml-0 w-full max-w-sm">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>TC</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

