"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { ResultCard } from "@/components/result-card"

interface InsightResult {
  discoveries: string
  gaps: string
  hypothesis: string
}

const placeholderExamples = [
  "protein misfolding in Alzheimer's disease",
  "genomic biomarkers for early cancer detection",
  "mitochondrial dysfunction in ALS",
]

export function InsightForm() {
  const [topic, setTopic] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<InsightResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!topic.trim()) return

    setIsLoading(true)
    setError(null)
    setResults(null)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || "Failed to generate insights")
      }

      if (data.error) {
        throw new Error(data.error)
      }

      setResults({
        discoveries: data.discoveries || "No discoveries generated",
        gaps: data.gaps || "No research gaps generated",
        hypothesis: data.hypothesis || "No hypothesis generated",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="topic" className="text-sm font-medium text-foreground">
            Enter a biomedical research topic
          </Label>
          <Textarea
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a biomedical research topic..."
            className="min-h-[120px] resize-none bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary"
            disabled={isLoading}
          />
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span>Try:</span>
            {placeholderExamples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => setTopic(example)}
                className="text-primary hover:text-primary/80 hover:underline transition-colors"
                disabled={isLoading}
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          disabled={!topic.trim() || isLoading}
          className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8 py-2.5 text-sm tracking-wide shadow-lg shadow-primary/20"
        >
          {isLoading ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Generating...
            </>
          ) : (
            "Generate Insight"
          )}
        </Button>
      </form>

      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <ResultCard
          type="discoveries"
          content={results?.discoveries || ""}
          isLoading={isLoading}
        />
        <ResultCard
          type="gaps"
          content={results?.gaps || ""}
          isLoading={isLoading}
        />
        <ResultCard
          type="hypothesis"
          content={results?.hypothesis || ""}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
