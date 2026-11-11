type Props = {
  eyebrow: string
  title: string
  description?: string
}

export default function SectionHeading({ eyebrow, title, description }: Props) {
  return (
    <div>
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-blue-600">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {description && <p className="mt-3 max-w-2xl text-gray-600">{description}</p>}
    </div>
  )
}
