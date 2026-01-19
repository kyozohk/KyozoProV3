import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Upload, X, Palette } from 'lucide-react';
import { Card } from './ui/card';
import { CommunityInviteCustomizer } from './community-invite-customizer';

interface DisplaySettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // currentLogoUrl: string;
  // currentHeroUrl: string;
  // onLogoChange?: (url: string) => void;
  // onHeroChange?: (url: string) => void;
  openInviteCustomizer?: boolean;
}

export function DisplaySettingsModal({ 
  open, 
  onOpenChange, 
  // currentLogoUrl, 
  // currentHeroUrl,
  // onLogoChange,
  // onHeroChange,
  openInviteCustomizer = false
}: DisplaySettingsModalProps) {
  const [inviteCustomizerOpen, setInviteCustomizerOpen] = useState(false);
  // const [previewLogoUrl, setPreviewLogoUrl] = useState(currentLogoUrl);
  // const [previewHeroUrl, setPreviewHeroUrl] = useState(currentHeroUrl);

  // Auto-open invite customizer when requested
  useEffect(() => {
    if (open && openInviteCustomizer) {
      setInviteCustomizerOpen(true);
    }
  }, [open, openInviteCustomizer]);

  const handleSave = () => {
    // if (onLogoChange) onLogoChange(previewLogoUrl);
    // if (onHeroChange) onHeroChange(previewHeroUrl);
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Edit Display Settings</DialogTitle>
            <DialogDescription>
              Customize your community's visual appearance and branding
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Brand Logo Section */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center overflow-hidden">
                    {/* <img 
                      src={previewLogoUrl} 
                      alt="Brand Logo Preview" 
                      className="w-20 h-20 object-contain"
                    /> */}
                  </div>
                </div>
                <div className="flex-1">
                  <Label className="text-base font-semibold mb-2 block">
                    Brand Logo
                  </Label>
                  <p className="text-sm text-gray-600 mb-4">
                    This logo appears in the hero banner and throughout your community
                  </p>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="gap-2"
                      onClick={() => {
                        // Simulate file upload - in real app this would open file picker
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*';
                        input.onchange = (e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) {
                            // In real app, upload to server and get URL
                            const reader = new FileReader();
                            // reader.onload = (e) => {
                            //   setPreviewLogoUrl(e.target?.result as string);
                            // };
                            reader.readAsDataURL(file);
                          }
                        };
                        input.click();
                      }}
                    >
                      <Upload className="w-4 h-4" />
                      Upload New Logo
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-gray-700"
                      // onClick={() => setPreviewLogoUrl(currentLogoUrl)}
                    >
                      Reset to Default
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Recommended: Square image, minimum 200x200px, PNG or SVG format
                  </p>
                </div>
              </div>
            </Card>

            {/* Hero Image Section */}
            <Card className="p-6">
              <Label className="text-base font-semibold mb-2 block">
                Hero Banner Image
              </Label>
              <p className="text-sm text-gray-600 mb-4">
                This image appears as the background of your community header
              </p>
              
              {/* Hero Image Preview */}
              <div 
                className="relative w-full h-48 rounded-lg overflow-hidden mb-4"
                style={{
                  // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${previewHeroUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-center">
                    <p className="text-2xl font-bold mb-1">Preview</p>
                    <p className="text-sm opacity-80">Your hero image background</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                {/* <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => {
                    // Simulate file upload - in real app this would open file picker
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        // In real app, upload to server and get URL
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          setPreviewHeroUrl(e.target?.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    };
                    input.click();
                  }}
                >
                  <Upload className="w-4 h-4" />
                  Upload New Image
                </Button> */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setPreviewHeroUrl(currentHeroUrl)}
                >
                  Reset to Default
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Recommended: Wide landscape image, minimum 1920x400px, JPG or PNG format
              </p>
            </Card>

            {/* Community Invite Customization */}
            <Card className="p-6 cursor-pointer hover:shadow-md transition-shadow" onClick={() => setInviteCustomizerOpen(true)}>
              <div className="flex items-start gap-3">
                <Palette className="w-5 h-5 text-[#7BD3C4] mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold mb-1">Customise Your Community Invite</h3>
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">
                    Personalise your sign-on invite with custom colors and branding
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-[#E87461] hover:bg-[#D76451]"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Community Invite Customizer */}
      <CommunityInviteCustomizer 
        open={inviteCustomizerOpen} 
        onClose={() => setInviteCustomizerOpen(false)} 
      />
    </>
  );
}