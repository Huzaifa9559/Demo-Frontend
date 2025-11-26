import { PlusOutlined } from '@ant-design/icons'
import { Button } from '@components/ui'
import { RANGE_DESCRIPTIONS } from '@constants/filters'
import { useProjectsContext } from '../context/ProjectsContext'

type ProjectsHeaderProps = {
  title: string
  subtitle?: string
  className?: string
}

export const ProjectsHeader = ({ title, subtitle, className }: ProjectsHeaderProps) => {
  const { projects, rangeValue, openCreateForm } = useProjectsContext()
  const focusWindow = RANGE_DESCRIPTIONS[rangeValue]

  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm md:flex-row md:items-center md:justify-between ${className ?? ''}`}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Overview
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
        <p className="text-sm text-slate-500">
          {subtitle ?? `Tracking ${projects.length} initiatives`} · Focus on{' '}
          {focusWindow}
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreateForm}>
          New Project
        </Button>
      </div>
    </div>
  )
}

