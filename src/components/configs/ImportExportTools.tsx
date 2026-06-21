import { Download, Upload, FolderPlus, Plus } from 'lucide-react';
import type { ConfigItem, Project } from '../../../shared/types';

interface ImportExportToolsProps {
  configs: ConfigItem[];
  currentProject: Project | undefined;
  selectedEnv: string;
  onExport: () => void;
  onImport: () => void;
  onNewProject: () => void;
  onAddConfig: () => void;
}

export default function ImportExportTools({
  onExport,
  onImport,
  onNewProject,
  onAddConfig,
}: ImportExportToolsProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onExport}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#94A3B8] border border-[#334155] rounded-lg hover:bg-[#334155] transition-colors"
      >
        <Download className="w-4 h-4" /> 导出
      </button>
      <button
        onClick={onImport}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#94A3B8] border border-[#334155] rounded-lg hover:bg-[#334155] transition-colors"
      >
        <Upload className="w-4 h-4" /> 导入
      </button>
      <button
        onClick={onNewProject}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#94A3B8] border border-[#334155] rounded-lg hover:bg-[#334155] transition-colors"
      >
        <FolderPlus className="w-4 h-4" /> 新建项目
      </button>
      <button
        onClick={onAddConfig}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-emerald-500/15 text-emerald-400 rounded-lg hover:bg-emerald-500/25 transition-colors"
      >
        <Plus className="w-4 h-4" /> 添加配置
      </button>
    </div>
  );
}
