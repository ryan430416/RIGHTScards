interface CaseStoryBodyProps {
  paragraphs: string[]
  className?: string
}

export function CaseStoryBody({ paragraphs, className }: CaseStoryBodyProps) {
  return (
    <div className={className}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  )
}
