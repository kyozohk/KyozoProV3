import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import logoImage from 'figma:asset/da66afec8308d820a80087d80cf52148e60777e5.png';

interface CommunityInviteCustomizerProps {
  open: boolean;
  onClose: () => void;
}

export function CommunityInviteCustomizer({ open, onClose }: CommunityInviteCustomizerProps) {
  const [selectedColor, setSelectedColor] = useState('#E87987');
  const [gradientStart, setGradientStart] = useState('#6B8A4E');
  const [gradientEnd, setGradientEnd] = useState('#D4C89F');

  const presetColors = [
    '#E87987',
    '#B687E3',
    '#7DA2EC',
    '#D4C89F',
    '#80C9BD',
    '#8B8D8F',
    '#2F363C',
  ];

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 bg-white overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-2 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl text-[#2F363C]">Colour Palette</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-8">
            {/* Left Side - Color Preview */}
            <div>
              <h3 className="text-sm font-medium text-[#2F363C] mb-4">COLOR PREVIEW</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Preview Phone 1 */}
                <div 
                  className="rounded-3xl shadow-lg overflow-hidden relative h-[420px]"
                  style={{ 
                    background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)` 
                  }}
                >
                  {/* Phone UI Top Bar */}
                  <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
                    <span className="text-white text-xs font-semibold">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-3 bg-white/30 rounded-sm" />
                      <div className="w-4 h-3 bg-white/30 rounded-sm" />
                      <div className="w-4 h-3 bg-white/30 rounded-sm" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                    {/* Decorative shapes */}
                    <div className="absolute top-16 left-8 w-24 h-24 rounded-full opacity-30" style={{ backgroundColor: selectedColor }} />
                    <div className="absolute bottom-32 right-8 w-20 h-20 rounded-lg opacity-30" style={{ backgroundColor: selectedColor }} />
                    
                    <h1 className="text-white text-3xl font-bold mb-8 text-center z-10">MORABITO</h1>
                    
                    <div className="w-full space-y-3 z-10">
                      <button 
                        className="w-full py-3 rounded-full text-[#2F363C] font-semibold"
                        style={{ backgroundColor: selectedColor }}
                      >
                        Sign up
                      </button>
                      <button className="w-full py-3 rounded-full bg-white text-[#2F363C] font-semibold">
                        Log in
                      </button>
                    </div>
                    
                    <p className="text-white text-xs mt-4 z-10">Powered by Kyozo</p>
                  </div>
                </div>

                {/* Preview Phone 2 */}
                <div 
                  className="rounded-3xl shadow-lg overflow-hidden relative h-[420px]"
                  style={{ 
                    background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)` 
                  }}
                >
                  {/* Phone UI Top Bar */}
                  <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
                    <span className="text-white text-xs font-semibold">9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-3 bg-white/30 rounded-sm" />
                      <div className="w-4 h-3 bg-white/30 rounded-sm" />
                      <div className="w-4 h-3 bg-white/30 rounded-sm" />
                    </div>
                  </div>

                  {/* Content - Form View */}
                  <div className="absolute inset-0 flex flex-col p-6 pt-16">
                    {/* Decorative shapes */}
                    <div className="absolute top-24 right-6 w-16 h-16 rounded-full opacity-30" style={{ backgroundColor: selectedColor }} />
                    <div className="absolute bottom-40 left-6 w-20 h-20 opacity-30" style={{ backgroundColor: selectedColor }}>
                      <div className="w-full h-full rounded-lg" style={{ backgroundColor: selectedColor }} />
                    </div>
                    
                    <h2 className="text-white text-xl font-semibold mb-1 z-10">Tell us your name</h2>
                    <p className="text-white/80 text-sm mb-6 z-10">Full name</p>
                    
                    <div className="space-y-4 z-10">
                      <input
                        type="text"
                        placeholder="Fullname"
                        className="w-full px-4 py-3 rounded-xl bg-white/90 text-[#2F363C] placeholder:text-gray-500"
                      />
                      <input
                        type="text"
                        placeholder="Username"
                        className="w-full px-4 py-3 rounded-xl text-white placeholder:text-white/60"
                        style={{ backgroundColor: selectedColor }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Theme Colors */}
            <div>
              <h3 className="text-sm font-medium text-[#2F363C] mb-2">THEME COLORS</h3>
              <p className="text-xs text-gray-500 mb-4">Update the shape colors by selecting them below</p>
              
              {/* Color Swatches */}
              <div className="flex gap-2 mb-6">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-lg transition-all ${
                      selectedColor === color ? 'ring-2 ring-offset-2 ring-[#2F363C] scale-110' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {/* Gradient Picker */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <div 
                  className="w-full h-32 rounded-xl mb-4 relative"
                  style={{ 
                    background: `linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%)` 
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full shadow-md" />
                  </div>
                </div>

                {/* Color Spectrum Bar */}
                <div className="relative h-10 rounded-lg overflow-hidden mb-4">
                  <div className="absolute inset-0 flex">
                    <div className="flex-1" style={{ background: 'linear-gradient(to right, #F00000, #FF005E, #EA00FA, #9A00FF, #3100FF, #007CFF, #00DBFF, #00FFB5, #00FF68, #2AFF00, #F0F600, #FFC300, #FF8100)' }} />
                  </div>
                  <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-white shadow-md" />
                </div>

                {/* Hex Input */}
                <div className="relative">
                  <input
                    type="text"
                    value={gradientStart.toUpperCase()}
                    onChange={(e) => setGradientStart(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg text-center font-mono text-sm"
                    placeholder="#RAINBOW"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>

                <div className="text-center text-xs text-gray-400 mt-2">
                  Hex
                </div>
              </div>

              {/* Save Button */}
              <Button 
                className="w-full bg-[#7BD3C4] hover:bg-[#6BC3B4] text-[#2F363C] font-semibold rounded-full py-6"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}