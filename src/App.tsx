import { tv } from 'tailwind-variants'
import { Button } from '@/components/ui/button'

const badge = tv({
  base: 'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
  variants: {
    color: {
      default: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      destructive: 'bg-destructive text-white',
    },
  },
  defaultVariants: {
    color: 'default',
  },
})

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-4xl font-bold tracking-tight">React + shadcn/ui + tailwind-variants</h1>

      <section className="flex flex-col items-center gap-4">
        <h2 className="text-lg font-semibold text-muted-foreground">shadcn/ui Buttons</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </section>

      <section className="flex flex-col items-center gap-4">
        <h2 className="text-lg font-semibold text-muted-foreground">tailwind-variants Badges</h2>
        <div className="flex flex-wrap gap-3">
          <span className={badge()}>Default</span>
          <span className={badge({ color: 'secondary' })}>Secondary</span>
          <span className={badge({ color: 'destructive' })}>Destructive</span>
        </div>
      </section>
    </div>
  )
}

export default App
