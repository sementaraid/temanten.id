import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Calendar, MapPin, Palette, Edit, Share2, Users, UserCheck, BarChart3, Heart, Copy, Download } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import Marta from "@/releases/marta-sunar";

export default function MyInvitation() {
  const [selectedInvitation, setSelectedInvitation] = useState(1)

  const invitations = [
    {
      id: 1,
      coupleName: 'Sarah & John',
      date: 'June 15, 2024',
      location: 'Grand Ballroom, Jakarta',
      status: 'Published',
      guests: 150,
      confirmed: 98,
      views: 1234,
      template: 'Elegant Rose',
      url: 'temanten.id/sarah-john'
    },
    {
      id: 2,
      coupleName: 'Amanda & Michael',
      date: 'August 22, 2024',
      location: 'Beach Resort, Bali',
      status: 'Draft',
      guests: 200,
      confirmed: 0,
      views: 45,
      template: 'Tropical Paradise',
      url: 'temanten.id/amanda-michael'
    },
    {
      id: 3,
      coupleName: 'Lisa & David',
      date: 'September 10, 2024',
      location: 'Garden Venue, Bandung',
      status: 'Published',
      guests: 120,
      confirmed: 67,
      views: 890,
      template: 'Garden Romance',
      url: 'temanten.id/lisa-david'
    },
  ]

  const selected = invitations.find(inv => inv.id === selectedInvitation)
  
  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                My Invitations
              </h2>
              <p className="text-sm text-gray-500">
                {invitations.length} active invitations
              </p>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg h-9 px-4">
              <Plus size={16} className="mr-1.5" />
              Create New
            </Button>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left: Invitations List */}
          <div className="lg:col-span-2 space-y-3">
            {invitations.map((invitation, i) => (
              <motion.div
                key={invitation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                onClick={() => setSelectedInvitation(invitation.id)}
                className={cn(
                  "bg-white rounded-xl overflow-hidden cursor-pointer transition-all",
                  selectedInvitation === invitation.id 
                    ? "ring-2 ring-emerald-600 shadow-lg" 
                    : "hover:shadow-md"
                )}
              >
                {/* Card Header */}
                <div className={cn(
                  "px-5 py-4 border-b transition-colors",
                  selectedInvitation === invitation.id 
                    ? "bg-emerald-50 border-emerald-100" 
                    : "bg-gray-50 border-gray-100"
                )}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-1.5">{invitation.coupleName}</h3>
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                        invitation.status === 'Published' 
                          ? "bg-emerald-600 text-white" 
                          : "bg-gray-600 text-white"
                      )}>
                        {invitation.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="px-5 py-4">
                  <div className="space-y-2.5 mb-4">
                    <div className="flex items-center gap-2.5 text-xs text-gray-600">
                      <Calendar size={14} className="text-emerald-600 flex-shrink-0" />
                      <span>{invitation.date}</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-gray-600">
                      <MapPin size={14} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-2">{invitation.location}</span>
                    </div>
                  </div>

                  {/* URL */}
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Invitation Link</p>
                    <p className="text-xs text-emerald-600 font-medium truncate">{invitation.url}</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Guests</p>
                      <p className="text-lg font-bold text-gray-900">{invitation.guests}</p>
                    </div>
                    <div className="text-center p-3 bg-emerald-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Confirmed</p>
                      <p className="text-lg font-bold text-emerald-600">{invitation.confirmed}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Views</p>
                      <p className="text-lg font-bold text-gray-900">{invitation.views}</p>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="mb-4 flex items-center gap-2 text-xs text-gray-500">
                    <Palette size={14} className="text-gray-400" />
                    <span>Template: <span className="text-gray-700 font-medium">{invitation.template}</span></span>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg h-9 gap-1.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Edit size={14} />
                      Edit Invitation
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-300 hover:bg-gray-50 text-gray-700 text-xs font-medium rounded-lg h-9 gap-1.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Share2 size={14} />
                      Share Link
                    </Button>
                  </div>

                  {/* Secondary Actions */}
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <Button
                      variant="ghost"
                      className="text-xs text-gray-600 hover:bg-gray-50 h-8 gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Users size={13} />
                      Guests
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-xs text-gray-600 hover:bg-gray-50 h-8 gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <UserCheck size={13} />
                      RSVPs
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-xs text-gray-600 hover:bg-gray-50 h-8 gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <BarChart3 size={13} />
                      Stats
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-xl p-8 sticky top-8">
              <div className="mb-6">
                <h3 className="text-base font-bold text-gray-900 mb-0.5">Preview</h3>
                <p className="text-sm text-gray-500">How your guests will see it</p>
              </div>

              {/* Mobile Preview */}
              <div className="bg-gray-50 rounded-xl p-8 mb-6">
                <div className="max-w-sm mx-auto bg-white rounded-lg shadow-xl h-[768px]">
                  <iframe src="/marta-sunar" className="w-full h-full"/>
                </div>
              </div>

              {/* Share Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={`https://${selected?.url}`}
                    readOnly
                    className="flex-1 px-3 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-lg text-gray-600 outline-none"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10"
                  >
                    <Copy size={16} />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg gap-2 h-10"
                  >
                    <Share2 size={16} />
                    Share Link
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex-1 gap-2 text-sm h-10"
                  >
                    <Download size={16} />
                    Download QR
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
