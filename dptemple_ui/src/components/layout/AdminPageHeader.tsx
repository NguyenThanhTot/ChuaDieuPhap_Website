interface AdminPageHeaderProps {
  title: string
  subtitle?: string
  breadcrumb?: string
  actions?: React.ReactNode
}

export default function AdminPageHeader({ 
  title, 
  subtitle, 
  breadcrumb,
  actions
}: AdminPageHeaderProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 mb-6">
      {/* Breadcrumb */}
      {breadcrumb && (
        <div className="px-6 pt-6 pb-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Bảng điều khiển</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{breadcrumb}</span>
          </div>
        </div>
      )}

      {/* Header Content */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          {actions && (
            <div className="flex-shrink-0">
              {actions}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
