import { motion } from 'motion/react'
import { Save, Eye, Smartphone, Monitor, Palette, Type, Image as ImageIcon, Calendar, MapPin, Heart, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Navigation } from '@/components/theme/navigation'
import { NavigationTabs } from '@/components/theme/invitation-tabs'

export default function InvitationBuilder() {
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile')
  const [activeSection, setActiveSection] = useState<'template' | 'couple' | 'events' | 'gallery'>('template')

  const [formData, setFormData] = useState({
    template: 'elegant-rose',
    heroTitle: 'The Wedding of',
    coupleNames: 'Sarah & John',
    welcomeMessage: 'Together with our families, we joyfully invite you to celebrate our wedding.',
    ceremonyDate: '2024-06-15',
    ceremonyTime: '10:00',
    ceremonyLocation: 'Grand Ballroom Hotel',
    ceremonyAddress: 'Jl. Sudirman No. 123, Jakarta',
    receptionDate: '2024-06-15',
    receptionTime: '18:00',
    receptionLocation: 'Grand Ballroom Hotel',
    receptionAddress: 'Jl. Sudirman No. 123, Jakarta',
  })

  const sections = [
    { id: 'template', name: 'Template', icon: Palette },
    { id: 'couple', name: 'Couple Info', icon: Heart },
    { id: 'events', name: 'Events', icon: Calendar },
    { id: 'gallery', name: 'Gallery', icon: ImageIcon },
  ]

  const templates = [
    { id: 'elegant-rose', name: 'Elegant Rose', preview: 'bg-gradient-to-br from-pink-50 to-rose-100' },
    { id: 'tropical-paradise', name: 'Tropical Paradise', preview: 'bg-gradient-to-br from-teal-50 to-emerald-100' },
    { id: 'garden-romance', name: 'Garden Romance', preview: 'bg-gradient-to-br from-green-50 to-emerald-100' },
    { id: 'modern-minimalist', name: 'Modern Minimalist', preview: 'bg-gradient-to-br from-gray-50 to-slate-100' },
  ]

  return (
    <>
      <Navigation 
        title='Edit Invitation'
        subTitle='Edit your invitation details and preview changes in real-time'
        previousUrl='/my-invitations/list'
        RightSection={
          <Button
            variant="outline"
            size="sm"
            className="h-9 text-sm"
          >
            <Save size={16} className="mr-1.5" />
            Save Draft
          </Button>
        }
        BellowSection={<NavigationTabs />}
      />

      <div className='p-6'>
        <div className="flex h-[calc(100vh-11rem)] gap-6">
          {/* Left Panel - Editor */}
          <div className="w-[400px] flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden">
            {/* Section Tabs */}
            <div className="border-b border-gray-200 p-4">
              <div className="grid grid-cols-4 gap-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id as any)}
                      className={cn(
                        "flex flex-col items-center justify-center p-3 rounded-lg text-xs font-medium transition-all",
                        activeSection === section.id
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      <Icon size={18} className="mb-1" />
                      {section.name}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Editor Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Template Section */}
              {activeSection === 'template' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Choose Template</h3>
                    <p className="text-xs text-gray-500 mb-4">Select a design template for your invitation</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => setFormData({ ...formData, template: template.id })}
                        className={cn(
                          "relative p-3 rounded-lg border-2 transition-all",
                          formData.template === template.id
                            ? "border-emerald-600 bg-emerald-50"
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <div className={cn("h-24 rounded-md mb-2", template.preview)} />
                        <p className="text-xs font-medium text-gray-900">{template.name}</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Couple Info Section */}
              {activeSection === 'couple' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Couple Information</h3>
                    <p className="text-xs text-gray-500 mb-4">Customize the couple's names and welcome message</p>
                  </div>

                  <div>
                    <Label className="text-xs font-medium text-gray-600 mb-1.5">Hero Title</Label>
                    <Input
                      value={formData.heroTitle}
                      onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                      placeholder="The Wedding of"
                      className="text-sm h-9"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-medium text-gray-600 mb-1.5">Couple Names</Label>
                    <Input
                      value={formData.coupleNames}
                      onChange={(e) => setFormData({ ...formData, coupleNames: e.target.value })}
                      placeholder="Sarah & John"
                      className="text-sm h-9"
                    />
                  </div>

                  <div>
                    <Label className="text-xs font-medium text-gray-600 mb-1.5">Welcome Message</Label>
                    <Textarea
                      value={formData.welcomeMessage}
                      onChange={(e) => setFormData({ ...formData, welcomeMessage: e.target.value })}
                      placeholder="Enter your welcome message..."
                      className="text-sm min-h-24 resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {/* Events Section */}
              {activeSection === 'events' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Event Details</h3>
                    <p className="text-xs text-gray-500 mb-4">Update ceremony and reception information</p>
                  </div>

                  {/* Ceremony */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Ceremony</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs font-medium text-gray-600 mb-1.5">Date</Label>
                        <Input
                          type="date"
                          value={formData.ceremonyDate}
                          onChange={(e) => setFormData({ ...formData, ceremonyDate: e.target.value })}
                          className="text-sm h-9"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-600 mb-1.5">Time</Label>
                        <Input
                          type="time"
                          value={formData.ceremonyTime}
                          onChange={(e) => setFormData({ ...formData, ceremonyTime: e.target.value })}
                          className="text-sm h-9"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-600 mb-1.5">Location</Label>
                      <Input
                        value={formData.ceremonyLocation}
                        onChange={(e) => setFormData({ ...formData, ceremonyLocation: e.target.value })}
                        placeholder="Venue name"
                        className="text-sm h-9"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-600 mb-1.5">Address</Label>
                      <Input
                        value={formData.ceremonyAddress}
                        onChange={(e) => setFormData({ ...formData, ceremonyAddress: e.target.value })}
                        placeholder="Full address"
                        className="text-sm h-9"
                      />
                    </div>
                  </div>

                  {/* Reception */}
                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Reception</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs font-medium text-gray-600 mb-1.5">Date</Label>
                        <Input
                          type="date"
                          value={formData.receptionDate}
                          onChange={(e) => setFormData({ ...formData, receptionDate: e.target.value })}
                          className="text-sm h-9"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-medium text-gray-600 mb-1.5">Time</Label>
                        <Input
                          type="time"
                          value={formData.receptionTime}
                          onChange={(e) => setFormData({ ...formData, receptionTime: e.target.value })}
                          className="text-sm h-9"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-600 mb-1.5">Location</Label>
                      <Input
                        value={formData.receptionLocation}
                        onChange={(e) => setFormData({ ...formData, receptionLocation: e.target.value })}
                        placeholder="Venue name"
                        className="text-sm h-9"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-600 mb-1.5">Address</Label>
                      <Input
                        value={formData.receptionAddress}
                        onChange={(e) => setFormData({ ...formData, receptionAddress: e.target.value })}
                        placeholder="Full address"
                        className="text-sm h-9"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Gallery Section */}
              {activeSection === 'gallery' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-1">Photo Gallery</h3>
                    <p className="text-xs text-gray-500 mb-4">Upload and manage your wedding photos</p>
                  </div>

                  <button className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-400 transition-colors">
                    <ImageIcon size={32} className="mx-auto mb-2 text-gray-400" />
                    <p className="text-sm font-medium text-gray-600">Click to upload images</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </button>
                </motion.div>
              )}
            </div>

            {/* Save Button */}
            <div className="border-t border-gray-200 p-4">
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-9 text-sm">
                <Save size={16} className="mr-2" />
                Save Changes
              </Button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="flex-1 flex flex-col bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
            {/* Preview Controls */}
            <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye size={18} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-900">Live Preview</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    previewDevice === 'mobile'
                      ? "bg-emerald-50 text-emerald-600"
                      : "text-gray-500 hover:bg-gray-50"
                  )}
                >
                  <Smartphone size={18} />
                </button>
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    previewDevice === 'desktop'
                      ? "bg-emerald-50 text-emerald-600"
                      : "text-gray-500 hover:bg-gray-50"
                  )}
                >
                  <Monitor size={18} />
                </button>
              </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
              <motion.div
                key={previewDevice}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={cn(
                  "bg-white rounded-2xl shadow-2xl overflow-hidden",
                  previewDevice === 'mobile' ? "w-[375px] h-[667px]" : "w-full h-full max-w-6xl"
                )}
              >
                {/* Preview Content */}
                <div className="h-full overflow-y-auto">
                  {/* Hero Section */}
                  <div className={cn(
                    "relative flex flex-col items-center justify-center text-center p-8",
                    templates.find(t => t.id === formData.template)?.preview,
                    previewDevice === 'mobile' ? 'min-h-[400px]' : 'min-h-[500px]'
                  )}>
                    <p className="text-xs uppercase tracking-widest text-gray-600 mb-2">
                      {formData.heroTitle}
                    </p>
                    <h1 className={cn(
                      "font-bold text-gray-900 mb-4",
                      previewDevice === 'mobile' ? 'text-3xl' : 'text-5xl'
                    )}>
                      {formData.coupleNames}
                    </h1>
                    <p className={cn(
                      "text-gray-700 max-w-md",
                      previewDevice === 'mobile' ? 'text-sm' : 'text-base'
                    )}>
                      {formData.welcomeMessage}
                    </p>
                  </div>

                  {/* Events Section */}
                  <div className="p-8 space-y-6">
                    {/* Ceremony */}
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-3">
                        <Calendar size={20} className="text-emerald-600" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">Ceremony</h3>
                      <p className="text-sm text-gray-600 mb-1">
                        {new Date(formData.ceremonyDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-sm text-gray-600 mb-3">{formData.ceremonyTime}</p>
                      <div className="flex items-center justify-center gap-1 text-sm text-gray-700">
                        <MapPin size={14} />
                        <span>{formData.ceremonyLocation}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{formData.ceremonyAddress}</p>
                    </div>

                    {/* Reception */}
                    <div className="text-center pt-6 border-t border-gray-200">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-3">
                        <Heart size={20} className="text-emerald-600" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">Reception</h3>
                      <p className="text-sm text-gray-600 mb-1">
                        {new Date(formData.receptionDate).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-sm text-gray-600 mb-3">{formData.receptionTime}</p>
                      <div className="flex items-center justify-center gap-1 text-sm text-gray-700">
                        <MapPin size={14} />
                        <span>{formData.receptionLocation}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{formData.receptionAddress}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
