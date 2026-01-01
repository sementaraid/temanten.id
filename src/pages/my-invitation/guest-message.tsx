import { motion } from 'motion/react'
import { Download, Search, Trash2, Clock, Heart, MessageCircle, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Navigation } from '@/components/theme/navigation'
import { NavigationTabs } from '@/components/theme/invitation-tabs'

interface GuestMessage {
  id: string
  guestName: string
  message: string
  type: 'wish' | 'celebration'
  isFeatured: boolean
  createdAt: string
}

export default function InvitationGuestMessage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'wish' | 'celebration'>('all')
  const [selectedMessages, setSelectedMessages] = useState<string[]>([])

  const [messages, setMessages] = useState<GuestMessage[]>([
    {
      id: '1',
      guestName: 'Alice Johnson',
      message: 'Wishing you both a lifetime of love and happiness! May your journey together be filled with beautiful moments. Congratulations! 🎉',
      type: 'wish',
      isFeatured: true,
      createdAt: '2024-01-15T10:30:00'
    },
    {
      id: '2',
      guestName: 'Bob Smith',
      message: 'So happy to celebrate this special day with you! What a beautiful couple you make. May God bless your marriage abundantly! ❤️',
      type: 'celebration',
      isFeatured: false,
      createdAt: '2024-01-16T14:20:00'
    },
    {
      id: '3',
      guestName: 'Carol White',
      message: 'Congratulations on your wedding day! Wishing you endless love, laughter, and happily ever after.',
      type: 'wish',
      isFeatured: false,
      createdAt: '2024-01-17T09:15:00'
    },
    {
      id: '4',
      guestName: 'David Brown',
      message: 'May your love story be as magical as a fairy tale and your bond grow stronger with each passing year. Congratulations! 💍',
      type: 'wish',
      isFeatured: true,
      createdAt: '2024-01-18T16:45:00'
    },
    {
      id: '5',
      guestName: 'Emma Wilson',
      message: 'What an amazing celebration! You both looked absolutely stunning. Wishing you all the happiness in the world! 🥂',
      type: 'celebration',
      isFeatured: false,
      createdAt: '2024-01-19T11:30:00'
    },
  ])

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === 'all' || message.type === filterType
    return matchesSearch && matchesFilter
  })

  const toggleSelectMessage = (id: string) => {
    setSelectedMessages(prev =>
      prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedMessages.length === filteredMessages.length) {
      setSelectedMessages([])
    } else {
      setSelectedMessages(filteredMessages.map(m => m.id))
    }
  }

  const handleBulkDelete = () => {
    setMessages(messages.filter(m => !selectedMessages.includes(m.id)))
    setSelectedMessages([])
  }

  const toggleFeatured = (id: string) => {
    setMessages(messages.map(m =>
      m.id === id ? { ...m, isFeatured: !m.isFeatured } : m
    ))
  }

  const handleDeleteMessage = (id: string) => {
    setMessages(messages.filter(m => m.id !== id))
  }

  const stats = {
    total: messages.length,
    wishes: messages.filter(m => m.type === 'wish').length,
    celebrations: messages.filter(m => m.type === 'celebration').length,
    featured: messages.filter(m => m.isFeatured).length,
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <>
      <Navigation
        previousUrl='/my-invitations/list'
        title='Guests Messages'
        subTitle='Manage your guest list'
        BellowSection={<NavigationTabs />}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-gray-500">Total Messages</p>
                <MessageCircle size={16} className="text-gray-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-pink-50 border border-pink-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-pink-700">Wishes</p>
                <Heart size={16} className="text-pink-400" />
              </div>
              <p className="text-2xl font-bold text-pink-700">{stats.wishes}</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-purple-700">Celebrations</p>
                <MessageCircle size={16} className="text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-purple-700">{stats.celebrations}</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-amber-700">Featured</p>
                <Star size={16} className="text-amber-400" />
              </div>
              <p className="text-2xl font-bold text-amber-700">{stats.featured}</p>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search messages by guest name or content..."
                  className="pl-10 h-9 text-sm"
                />
              </div>

              <div className="flex items-center gap-2">
                {/* Filter Buttons */}
                <div className="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
                  <button
                    onClick={() => setFilterType('all')}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                      filterType === 'all'
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    )}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilterType('wish')}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                      filterType === 'wish'
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    )}
                  >
                    Wishes
                  </button>
                  <button
                    onClick={() => setFilterType('celebration')}
                    className={cn(
                      "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                      filterType === 'celebration'
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    )}
                  >
                    Celebrations
                  </button>
                </div>

                {selectedMessages.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBulkDelete}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 h-9 text-sm"
                  >
                    <Trash2 size={16} className="mr-1.5" />
                    Delete ({selectedMessages.length})
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 text-sm"
                >
                  <Download size={16} className="mr-1.5" />
                  Export
                </Button>
              </div>
            </div>
          </div>

          {/* Messages Grid */}
          <div className="grid grid-cols-1 gap-4">
            {filteredMessages.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                <MessageCircle size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-sm font-medium text-gray-600">No messages found</p>
                <p className="text-xs text-gray-500 mt-1">Messages from your guests will appear here</p>
              </div>
            ) : (
              filteredMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedMessages.includes(message.id)}
                      onChange={() => toggleSelectMessage(message.id)}
                      className="mt-1 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />

                    {/* Avatar */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                      {message.guestName.charAt(0)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">{message.guestName}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={cn(
                              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                              message.type === 'wish'
                                ? "bg-pink-50 text-pink-700 border border-pink-200"
                                : "bg-purple-50 text-purple-700 border border-purple-200"
                            )}>
                              {message.type === 'wish' ? <Heart size={10} /> : <MessageCircle size={10} />}
                              {message.type.charAt(0).toUpperCase() + message.type.slice(1)}
                            </span>
                            {message.isFeatured && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                                <Star size={10} />
                                Featured
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleFeatured(message.id)}
                            className={cn(
                              "p-2 rounded-lg transition-colors",
                              message.isFeatured
                                ? "text-amber-600 hover:bg-amber-50"
                                : "text-gray-400 hover:text-amber-600 hover:bg-amber-50"
                            )}
                            title={message.isFeatured ? "Remove from featured" : "Add to featured"}
                          >
                            <Star size={16} className={message.isFeatured ? "fill-amber-600" : ""} />
                          </button>
                          <button
                            onClick={() => handleDeleteMessage(message.id)}
                            className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 leading-relaxed mb-2">
                        {message.message}
                      </p>

                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock size={12} />
                        {formatDate(message.createdAt)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Bulk Actions Footer */}
          {selectedMessages.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedMessages.length === filteredMessages.length && filteredMessages.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <p className="text-sm text-gray-600">
                    {selectedMessages.length} message{selectedMessages.length > 1 ? 's' : ''} selected
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBulkDelete}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 h-9 text-sm"
                  >
                    <Trash2 size={16} className="mr-1.5" />
                    Delete Selected
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
