import { useState, useEffect } from 'react';
import Modal from '@/components/Modal';
import type { ConfigItem } from '../../../shared/types';

interface ConfigFormProps {
  mode: 'add' | 'edit';
  open: boolean;
  editingConfig: ConfigItem | null;
  onClose: () => void;
  onSubmit: (data: {
    key: string;
    value: string;
    description: string;
    encrypted: boolean;
  }) => Promise<void>;
}

export default function ConfigForm({
  mode,
  open,
  editingConfig,
  onClose,
  onSubmit,
}: ConfigFormProps) {
  const [formKey, setFormKey] = useState('');
  const [formValue, setFormValue] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formEncrypted, setFormEncrypted] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && editingConfig) {
      setFormValue(editingConfig.encrypted ? '' : editingConfig.value);
      setFormDesc(editingConfig.description);
      setFormEncrypted(editingConfig.encrypted);
    } else {
      resetForm();
    }
  }, [mode, editingConfig, open]);

  const resetForm = () => {
    setFormKey('');
    setFormValue('');
    setFormDesc('');
    setFormEncrypted(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    await onSubmit({
      key: formKey,
      value: formValue,
      description: formDesc,
      encrypted: formEncrypted,
    });
    resetForm();
  };

  const title =
    mode === 'add' ? '添加配置项' : `编辑: ${editingConfig?.key}`;

  return (
    <Modal open={open} onClose={handleClose} title={title}>
      <div className="space-y-4">
        {mode === 'add' && (
          <div>
            <label className="block text-xs text-[#64748B] mb-1">键名</label>
            <input
              value={formKey}
              onChange={(e) => setFormKey(e.target.value)}
              className="w-full px-3 py-2 bg-[#0F172A] border border-[#334155] rounded-lg text-sm text-[#F1F5F9] font-mono focus:outline-none focus:border-emerald-500/50"
              placeholder="例如: DB_HOST"
            />
          </div>
        )}
        <div>
          <label className="block text-xs text-[#64748B] mb-1">
            值 {mode === 'edit' && editingConfig?.encrypted && '(留空保持原值)'}
          </label>
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            className="w-full px-3 py-2 bg-[#0F172A] border border-[#334155] rounded-lg text-sm text-[#F1F5F9] font-mono focus:outline-none focus:border-emerald-500/50"
            placeholder="配置值"
          />
        </div>
        <div>
          <label className="block text-xs text-[#64748B] mb-1">描述</label>
          <input
            value={formDesc}
            onChange={(e) => setFormDesc(e.target.value)}
            className="w-full px-3 py-2 bg-[#0F172A] border border-[#334155] rounded-lg text-sm text-[#F1F5F9] focus:outline-none focus:border-emerald-500/50"
            placeholder="配置项描述"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formEncrypted}
            onChange={(e) => setFormEncrypted(e.target.checked)}
            className="rounded border-[#334155] bg-[#0F172A] text-emerald-500 focus:ring-emerald-500/50"
          />
          <label className="text-sm text-[#94A3B8]">加密存储此值</label>
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
            {mode === 'add' ? '添加' : '保存'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
