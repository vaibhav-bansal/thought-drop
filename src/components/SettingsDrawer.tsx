
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Moon, Sun, Download, Trash2 } from 'lucide-react';

interface SettingsDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  isOpen,
  onOpenChange,
  darkMode,
  onDarkModeToggle
}) => {
  const handleExportCSV = () => {
    // TODO: Implement CSV export functionality
    console.log('Export CSV clicked');
  };

  const handleClearDrafts = () => {
    // TODO: Implement clear drafts functionality
    console.log('Clear drafts clicked');
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="bg-warm-beige dark:bg-gray-900 border-warm-text/10">
        <SheetHeader>
          <SheetTitle className="text-warm-text dark:text-warm-text">Settings</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {darkMode ? (
                <Moon className="w-5 h-5 text-warm-text dark:text-warm-text" />
              ) : (
                <Sun className="w-5 h-5 text-warm-text dark:text-warm-text" />
              )}
              <Label htmlFor="dark-mode" className="text-warm-text dark:text-warm-text">
                Dark Mode
              </Label>
            </div>
            <Switch
              id="dark-mode"
              checked={darkMode}
              onCheckedChange={onDarkModeToggle}
            />
          </div>

          {/* Export CSV */}
          <Button
            variant="outline"
            className="w-full justify-start text-warm-text border-warm-text/20 hover:bg-white/20 dark:hover:bg-white/10"
            onClick={handleExportCSV}
          >
            <Download className="w-4 h-4 mr-2" />
            Export entries as CSV
          </Button>

          {/* Clear Drafts */}
          <Button
            variant="outline"
            className="w-full justify-start text-warm-text border-warm-text/20 hover:bg-white/20 dark:hover:bg-white/10"
            onClick={handleClearDrafts}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear local drafts
          </Button>

          {/* App Info */}
          <div className="pt-6 border-t border-warm-text/10">
            <p className="text-xs text-warm-text/60 dark:text-warm-text/60 text-center">
              Thought Drop v1.0
              <br />
              Made with ♥ for staying connected
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SettingsDrawer;
