import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function Layout({ children, title, description }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="md:pl-72 pt-16 md:pt-0 min-h-screen transition-all duration-200">
        <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12">
          <header className="mb-8 md:mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="text-muted-foreground mt-2 text-lg">{description}</p>
            )}
          </header>
          <div className="animate-in fade-in duration-700 delay-150">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
