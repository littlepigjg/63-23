import { useState } from 'react';
import Modal from '@/components/Modal';

interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string, description: string) => Promise<void>;
}

export default function ProjectForm({
  open,
  onClose,
  onSubmit,
}: ProjectFormProps) {
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');

  const handleClose = () => {
    setProjectName('');
    setProjectDesc('');
    onClose();
  };

  const handleSubmit = async () => {
    await onSubmit(projectName, projectDesc);
    setProjectName('');
    setProjectDesc('');
  };

  return (
    <Modal open={open} onClose={handleClose} title="新建项目">
      <div className="space-y-4">
        <div>
          <label className="block text-xs text-[#64748B] mb-1">项目名称</label>
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-3 py-2 bg-[#0F172A] border border-[#334155] rounded-lg text-sm text-[#F1F5F9] focus:outline-none focus:border-emerald-500/50"
            placeholder="例如: 用户服务"
          />
        </div>
        <div>
          <label className="block text-xs text-[#64748B] mb-1">描述</label>
          <input
            value={projectDesc}
            onChange={(e) => setProjectDesc(e.target.value)}
            className="w-full px-3 py-2 bg-[#0F172A] border border-[#334155] rounded-lg text-sm text-[#F1F5F9] focus:outline-none focus:border-emerald-500/50"
            placeholder="项目描述"
          />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm text-[#64748B] hover:text-[#F1F5F9] transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-emerald-500/15 text-emerald-400 rounded-lg hover:bg-emerald-500/25 transition-colors"
          >
            创建
          </button>
        </div>
      </div>
    </Modal>
  );
}
