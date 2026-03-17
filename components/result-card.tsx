"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Search, FlaskConical } from "lucide-react"

type CardType = "discoveries" | "gaps" | "hypothesis"

interface ResultCardProps {
  type: CardType
  content: string
  isLoading?: boolean
}

const cardConfig: Record<CardType, { icon: typeof Lightbulb; title: string }> = {
  discoveries: {
    icon: Lightbulb,
    title: "Known Discoveries",
  },
  gaps: {
    icon: Search,
    title: "Research Gaps",
  },
  hypothesis: {
    icon: FlaskConical,
    title: "Suggested Hypothesis",
  },
}

export function ResultCard({ type, content, isLoading }: ResultCardProps) {
  const { icon: Icon, title } = cardConfig[type]

  return (
    <Card className="border-border/50 bg-transparent hover:border-primary/30 transition-colors">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-base font-medium">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border/50">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <span className="text-foreground/90">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-muted" />
          </div>
        ) : content ? (
          <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
            {content}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground/50 italic">
            Enter a research topic and click &quot;Generate Insight&quot; to see results
          </p>
        )}
      </CardContent>
    </Card>
  )
}
