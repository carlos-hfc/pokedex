import { cn } from "@/utils"

interface ProgressProps {
  value: number
  type: string
}

export function Progress(props: ProgressProps) {
  const percent = Math.round(props.value * 100) / 200

  return (
    <div
      role="progressbar"
      aria-label={props.value.toString()}
      aria-valuemin={0}
      aria-valuemax={200}
      className="flex relative w-full bg-neutral-800 rounded-xl overflow-hidden h-2"
    >
      <div
        role="presentation"
        className={cn(
          "h-full rounded-xl animate-[increase_2s_backwards]",
          `bg-${props.type}`,
        )}
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
