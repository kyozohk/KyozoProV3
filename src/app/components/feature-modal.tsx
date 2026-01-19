import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { FileText, Image, Headphones, Video } from 'lucide-react';
// import logoImage from 'figma:asset/da66afec8308d820a80087d80cf52148e60777e5.png';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface FeatureModalProps {
  open: boolean;
  onClose: () => void;
}

export function FeatureModal({ open, onClose }: FeatureModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            {/* <img src={logoImage} alt="Kyozo" className="h-8 w-auto" /> */}
            <div className="w-full h-auto">
              <h1 className="text-2xl font-bold">Kyozo</h1>
            </div>
          </div>
          <DialogTitle className="text-2xl">Create New Post</DialogTitle>
          <DialogDescription>
            Share content with your community members
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Post Type Selection */}
          <div>
            <Label>Post Type</Label>
            <div className="grid grid-cols-4 gap-3 mt-2">
              <button className="p-4 border-2 border-purple-600 rounded-lg hover:bg-purple-50 transition-colors">
                <FileText className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium">Text</p>
              </button>
              <button className="p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Image className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600">Image</p>
              </button>
              <button className="p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Headphones className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600">Audio</p>
              </button>
              <button className="p-4 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <Video className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600">Video</p>
              </button>
            </div>
          </div>

          {/* Post Details */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="post-title">Title</Label>
              <Input
                id="post-title"
                placeholder="Enter post title..."
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="post-content">Content</Label>
              <Textarea
                id="post-content"
                placeholder="Write your post content..."
                className="mt-1.5 min-h-32"
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="discussion">Discussion</SelectItem>
                  <SelectItem value="resource">Resource</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Label htmlFor="reading-time">Reading Time (mins)</Label>
                <Input
                  id="reading-time"
                  type="number"
                  placeholder="5"
                  className="mt-1.5"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="visibility">Visibility</Label>
                <Select defaultValue="all">
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Members</SelectItem>
                    <SelectItem value="premium">Premium Only</SelectItem>
                    <SelectItem value="admins">Admins Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline">
            Save as Draft
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={onClose}>
            Publish Post
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}