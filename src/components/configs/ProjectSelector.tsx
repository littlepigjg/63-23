import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { Project } from '../../../shared/types';

interface ProjectSelectorProps {
  projects: Project[];
  selectedProjectId: string | null;
  onSelectProject: (id: string) => void;
}

export default function ProjectSelector({
  projects,
  selectedProjectId,
  onSelectProject,
}: ProjectSelectorProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const currentProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-4 py-2 bg-[#1E293B] border border-[#334155] rounded-lg text-sm text-[#F1F5F9] hover:border-emerald-500/30 transition-colors min-w-[200px] justify-between"
      >
        <span>{currentProject?.name || '选择项目'}</span>
        <ChevronDown className="w-4 h-4 text-[#64748B]" />
      </button>
      {showDropdown && (
        <div className="absolute top-full left-0 mt-1 w-full bg-[#1E293B] border border-[#334155] rounded-lg shadow-xl z-20 overflow-hidden">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                onSelectProject(p.id);
                setShowDropdown(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-[#334155] transition-colors ${
                p.id === selectedProjectId
                  ? 'text-emerald-400'
                  : 'text-[#94A3B8]'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
