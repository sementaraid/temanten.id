import { motion } from 'motion/react'
import { Plus, Upload, Download, Search, Mail, Phone, Check, X, UserPlus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Navigation } from '@/components/theme/navigation'
import { NavigationTabs } from '@/components/theme/invitation-tabs'

interface Guest {
  id: string
  name: string
  email?: string
  phone?: string
  status: 'pending' | 'confirmed' | 'declined'
  plusOne: boolean
  createdAt: string
}

export default function InvitationGuest() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [selectedGuests, setSelectedGuests] = useState<string[]>([])

  const [guests, setGuests] = useState<Guest[]>([
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice@example.com',
      phone: '+62 812 3456 7890',
      status: 'confirmed',
      plusOne: true,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob@example.com',
      phone: '+62 813 4567 8901',
      status: 'pending',
      plusOne: false,
      createdAt: '2024-01-16'
    },
    {
      id: '3',
      name: 'Carol White',
      email: 'carol@example.com',
      phone: '+62 814 5678 9012',
      status: 'declined',
      plusOne: false,
      createdAt: '2024-01-17'
    },
  ])

  const [newGuest, setNewGuest] = useState({
    name: '',
    email: '',
    phone: '',
    plusOne: false,
  })

  const filteredGuests = guests.filter(guest =>
    guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.email?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddGuest = () => {
    if (newGuest.name.trim()) {
      const guest: Guest = {
        id: Date.now().toString(),
        name: newGuest.name,
        email: newGuest.email || undefined,
        phone: newGuest.phone || undefined,
        status: 'pending',
        plusOne: newGuest.plusOne,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setGuests([...guests, guest])
      setNewGuest({ name: '', email: '', phone: '', plusOne: false })
      setShowAddModal(false)
    }
  }

  const handleDeleteGuest = (id: string) => {
    setGuests(guests.filter(g => g.id !== id))
  }

  const handleBulkDelete = () => {
    setGuests(guests.filter(g => !selectedGuests.includes(g.id)))
    setSelectedGuests([])
  }

  const toggleSelectGuest = (id: string) => {
    setSelectedGuests(prev =>
      prev.includes(id) ? prev.filter(gId => gId !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedGuests.length === filteredGuests.length) {
      setSelectedGuests([])
    } else {
      setSelectedGuests(filteredGuests.map(g => g.id))
    }
  }

  const statusColors = {
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    declined: 'bg-red-50 text-red-700 border-red-200',
  }

  const stats = {
    total: guests.length,
    confirmed: guests.filter(g => g.status === 'confirmed').length,
    pending: guests.filter(g => g.status === 'pending').length,
    declined: guests.filter(g => g.status === 'declined').length,
  }

  return (
    <>
      <Navigation
        previousUrl='/my-invitations/list'
        title='Invitation Guests'
        subTitle='Manage your guest list'
        BellowSection={<NavigationTabs/>}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Total Guests</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <p className="text-xs text-emerald-700 mb-1">Confirmed</p>
              <p className="text-2xl font-bold text-emerald-700">{stats.confirmed}</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-xs text-yellow-700 mb-1">Pending</p>
              <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-xs text-red-700 mb-1">Declined</p>
              <p className="text-2xl font-bold text-red-700">{stats.declined}</p>
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
                  placeholder="Search guests by name or email..."
                  className="pl-10 h-9 text-sm"
                />
              </div>

              <div className="flex items-center gap-2">
                {selectedGuests.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBulkDelete}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 h-9 text-sm"
                  >
                    <Trash2 size={16} className="mr-1.5" />
                    Delete ({selectedGuests.length})
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowImportModal(true)}
                  className="h-9 text-sm"
                >
                  <Upload size={16} className="mr-1.5" />
                  Import CSV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 text-sm"
                >
                  <Download size={16} className="mr-1.5" />
                  Export
                </Button>
                <Button
                  size="sm"
                  onClick={() => setShowAddModal(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white h-9 text-sm"
                >
                  <Plus size={16} className="mr-1.5" />
                  Add Guest
                </Button>
              </div>
            </div>
          </div>

          {/* Guest Table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="w-12 px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedGuests.length === filteredGuests.length && filteredGuests.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Guest Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Plus One
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Added
                    </th>
                    <th className="w-12 px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredGuests.map((guest) => (
                    <motion.tr
                      key={guest.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedGuests.includes(guest.id)}
                          onChange={() => toggleSelectGuest(guest.id)}
                          className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900">{guest.name}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          {guest.email && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                              <Mail size={12} />
                              {guest.email}
                            </div>
                          )}
                          {guest.phone && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                              <Phone size={12} />
                              {guest.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={cn(
                          "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border",
                          statusColors[guest.status]
                        )}>
                          {guest.status === 'confirmed' && <Check size={12} />}
                          {guest.status === 'declined' && <X size={12} />}
                          {guest.status.charAt(0).toUpperCase() + guest.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600">
                          {guest.plusOne ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-gray-500">
                          {new Date(guest.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDeleteGuest(guest.id)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredGuests.length === 0 && (
              <div className="text-center py-12">
                <UserPlus size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-sm font-medium text-gray-600">No guests found</p>
                <p className="text-xs text-gray-500 mt-1">Add your first guest to get started</p>
              </div>
            )}
          </div>

          {/* Add Guest Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl p-6 w-full max-w-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-900">Add New Guest</h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-xs font-medium text-gray-600 mb-1.5">Guest Name *</Label>
                    <Input
                      value={newGuest.name}
                      onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                      placeholder="John Doe"
                      className="text-sm h-9"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-600 mb-1.5">Email</Label>
                    <Input
                      type="email"
                      value={newGuest.email}
                      onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                      placeholder="john@example.com"
                      className="text-sm h-9"
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-gray-600 mb-1.5">Phone</Label>
                    <Input
                      value={newGuest.phone}
                      onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                      placeholder="+62 812 3456 7890"
                      className="text-sm h-9"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="plusOne"
                      checked={newGuest.plusOne}
                      onChange={(e) => setNewGuest({ ...newGuest, plusOne: e.target.checked })}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <Label htmlFor="plusOne" className="text-sm text-gray-700">
                      Allow plus one
                    </Label>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 h-9 text-sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddGuest}
                    disabled={!newGuest.name.trim()}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white h-9 text-sm"
                  >
                    Add Guest
                  </Button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Import CSV Modal */}
          {showImportModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl p-6 w-full max-w-md"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-900">Import Guests from CSV</h3>
                  <button
                    onClick={() => setShowImportModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-3">
                      Upload a CSV file with columns: name, email, phone, plusOne
                    </p>
                    <button className="w-full p-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-400 transition-colors">
                      <Upload size={32} className="mx-auto mb-2 text-gray-400" />
                      <p className="text-sm font-medium text-gray-600">Click to upload CSV</p>
                      <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
                    </button>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs font-medium text-gray-700 mb-2">Example CSV format:</p>
                    <pre className="text-xs text-gray-600 font-mono">
                      {`name,email,phone,plusOne
John Doe,john@example.com,+62812...,true
Jane Smith,jane@example.com,+62813...,false`}
                    </pre>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowImportModal(false)}
                    className="flex-1 h-9 text-sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white h-9 text-sm"
                  >
                    Import
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
