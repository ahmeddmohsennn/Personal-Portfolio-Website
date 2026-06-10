import { Shield, Brain, Laptop, Mail, Award } from "lucide-react";

interface NavigationProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function Navigation({ currentTab, setCurrentTab }: NavigationProps) {
  const navItems = [
    { id: "home", label: "Overview", icon: Award },
    { id: "projects", label: "Lab / Engineering", icon: Laptop },
    { id: "sandbox", label: "AI Sandbox", icon: Brain },
    { id: "contact", label: "Consult / Bio", icon: Mail },
  ];

  return (
    <header id="app-header" className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand Brand */}
          <div 
            id="brand-logo" 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setCurrentTab("home")}
          >
            <div className="w-10 h-10 bg-slate-900 flex items-center justify-center text-white font-bold text-xl rounded-none shadow-xs">
              H
            </div>
            <div>
              <span className="font-serif italic font-bold text-slate-900 tracking-tight text-base sm:text-lg">
                Dr. Jack Harris <span className="text-sky-500 font-sans font-medium">/</span>
              </span>
              <p className="text-[10px] text-slate-500 font-mono tracking-[0.15em] uppercase font-semibold">
                MD & Full-Stack Developer
              </p>
            </div>
          </div>

          {/* Nav Items - Artistic Styling */}
          <nav id="desktop-navigation" className="hidden md:flex space-x-6">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => setCurrentTab(item.id)}
                  className={`text-xs font-bold uppercase tracking-widest pb-1 transition-all duration-150 border-b-2 ${
                    isActive
                      ? "border-slate-900 text-slate-900"
                      : "border-transparent text-slate-400 hover:text-slate-800"
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action button */}
          <div className="hidden lg:flex items-center">
            <button
              id="cta-nav-consult"
              onClick={() => setCurrentTab("contact")}
              className="bg-slate-900 text-white text-xs font-semibold px-6 py-3 tracking-widest uppercase hover:bg-sky-500 transition-colors cursor-pointer"
            >
              Consultation
            </button>
          </div>

          {/* Quick Tab Select for Mobile */}
          <div className="md:hidden flex space-x-1 bg-slate-50 p-1 rounded-sm border border-slate-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-btn-${item.id}`}
                  onClick={() => setCurrentTab(item.id)}
                  className={`p-2 rounded-sm transition-all ${
                    isActive
                      ? "bg-white text-sky-500 shadow-xs"
                      : "text-slate-400 hover:text-slate-900"
                  }`}
                  title={item.label}
                >
                  <Icon className="w-4 h-4" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}

