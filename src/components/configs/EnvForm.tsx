import { useState } from 'react';
import Modal from '@/components/Modal';

interface EnvFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => Promise<void>;
}

export default function EnvForm({
  open,
  onClose,
  onSubmit,
}: EnvFormProps) {
  const [envName, setEnvName] = useState('');

  const handleClose = () => {
    setEnvName('');
    onClose();
  };

  const handleSubmit = async () => {
    await onSubmit(envName);
    setEnvName('');
  };

  return (
    <Modal open={open} onClose={handleClose} title="添加环境">
      <div className="space-y-4">
        <div>
          <label className="block text-xs text-[#64748B] mb-1">环境名称</label>
          <input
            value={envName}
            onChange={(e) => setEnvName(e.target.value)}
            className="w-full px-3 py-2 bg-[#0F172A] border border-[#334155] rounded-lg text-sm text-[#F1F5F9] focus:outline-none focus:border-emerald-500/50"
            placeholder="例如: staging"
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
            添加
          </button>
        </div>
      </div>
    </Modal>
  );
}
