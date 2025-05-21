export default function Loading() {
  return (
    <div className="flex items-center justify-center inset-0 fixed w-full bg-white/20 h-screen">
      <div className="animate-spin w-1/3 h-1/3 bg-no-repeat bg-contain bg-center bg-pokeball" />
    </div>
  )
}
