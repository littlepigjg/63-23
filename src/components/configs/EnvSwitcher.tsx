import { Plus } from 'lucide-react';
import { envLabel } from '@/utils/format';

interface EnvSwitcherProps {
  environments: string[];
  selectedEnv: string;
  onSelectEnv: (env: string) => void;
  onAddEnv: () => void;
}

export default function EnvSwitcher({
  environments,
  selectedEnv,
  onSelectEnv,
  onAddEnv,
}: EnvSwitcherProps) {
  return (
    <div className="flex items-center gap-1 bg-[#1E293B] border border-[#334155] rounded-lg p-1">
      {environments.map((env) => (
        <button
          key={env}
          onClick={() => onSelectEnv(env)}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            selectedEnv === env
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'text-[#64748B] hover:text-[#94A3B8]'
          }`}
        >
          {envLabel(env)}
        </button>
      ))}
      <button
        onClick={onAddEnv}
        className="px-2 py-1.5 text-xs text-[#64748B] hover:text-emerald-400 transition-colors"
      >
        <Plus className="w-3 h-3" />
      </button>
    </div>
  );
}
