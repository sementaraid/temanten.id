import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'

type CopyableTextProps = {
  text: string
  label: string
}

const CopyableText = ({ text, label }: CopyableTextProps) => {
  const [copied, setCopied] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleCopy = () => {
    try {
      const textarea = textareaRef.current
      if (!textarea) return

      textarea.focus()
      textarea.select()
      textarea.setSelectionRange(0, textarea.value.length) // iOS Safari

      const success = document.execCommand('copy')
      if (!success) throw new Error('Copy failed')

      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex-1 min-w-0">
        {label && <p className="text-xs text-gray-500 mb-1">{label}</p>}
        <p className="text-sm font-mono font-medium text-gray-900 truncate">
          {text}
        </p>
      </div>

      {/* Hidden but selectable textarea */}
      <textarea
        ref={textareaRef}
        value={text}
        readOnly
        className="absolute left-[-9999px] top-[-9999px] -z-[10000] visible-none"
      />

      <Button
        size="sm"
        variant={"outline"}
        onClick={handleCopy}
        className="flex-shrink-0"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 mr-1" />
            Copied
          </>
        ) : (
          <>
            <Copy className="w-4 h-4 mr-1" />
            Copy
          </>
        )}
      </Button>
    </div>
  )
}

export { CopyableText }
