import { HelixLogo } from "@/components/helix-logo"
import { InsightForm } from "@/components/insight-form"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-16 md:py-24 max-w-5xl">
        <header className="mb-16 text-center">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-6">
            Life Sciences
          </p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <HelixLogo className="h-14 w-14 md:h-16 md:w-16" />
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
              Helix
            </h1>
          </div>
          <h2 className="text-xl md:text-2xl font-light text-foreground/90 mb-3 tracking-wide">
            Agentic AI for Biomedical Discovery
          </h2>
          <p className="text-sm text-primary font-medium mb-4">
            Powered by NVIDIA Nemotron
          </p>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Generate structured research insights across genomics, proteins, and disease biology.
          </p>
        </header>

        <InsightForm />

        <footer className="mt-20 text-center text-xs text-muted-foreground">
          <p>
            Helix uses AI to generate research insights. Always verify findings with primary sources.
          </p>
        </footer>
      </div>
    </main>
  )
}
