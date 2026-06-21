import { Pencil, Trash2, Lock, FolderPlus } from 'lucide-react';
import Badge from '@/components/Badge';
import { maskValue } from '@/utils/format';
import type { ConfigItem } from '../../../shared/types';

interface ConfigListProps {
  configs: ConfigItem[];
  loading: boolean;
  selectedProjectId: string | null;
  onEdit: (config: ConfigItem) => void;
  onDelete: (key: string) => void;
}

export default function ConfigList({
  configs,
  loading,
  selectedProjectId,
  onEdit,
  onDelete,
}: ConfigListProps) {
  if (!selectedProjectId) {
    return (
      <div className="text-center py-16 text-[#64748B]">
        <FolderPlus className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p>请先创建或选择一个项目</p>
      </div>
    );
  }

  const visibleConfigs = configs.filter((c) => c.key !== '_init');
  const isEmpty = configs.length === 0 || (configs.length === 1 && configs[0].key === '_init');

  return (
    <div className="bg-[#1E293B] border border-[#334155] rounded-xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#334155]">
            <th className="text-left text-xs font-medium text-[#64748B] px-4 py-3">键名</th>
            <th className="text-left text-xs font-medium text-[#64748B] px-4 py-3">值</th>
            <th className="text-left text-xs font-medium text-[#64748B] px-4 py-3">描述</th>
            <th className="text-left text-xs font-medium text-[#64748B] px-4 py-3">状态</th>
            <th className="text-right text-xs font-medium text-[#64748B] px-4 py-3">操作</th>
          </tr>
        </thead>
        <tbody>
          {loading && configs.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-12 text-[#64748B] text-sm">
                加载中...
              </td>
            </tr>
          ) : isEmpty ? (
            <tr>
              <td colSpan={5} className="text-center py-12 text-[#64748B] text-sm">
                此环境下暂无配置项
              </td>
            </tr>
          ) : (
            visibleConfigs.map((config) => (
              <tr
                key={config.key}
                className="border-b border-[#334155]/50 hover:bg-[#0F172A]/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <span className="font-mono text-sm text-emerald-400">{config.key}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-[#94A3B8]">
                      {config.encrypted
                        ? maskValue(config.value)
                        : config.value.length > 40
                        ? config.value.slice(0, 40) + '...'
                        : config.value}
                    </span>
                    {config.encrypted && <Lock className="w-3.5 h-3.5 text-amber-400" />}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-[#64748B]">{config.description || '-'}</td>
                <td className="px-4 py-3">
                  {config.encrypted ? (
                    <Badge variant="warning">已加密</Badge>
                  ) : (
                    <Badge variant="success">明文</Badge>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(config)}
                      className="p-1.5 text-[#64748B] hover:text-emerald-400 rounded transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(config.key)}
                      className="p-1.5 text-[#64748B] hover:text-rose-400 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
