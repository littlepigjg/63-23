import { useState, useEffect } from 'react';
import { useAppStore } from '@/stores/appStore';
import { useProjects, useConfigs } from '@/hooks';
import PageHeader from '@/components/PageHeader';
import ProjectSelector from '@/components/configs/ProjectSelector';
import EnvSwitcher from '@/components/configs/EnvSwitcher';
import ConfigList from '@/components/configs/ConfigList';
import ConfigForm from '@/components/configs/ConfigForm';
import ProjectForm from '@/components/configs/ProjectForm';
import EnvForm from '@/components/configs/EnvForm';
import ImportExportTools from '@/components/configs/ImportExportTools';
import type { ConfigItem } from '../../shared/types';

const DEFAULT_ENVS = ['development', 'testing', 'production'];

export default function Configs() {
  const { selectedProjectId, setSelectedProjectId, selectedEnv, setSelectedEnv } = useAppStore();
  const { projects, createProject } = useProjects();
  const { configs, addConfig, updateConfig, deleteConfig, loading } = useConfigs({
    projectId: selectedProjectId,
    envName: selectedEnv,
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showEnvModal, setShowEnvModal] = useState(false);
  const [editingConfig, setEditingConfig] = useState<ConfigItem | null>(null);

  const currentProject = projects.find((p) => p.id === selectedProjectId);

  useEffect(() => {
    if (projects.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId, setSelectedProjectId]);

  const handleAddConfig = async (data: {
    key: string;
    value: string;
    description: string;
    encrypted: boolean;
  }) => {
    if (!selectedProjectId || !data.key) return;
    const result = await addConfig(data.key, data.value, data.description, data.encrypted);
    if (result) {
      setShowAddModal(false);
    }
  };

  const handleEditConfig = async (data: {
    key: string;
    value: string;
    description: string;
    encrypted: boolean;
  }) => {
    if (!selectedProjectId || !editingConfig) return;
    const body: Partial<ConfigItem> = {};
    if (data.value !== undefined && data.value !== '') body.value = data.value;
    if (data.description !== undefined) body.description = data.description;
    body.encrypted = data.encrypted;
    const result = await updateConfig(editingConfig.key, body);
    if (result) {
      setShowEditModal(false);
      setEditingConfig(null);
    }
  };

  const handleDeleteConfig = async (key: string) => {
    if (!confirm(`确定删除配置项 "${key}" 吗？`)) return;
    await deleteConfig(key);
  };

  const handleCreateProject = async (name: string, description: string) => {
    if (!name) return;
    const project = await createProject(name, description);
    if (project) {
      setShowProjectModal(false);
      setSelectedProjectId(project.id);
    }
  };

  const handleAddEnv = async (name: string) => {
    if (!selectedProjectId || !name) return;
    const result = await addConfig('_init', '', 'Environment initializer', false);
    if (result) {
      setShowEnvModal(false);
      setSelectedEnv(name);
    }
  };

  const handleExport = () => {
    const data = JSON.stringify(configs, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentProject?.name || 'config'}_${selectedEnv}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file || !selectedProjectId) return;
      const text = await file.text();
      try {
        const items = JSON.parse(text);
        if (Array.isArray(items)) {
          for (const item of items) {
            await addConfig(item.key, item.value || '', item.description || '', false);
          }
        }
      } catch {
        alert('导入失败：无效的JSON文件');
      }
    };
    input.click();
  };

  const openEditModal = (config: ConfigItem) => {
    setEditingConfig(config);
    setShowEditModal(true);
  };

  const projectEnvs = currentProject?.environments.map((e) => e.name) || [];
  const allEnvs = [...new Set([...DEFAULT_ENVS, ...projectEnvs])];

  return (
    <div className="animate-slide-in">
      <PageHeader
        title="配置管理"
        subtitle="按项目和环境管理配置项"
        actions={
          <ImportExportTools
            configs={configs}
            currentProject={currentProject}
            selectedEnv={selectedEnv}
            onExport={handleExport}
            onImport={handleImport}
            onNewProject={() => setShowProjectModal(true)}
            onAddConfig={() => setShowAddModal(true)}
          />
        }
      />

      <div className="flex items-center gap-4 mb-6">
        <ProjectSelector
          projects={projects}
          selectedProjectId={selectedProjectId}
          onSelectProject={setSelectedProjectId}
        />
        <EnvSwitcher
          environments={allEnvs}
          selectedEnv={selectedEnv}
          onSelectEnv={setSelectedEnv}
          onAddEnv={() => setShowEnvModal(true)}
        />
      </div>

      <ConfigList
        configs={configs}
        loading={loading}
        selectedProjectId={selectedProjectId}
        onEdit={openEditModal}
        onDelete={handleDeleteConfig}
      />

      <ConfigForm
        mode="add"
        open={showAddModal}
        editingConfig={null}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddConfig}
      />

      <ConfigForm
        mode="edit"
        open={showEditModal}
        editingConfig={editingConfig}
        onClose={() => {
          setShowEditModal(false);
          setEditingConfig(null);
        }}
        onSubmit={handleEditConfig}
      />

      <ProjectForm
        open={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        onSubmit={handleCreateProject}
      />

      <EnvForm
        open={showEnvModal}
        onClose={() => setShowEnvModal(false)}
        onSubmit={handleAddEnv}
      />
    </div>
  );
}
