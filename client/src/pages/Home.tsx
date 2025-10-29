import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, Edit, Filter } from 'lucide-react'

const STATUS_COLUMNS = [
  { id: 'recebidos', title: 'Recebidos', color: 'bg-emerald-500' },
  { id: 'iniciado', title: 'Iniciado', color: 'bg-blue-500' },
  { id: 'em-andamento', title: 'Em Andamento', color: 'bg-yellow-500' },
  { id: 'finalizado', title: 'Finalizado', color: 'bg-green-500' },
  { id: 'enviado-impressao', title: 'Enviado para Impressão', color: 'bg-purple-500' }
]

interface Client {
  id: string
  name: string
}

interface Project {
  id: string
  title: string
  client_id: string
  type: string
  responsible: string
  quantity_photos: number
  status: string
  order_index: number
  created_at: string
}

export default function Home() {
  const [clients, setClients] = useState<Client[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [filterClient, setFilterClient] = useState('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  
  // Form states
  const [newProjectTitle, setNewProjectTitle] = useState('')
  const [newProjectClient, setNewProjectClient] = useState('')
  const [newProjectType, setNewProjectType] = useState('curso')
  const [newProjectResponsible, setNewProjectResponsible] = useState('')
  const [newProjectPhotoCount, setNewProjectPhotoCount] = useState('')
  const [newClientName, setNewClientName] = useState('')

  // Carregar dados do Supabase
  useEffect(() => {
    loadClients()
    loadProjects()

    // Subscribe to real-time updates
    const clientsSubscription = supabase
      .channel('clients')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'clients' }, () => {
        loadClients()
      })
      .subscribe()

    const projectsSubscription = supabase
      .channel('projects')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        loadProjects()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(clientsSubscription)
      supabase.removeChannel(projectsSubscription)
    }
  }, [])

  const loadClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('name', { ascending: true })
      
      if (error) throw error
      setClients(data || [])
    } catch (error) {
      console.error('Erro ao carregar clientes:', error)
    }
  }

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Erro ao carregar projetos:', error)
    }
  }

  const addClient = async () => {
    if (!newClientName.trim()) return
    try {
      const { error } = await supabase
        .from('clients')
        .insert([{ name: newClientName }])
      
      if (error) throw error
      setNewClientName('')
      loadClients()
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error)
    }
  }

  const addProject = async () => {
    if (!newProjectTitle.trim() || !newProjectClient) return
    try {
      const { error } = await supabase
        .from('projects')
        .insert([{
          title: newProjectTitle,
          client_id: newProjectClient,
          type: newProjectType,
          responsible: newProjectResponsible,
          quantity_photos: parseInt(newProjectPhotoCount) || 0,
          status: 'recebidos',
          order_index: Date.now()
        }])
      
      if (error) throw error
      setNewProjectTitle('')
      setNewProjectClient('')
      setNewProjectType('curso')
      setNewProjectResponsible('')
      setNewProjectPhotoCount('')
      setIsAddDialogOpen(false)
      loadProjects()
    } catch (error) {
      console.error('Erro ao adicionar projeto:', error)
    }
  }

  const updateProject = async (projectId: string, updates: Partial<Project>) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', projectId)
      
      if (error) throw error
      setIsEditDialogOpen(false)
      setEditingProject(null)
      loadProjects()
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error)
    }
  }

  const deleteProject = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)
      
      if (error) throw error
      loadProjects()
    } catch (error) {
      console.error('Erro ao deletar projeto:', error)
    }
  }

  const getClientName = (clientId: string) => {
    return clients.find(c => c.id === clientId)?.name || 'Cliente desconhecido'
  }

  const getProjectCountByClient = (clientId: string) => {
    return projects.filter(p => p.client_id === clientId).length
  }

  const sortedClients = [...clients].sort((a, b) => a.name.localeCompare(b.name))

  const displayedClients = filterClient === 'all' ? sortedClients : sortedClients.filter(c => c.id === filterClient)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Gerenciador de Projetos</h1>
          <div className="flex gap-4">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus size={20} />
                  Novo Projeto
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Projeto</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Adicionar Novo Cliente</label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        placeholder="Nome do cliente"
                        value={newClientName}
                        onChange={(e) => setNewClientName(e.target.value)}
                      />
                      <Button onClick={addClient} size="sm">+</Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Título do Projeto</label>
                    <Input
                      placeholder="Nome do curso ou contrato"
                      value={newProjectTitle}
                      onChange={(e) => setNewProjectTitle(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Cliente</label>
                    <Select value={newProjectClient} onValueChange={setNewProjectClient}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Selecione um cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        {sortedClients.map(client => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name} <Badge className="ml-2">{getProjectCountByClient(client.id)}</Badge>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Tipo</label>
                    <Select value={newProjectType} onValueChange={setNewProjectType}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="curso">Curso</SelectItem>
                        <SelectItem value="contrato">Contrato</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Responsável</label>
                    <Input
                      placeholder="Nome do responsável"
                      value={newProjectResponsible}
                      onChange={(e) => setNewProjectResponsible(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Quantidade de Fotos</label>
                    <Input
                      placeholder="Ex: 50"
                      type="number"
                      value={newProjectPhotoCount}
                      onChange={(e) => setNewProjectPhotoCount(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <Button onClick={addProject} className="w-full">Adicionar Projeto</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6 flex gap-2 items-center">
          <Filter size={20} />
          <Select value={filterClient} onValueChange={setFilterClient}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os clientes ({projects.length} projetos)</SelectItem>
              {sortedClients.map(client => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name} ({getProjectCountByClient(client.id)} projetos)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Clients and Projects */}
        {displayedClients.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum projeto cadastrado ainda</p>
            <p className="text-gray-400">Clique em "Novo Projeto" para começar</p>
          </div>
        ) : (
          <div className="space-y-8">
            {displayedClients.map(client => (
              <div key={client.id} className="bg-white rounded-lg shadow p-4">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <span>{client.name}</span>
                  <Badge variant="secondary">{getProjectCountByClient(client.id)} projetos</Badge>
                </h2>

                {/* Status Columns */}
                <div className="grid grid-cols-5 gap-4">
                  {STATUS_COLUMNS.map(column => (
                    <div key={column.id} className="bg-gray-50 rounded-lg p-3">
                      <div className={`${column.color} text-white rounded px-3 py-2 text-sm font-semibold mb-3`}>
                        {column.title}
                      </div>
                      <div className="space-y-2">
                        {projects
                          .filter(p => p.client_id === client.id && p.status === column.id)
                          .map(project => (
                            <Card key={project.id} className="cursor-move hover:shadow-md transition">
                              <CardContent className="p-2">
                                <p className="font-semibold text-sm">{project.title}</p>
                                {project.responsible && (
                                  <p className="text-xs text-gray-600 mt-1">👤 {project.responsible}</p>
                                )}
                                {project.quantity_photos && (
                                  <p className="text-xs text-gray-600">📸 {project.quantity_photos} fotos</p>
                                )}
                                <Badge className="text-xs mt-2">{project.type}</Badge>
                                <div className="flex gap-1 mt-2">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => {
                                      setEditingProject(project)
                                      setIsEditDialogOpen(true)
                                    }}
                                  >
                                    <Edit size={14} />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => deleteProject(project.id)}
                                  >
                                    <Trash2 size={14} />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Editar Projeto</DialogTitle>
            </DialogHeader>
            {editingProject && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Título</label>
                  <Input
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Responsável</label>
                  <Input
                    value={editingProject.responsible}
                    onChange={(e) => setEditingProject({ ...editingProject, responsible: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Quantidade de Fotos</label>
                  <Input
                    type="number"
                    value={editingProject.quantity_photos}
                    onChange={(e) => setEditingProject({ ...editingProject, quantity_photos: parseInt(e.target.value) || 0 })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select value={editingProject.status} onValueChange={(value) => setEditingProject({ ...editingProject, status: value })}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_COLUMNS.map(column => (
                        <SelectItem key={column.id} value={column.id}>{column.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={() => updateProject(editingProject.id, editingProject)}
                  className="w-full"
                >
                  Salvar Alterações
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

