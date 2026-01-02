import { Helmet } from 'react-helmet-async'
import { Navigation } from "@/components/theme/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Calendar, MapPin, Palette, Edit, Share2, Users, UserCheck, MoreVertical, Eye } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";

export default function MyInvitation() {
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

  // Calculate totals
  const totalGuests = invitations.reduce((sum, inv) => sum + inv.guests, 0)
  const totalConfirmed = invitations.reduce((sum, inv) => sum + inv.confirmed, 0)
  const totalViews = invitations.reduce((sum, inv) => sum + inv.views, 0)

  return (
    <>
      {/* Helmet Meta Tags */}
      <Helmet>
        <title>My Invitations - Manage Your Wedding Invites</title>
        <meta 
          name="description" 
          content={`Manage your wedding invitations. ${invitations.length} invitations created, ${totalConfirmed} confirmed guests, ${totalViews} total views.`}
        />
        <meta property="og:title" content="My Invitations - Manage Your Wedding Invites" />
        <meta 
          property="og:description" 
          content="Create, manage, and track your wedding invitation responses with our invitation management system."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="My Invitations - Manage Your Wedding Invites" />
        <meta 
          name="twitter:description" 
          content="Create and manage wedding invitations with ease."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Navigation
        previousUrl="/my-invitations"
        title="My Invitations"
        subTitle="Manage your invitations"
        RightSection={
          <Link
            to="/my-invitations/create" className={buttonVariants({
              variant: "emerald"
            })}>
            <Plus size={16} className="mr-1.5" />
            Create New
          </Link>
        }
      />
      
      {/* Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 gap-6">
          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left px-4 py-3 text-xs font-medium text-gray-600">Couple</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-gray-600">Date & Location</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-gray-600">Status</th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-gray-600">Stats</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invitations.map((invitation, i) => (
                      <motion.tr
                        key={invitation.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                        className="border-b border-gray-100 transition-colors hover:bg-gray-50"
                      >
                        {/* Couple */}
                        <td className="px-4 py-4">
                          <div>
                            <p className="text-sm font-bold text-gray-900 mb-0.5">{invitation.coupleName}</p>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <Palette size={12} className="text-gray-400" />
                              <span>{invitation.template}</span>
                            </div>
                          </div>
                        </td>

                        {/* Date & Location */}
                        <td className="px-4 py-4">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                              <Calendar size={12} className="text-emerald-600" />
                              <span>{invitation.date}</span>
                            </div>
                            <div className="flex items-start gap-1.5 text-xs text-gray-600">
                              <MapPin size={12} className="mt-0.5 text-emerald-600 flex-shrink-0" />
                              <span className="line-clamp-1">{invitation.location}</span>
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          <span className={cn(
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                            invitation.status === 'Published'
                              ? "bg-emerald-600 text-white"
                              : "bg-gray-600 text-white"
                          )}>
                            {invitation.status}
                          </span>
                        </td>

                        {/* Stats */}
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-3">
                            <div className="text-center">
                              <p className="text-xs text-gray-500">Guests</p>
                              <p className="text-sm font-bold text-gray-900">{invitation.guests}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-500">RSVP</p>
                              <p className="text-sm font-bold text-emerald-600">{invitation.confirmed}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-500">Views</p>
                              <p className="text-sm font-bold text-gray-900">{invitation.views}</p>
                            </div>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-white"
                            >
                              <Edit size={14} className="text-gray-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-white"
                            >
                              <Share2 size={14} className="text-gray-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-white"
                            >
                              <MoreVertical size={14} className="text-gray-600" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary Footer */}
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Showing {invitations.length} invitations</span>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Users size={12} className="text-emerald-600" />
                      <span className="text-gray-600">Total Guests: <span className="font-bold text-gray-900">{totalGuests}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserCheck size={12} className="text-emerald-600" />
                      <span className="text-gray-600">Total Confirmed: <span className="font-bold text-emerald-600">{totalConfirmed}</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye size={12} className="text-emerald-600" />
                      <span className="text-gray-600">Total Views: <span className="font-bold text-gray-900">{totalViews}</span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}