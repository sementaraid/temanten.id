import { motion, AnimatePresence } from 'motion/react'
import { Heart, Calendar, MapPin, Check, Globe, Save, ArrowRight, ArrowLeft as ArrowLeftIcon, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { createInvitationSchema } from '@shared/schema'
import { Navigation } from '@/components/theme/navigation'

type CreateInvitationFormData = z.infer<typeof createInvitationSchema>

const steps = [
  { id: 1, name: 'URL & Template Selection', description: 'Choose your URL and design' },
  { id: 2, name: 'Bride Details', description: 'Information about the bride' },
  { id: 3, name: 'Groom Details', description: 'Information about the groom' },
  { id: 4, name: 'Ceremony & Reception', description: 'Event date and location' },
  { id: 5, name: 'Review & Publish', description: 'Review and publish' },
]

export default function CreateInvitation() {
  const [currentStep, setCurrentStep] = useState(1)
  
  const { register, handleSubmit, watch, setValue, formState: { errors }, trigger } = useForm({
    resolver: zodResolver(createInvitationSchema),
    mode: 'onChange',
    defaultValues: {
      slug: '',
      templateId: '',
      bride: {
        fullName: '',
        nickname: '',
        birthOrder: '',
        father: '',
        mother: '',
        instagram: '',
      },
      groom: {
        fullName: '',
        nickname: '',
        birthOrder: '',
        father: '',
        mother: '',
        instagram: '',
      },
      ceremony: {
        name: 'Akad Nikah',
        date: '',
        time: '',
        locationName: '',
        address: '',
        mapsUrl: '',
      },
      reception: {
        name: 'Resepsi',
        date: '',
        time: '',
        locationName: '',
        address: '',
        mapsUrl: '',
      },
    },
  })

  const formData = watch()

  const onSubmit = (data: CreateInvitationFormData) => {
    console.log('Form data:', data)
    // Handle form submission
  }

  const templates = [
    { id: '1', name: 'Elegant Rose', preview: 'bg-gradient-to-br from-pink-50 to-rose-100' },
    { id: '2', name: 'Tropical Paradise', preview: 'bg-gradient-to-br from-teal-50 to-emerald-100' },
    { id: '3', name: 'Garden Romance', preview: 'bg-gradient-to-br from-green-50 to-emerald-100' },
    { id: '4', name: 'Modern Minimalist', preview: 'bg-gradient-to-br from-gray-50 to-slate-100' },
  ]

  const handleNext = async () => {
    let fieldsToValidate: any[] = []
    
    if (currentStep === 1) {
      fieldsToValidate = ['slug', 'templateId']
    } else if (currentStep === 2) {
      fieldsToValidate = ['bride.fullName']
    } else if (currentStep === 3) {
      fieldsToValidate = ['groom.fullName']
    } else if (currentStep === 4) {
      fieldsToValidate = ['ceremony.date', 'ceremony.time', 'reception.date', 'reception.time']
    }

    const isValid = await trigger(fieldsToValidate as any)
    
    if (isValid && currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <>
      <Navigation
        previousUrl='/my-invitations/list'
        title='Create Invitation'
        subTitle={`Step ${currentStep} of ${steps.length}: ${steps[currentStep - 1].description}`}
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
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6">
            {/* Main Form Area */}
            <div className="max-w-4xl mx-auto w-full">
              {/* Step Indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-10"
              >
                <div className="relative">
                  {/* Progress Line Background */}
                  <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />
                  
                  {/* Progress Line Foreground */}
                  <div 
                    className="absolute top-5 left-0 h-0.5 bg-emerald-600 transition-all duration-500 ease-out"
                    style={{ 
                      width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` 
                    }}
                  />

                  {/* Steps */}
                  <div className="relative flex items-start justify-between">
                    {steps.map((step) => (
                      <div key={step.id} className="flex flex-col items-center" style={{ width: '20%' }}>
                        {/* Step Circle */}
                        <button
                          type="button"
                          onClick={() => {
                            if (currentStep > step.id) {
                              setCurrentStep(step.id)
                            }
                          }}
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 relative z-10",
                            currentStep > step.id
                              ? "bg-emerald-600 text-white cursor-pointer hover:bg-emerald-700"
                              : currentStep === step.id
                              ? "bg-emerald-600 text-white"
                              : "bg-white border-2 border-gray-200 text-gray-400 cursor-not-allowed"
                          )}
                          disabled={currentStep <= step.id}
                        >
                          {currentStep > step.id ? <Check size={16} /> : step.id}
                        </button>

                        {/* Step Label */}
                        <div className="mt-3 text-center">
                          <p className={cn(
                            "text-xs font-medium transition-colors duration-300 hidden sm:block",
                            currentStep >= step.id ? "text-gray-900" : "text-gray-400"
                          )}>
                            {step.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              <AnimatePresence mode="wait">
                {/* Step 1: URL & Template */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl border border-gray-200 p-6"
                  >
                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-gray-900 mb-1">
                        Invitation URL & Template
                      </h3>
                      <p className="text-xs text-gray-500">
                        Create your unique invitation link and pick a beautiful template to get started
                      </p>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <Label className="text-xs font-medium text-gray-600 mb-1.5">
                          Custom URL Slug *
                        </Label>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 whitespace-nowrap">temanten.id/</span>
                          <Input
                            {...register('slug')}
                            placeholder="sarah-john"
                            className="text-sm h-9"
                          />
                        </div>
                        {errors.slug && (
                          <p className="text-xs text-red-600 mt-1">{errors.slug.message}</p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">Use lowercase letters, numbers, and hyphens only</p>
                      </div>

                      <div>
                        <Label className="text-xs font-medium text-gray-600 mb-1.5">
                          Choose Template *
                        </Label>
                        <div className="grid grid-cols-2 gap-3">
                          {templates.map((template) => (
                            <button
                              key={template.id}
                              type="button"
                              onClick={() => setValue('templateId', template.id, { shouldValidate: true })}
                              className={cn(
                                "relative p-4 rounded-lg border-2 transition-all",
                                formData.templateId === template.id
                                  ? "border-emerald-600 bg-emerald-50"
                                  : "border-gray-200 hover:border-gray-300"
                              )}
                            >
                              <div className={cn("h-32 rounded-md mb-3", template.preview)} />
                              <p className="text-xs font-medium text-gray-900">{template.name}</p>
                              {formData.templateId === template.id && (
                                <div className="absolute top-3 right-3 w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                                  <Check size={14} className="text-white" />
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                        {errors.templateId && (
                          <p className="text-xs text-red-600 mt-1">{errors.templateId.message}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Bride Information */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl border border-gray-200 p-6"
                  >
                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-gray-900 mb-1">
                        Bride Information
                      </h3>
                      <p className="text-xs text-gray-500">
                        Tell us about the bride — names, family, and a little personal touch
                      </p>
                    </div>

                    <div className="space-y-6 max-w-2xl">
                      {/* Personal Information */}
                      <div>
                        <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-4 flex items-center gap-2">
                          <Heart size={14} />
                          Personal Information
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-xs font-medium text-gray-600 mb-1.5">Full Name *</Label>
                            <Input
                              {...register('bride.fullName')}
                              placeholder="Sarah Anderson"
                              className="text-sm h-10"
                            />
                            {errors.bride?.fullName && (
                              <p className="text-xs text-red-600 mt-1">{errors.bride.fullName.message}</p>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-xs font-medium text-gray-600 mb-1.5">Nickname</Label>
                              <Input
                                {...register('bride.nickname')}
                                placeholder="Sarah"
                                className="text-sm h-10"
                              />
                            </div>
                            <div>
                              <Label className="text-xs font-medium text-gray-600 mb-1.5">Birth Order</Label>
                              <Input
                                {...register('bride.birthOrder')}
                                placeholder="First daughter of"
                                className="text-sm h-10"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Parents Information */}
                      <div className="pt-6 border-t border-gray-100">
                        <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-4 flex items-center gap-2">
                          <Users size={14} />
                          Parents
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs font-medium text-gray-600 mb-1.5">Father's Name</Label>
                            <Input
                              {...register('bride.father')}
                              placeholder="Mr. Anderson"
                              className="text-sm h-10"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-600 mb-1.5">Mother's Name</Label>
                            <Input
                              {...register('bride.mother')}
                              placeholder="Mrs. Anderson"
                              className="text-sm h-10"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Social Media */}
                      <div className="pt-6 border-t border-gray-100">
                        <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-4">
                          Social Media
                        </h4>
                        <div>
                          <Label className="text-xs font-medium text-gray-600 mb-1.5">Instagram Handle</Label>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 font-medium">@</span>
                            <Input
                              {...register('bride.instagram')}
                              placeholder="sarahanderson"
                              className="text-sm h-10"
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Optional - will be displayed on the invitation</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Groom Information */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl border border-gray-200 p-6"
                  >
                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-gray-900 mb-1">
                        Groom Information
                      </h3>
                      <p className="text-xs text-gray-500">
                        Tell us about the groom — names, family, and a little personal touch
                      </p>
                    </div>

                    <div className="space-y-6 max-w-2xl">
                      {/* Personal Information */}
                      <div>
                        <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-4 flex items-center gap-2">
                          <Heart size={14} />
                          Personal Information
                        </h4>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-xs font-medium text-gray-600 mb-1.5">Full Name *</Label>
                            <Input
                              {...register('groom.fullName')}
                              placeholder="John Smith"
                              className="text-sm h-10"
                            />
                            {errors.groom?.fullName && (
                              <p className="text-xs text-red-600 mt-1">{errors.groom.fullName.message}</p>
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-xs font-medium text-gray-600 mb-1.5">Nickname</Label>
                              <Input
                                {...register('groom.nickname')}
                                placeholder="John"
                                className="text-sm h-10"
                              />
                            </div>
                            <div>
                              <Label className="text-xs font-medium text-gray-600 mb-1.5">Birth Order</Label>
                              <Input
                                {...register('groom.birthOrder')}
                                placeholder="First son of"
                                className="text-sm h-10"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Parents Information */}
                      <div className="pt-6 border-t border-gray-100">
                        <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-4 flex items-center gap-2">
                          <Users size={14} />
                          Parents
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs font-medium text-gray-600 mb-1.5">Father's Name</Label>
                            <Input
                              {...register('groom.father')}
                              placeholder="Mr. Smith"
                              className="text-sm h-10"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-600 mb-1.5">Mother's Name</Label>
                            <Input
                              {...register('groom.mother')}
                              placeholder="Mrs. Smith"
                              className="text-sm h-10"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Social Media */}
                      <div className="pt-6 border-t border-gray-100">
                        <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-4">
                          Social Media
                        </h4>
                        <div>
                          <Label className="text-xs font-medium text-gray-600 mb-1.5">Instagram Handle</Label>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500 font-medium">@</span>
                            <Input
                              {...register('groom.instagram')}
                              placeholder="johnsmith"
                              className="text-sm h-10"
                            />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">Optional - will be displayed on the invitation</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Event Details */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl border border-gray-200 p-6"
                  >
                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-gray-900 mb-1">
                        Event Details
                      </h3>
                      <p className="text-xs text-gray-500">
                        When and where is the big day? Share your ceremony and reception details
                      </p>
                    </div>

                    <div className="space-y-6">
                      {/* Ceremony */}
                      <div>
                        <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-3">
                          Ceremony (Akad Nikah)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs font-medium text-gray-600 mb-1.5">Date *</Label>
                            <Input
                              type="date"
                              {...register('ceremony.date')}
                              className="text-sm h-9"
                            />
                            {errors.ceremony?.date && (
                              <p className="text-xs text-red-600 mt-1">{errors.ceremony.date.message}</p>
                            )}
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-600 mb-1.5">Time *</Label>
                            <Input
                              type="time"
                              {...register('ceremony.time')}
                              className="text-sm h-9"
                            />
                            {errors.ceremony?.time && (
                              <p className="text-xs text-red-600 mt-1">{errors.ceremony.time.message}</p>
                            )}
                          </div>
                          <div className="md:col-span-2">
                            <Label className="text-xs font-medium text-gray-600 mb-1.5">Location Name</Label>
                            <Input
                              {...register('ceremony.locationName')}
                              placeholder="Grand Ballroom Hotel"
                              className="text-sm h-9"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label className="text-xs font-medium text-gray-600 mb-1.5">Address</Label>
                            <Input
                              {...register('ceremony.address')}
                              placeholder="Jl. Sudirman No. 123, Jakarta"
                              className="text-sm h-9"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label className="text-xs font-medium text-gray-600 mb-1.5">Google Maps URL</Label>
                            <Input
                              {...register('ceremony.mapsUrl')}
                              placeholder="https://maps.google.com/..."
                              className="text-sm h-9"
                            />
                            {errors.ceremony?.mapsUrl && (
                              <p className="text-xs text-red-600 mt-1">{errors.ceremony.mapsUrl.message}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Reception */}
                      <div>
                        <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-3">
                          Reception (Resepsi)
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs font-medium text-gray-600 mb-1.5">Date *</Label>
                            <Input
                              type="date"
                              {...register('reception.date')}
                              className="text-sm h-9"
                            />
                            {errors.reception?.date && (
                              <p className="text-xs text-red-600 mt-1">{errors.reception.date.message}</p>
                            )}
                          </div>
                          <div>
                            <Label className="text-xs font-medium text-gray-600 mb-1.5">Time *</Label>
                            <Input
                              type="time"
                              {...register('reception.time')}
                              className="text-sm h-9"
                            />
                            {errors.reception?.time && (
                              <p className="text-xs text-red-600 mt-1">{errors.reception.time.message}</p>
                            )}
                          </div>
                          <div className="md:col-span-2">
                            <Label className="text-xs font-medium text-gray-600 mb-1.5">Location Name</Label>
                            <Input
                              {...register('reception.locationName')}
                              placeholder="Grand Ballroom Hotel"
                              className="text-sm h-9"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label className="text-xs font-medium text-gray-600 mb-1.5">Address</Label>
                            <Input
                              {...register('reception.address')}
                              placeholder="Jl. Sudirman No. 123, Jakarta"
                              className="text-sm h-9"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label className="text-xs font-medium text-gray-600 mb-1.5">Google Maps URL</Label>
                            <Input
                              {...register('reception.mapsUrl')}
                              placeholder="https://maps.google.com/..."
                              className="text-sm h-9"
                            />
                            {errors.reception?.mapsUrl && (
                              <p className="text-xs text-red-600 mt-1">{errors.reception.mapsUrl.message}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Review */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="mb-6">
                        <h3 className="text-sm font-bold text-gray-900 mb-1">
                          Review Your Invitation
                        </h3>
                        <p className="text-xs text-gray-500">
                          Everything looks good? Double-check the details and hit publish when you're ready
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        {/* URL & Template */}
                        <div className="pb-4 border-b border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-medium text-gray-600">URL & Template</p>
                            <button
                              type="button"
                              onClick={() => setCurrentStep(1)}
                              className="text-xs text-emerald-600 hover:text-emerald-700"
                            >
                              Edit
                            </button>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Globe size={14} className="text-emerald-600" />
                              <p className="text-sm text-gray-900">temanten.id/{formData.slug}</p>
                            </div>
                            <p className="text-sm text-gray-900">
                              Template: {templates.find(t => t.id === formData.templateId)?.name}
                            </p>
                          </div>
                        </div>

                        {/* Bride Info */}
                        <div className="pb-4 border-b border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-medium text-gray-600">Bride Information</p>
                            <button
                              type="button"
                              onClick={() => setCurrentStep(2)}
                              className="text-xs text-emerald-600 hover:text-emerald-700"
                            >
                              Edit
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Bride</p>
                              <p className="text-sm font-medium text-gray-900">{formData.bride.fullName}</p>
                              {formData.bride.nickname && (
                                <p className="text-xs text-gray-600">Nickname: {formData.bride.nickname}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Groom Info */}
                        <div className="pb-4 border-b border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-medium text-gray-600">Groom Information</p>
                            <button
                              type="button"
                              onClick={() => setCurrentStep(3)}
                              className="text-xs text-emerald-600 hover:text-emerald-700"
                            >
                              Edit
                            </button>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Groom</p>
                              <p className="text-sm font-medium text-gray-900">{formData.groom.fullName}</p>
                              {formData.groom.nickname && (
                                <p className="text-xs text-gray-600">Nickname: {formData.groom.nickname}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Event Details */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-medium text-gray-600">Event Details</p>
                            <button
                              type="button"
                              onClick={() => setCurrentStep(4)}
                              className="text-xs text-emerald-600 hover:text-emerald-700"
                            >
                              Edit
                            </button>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-medium text-emerald-600 mb-1">Ceremony</p>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Calendar size={12} className="text-gray-400" />
                                  <p className="text-sm text-gray-900">{formData.ceremony.date} at {formData.ceremony.time}</p>
                                </div>
                                {formData.ceremony.locationName && (
                                  <div className="flex items-center gap-2">
                                    <MapPin size={12} className="text-gray-400" />
                                    <p className="text-sm text-gray-900">{formData.ceremony.locationName}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-emerald-600 mb-1">Reception</p>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Calendar size={12} className="text-gray-400" />
                                  <p className="text-sm text-gray-900">{formData.reception.date} at {formData.reception.time}</p>
                                </div>
                                {formData.reception.locationName && (
                                  <div className="flex items-center gap-2">
                                    <MapPin size={12} className="text-gray-400" />
                                    <p className="text-sm text-gray-900">{formData.reception.locationName}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="mt-6 flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="text-sm h-9"
                >
                  <ArrowLeftIcon size={16} className="mr-1.5" />
                  Back
                </Button>

                {currentStep < 5 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm h-9"
                  >
                    Next
                    <ArrowRight size={16} className="ml-1.5" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm h-9"
                  >
                    <Save size={16} className="mr-1.5" />
                    Publish Invitation
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}