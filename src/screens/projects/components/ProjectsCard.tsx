import { Card } from 'antd'
import { type ReactNode } from 'react'

type ProjectsCardProps = {
  children: ReactNode
  className?: string
}

export const ProjectsCard = ({ children, className }: ProjectsCardProps) => {
  return (
    <Card className={`rounded-2xl border border-slate-200 shadow-sm ${className ?? ''}`}>
      {children}
    </Card>
  )
}

