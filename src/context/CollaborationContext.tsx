import React, { createContext, useContext, useState, useCallback } from 'react';

export type PermissionLevel = 'view' | 'comment' | 'edit' | 'admin';

export interface Collaborator {
  id: string;
  userId: string;
  username: string;
  email: string;
  avatar?: string;
  role: PermissionLevel;
  joinedAt: string;
  status: 'active' | 'invited' | 'declined';
}

export interface CollaborationProject {
  id: string;
  universeId: string;
  title: string;
  description: string;
  owner: Collaborator;
  collaborators: Collaborator[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  projectId: string;
  userId: string;
  username: string;
  avatar?: string;
  content: string;
  timestamp: string;
  resolved: boolean;
  replies: Comment[];
}

export interface CollaborationContextType {
  projects: CollaborationProject[];
  currentProject: CollaborationProject | null;
  comments: Comment[];
  isLoading: boolean;
  createProject: (data: Omit<CollaborationProject, 'id' | 'createdAt' | 'updatedAt'>) => Promise<CollaborationProject>;
  addCollaborator: (projectId: string, email: string, role: PermissionLevel) => Promise<void>;
  removeCollaborator: (projectId: string, userId: string) => Promise<void>;
  updatePermission: (projectId: string, userId: string, role: PermissionLevel) => Promise<void>;
  addComment: (projectId: string, content: string) => Promise<void>;
  resolveComment: (projectId: string, commentId: string) => Promise<void>;
  fetchProjectCollaborators: (projectId: string) => Promise<void>;
  setCurrentProject: (project: CollaborationProject | null) => void;
}

const CollaborationContext = createContext<CollaborationContextType | undefined>(undefined);

export const CollaborationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<CollaborationProject[]>([]);
  const [currentProject, setCurrentProject] = useState<CollaborationProject | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const createProject = useCallback(
    async (data: Omit<CollaborationProject, 'id' | 'createdAt' | 'updatedAt'>): Promise<CollaborationProject> => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));

        const newProject: CollaborationProject = {
          ...data,
          id: `collab_${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setProjects(prev => [newProject, ...prev]);
        return newProject;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const addCollaborator = useCallback(
    async (projectId: string, email: string, role: PermissionLevel) => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 300));

        const newCollaborator: Collaborator = {
          id: `user_${Date.now()}`,
          userId: `user_${Date.now()}`,
          username: email.split('@')[0],
          email,
          role,
          joinedAt: new Date().toISOString(),
          status: 'invited',
        };

        setProjects(prev =>
          prev.map(p =>
            p.id === projectId
              ? { ...p, collaborators: [...p.collaborators, newCollaborator] }
              : p
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const removeCollaborator = useCallback(async (projectId: string, userId: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      setProjects(prev =>
        prev.map(p =>
          p.id === projectId
            ? { ...p, collaborators: p.collaborators.filter(c => c.userId !== userId) }
            : p
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePermission = useCallback(async (projectId: string, userId: string, role: PermissionLevel) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));

      setProjects(prev =>
        prev.map(p =>
          p.id === projectId
            ? {
              ...p,
              collaborators: p.collaborators.map(c =>
                c.userId === userId ? { ...c, role } : c
              ),
            }
            : p
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addComment = useCallback(async (projectId: string, content: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 200));

      const newComment: Comment = {
        id: `comment_${Date.now()}`,
        projectId,
        userId: 'current_user_id',
        username: 'Current User',
        content,
        timestamp: new Date().toISOString(),
        resolved: false,
        replies: [],
      };

      setComments(prev => [newComment, ...prev]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resolveComment = useCallback(async (projectId: string, commentId: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 200));

      setComments(prev =>
        prev.map(c =>
          c.id === commentId ? { ...c, resolved: true } : c
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchProjectCollaborators = useCallback(async (projectId: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      // Fetch collaborators for the project
      // In production, this would be an API call
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <CollaborationContext.Provider
      value={{
        projects,
        currentProject,
        comments,
        isLoading,
        createProject,
        addCollaborator,
        removeCollaborator,
        updatePermission,
        addComment,
        resolveComment,
        fetchProjectCollaborators,
        setCurrentProject,
      }}
    >
      {children}
    </CollaborationContext.Provider>
  );
};

export const useCollaboration = () => {
  const context = useContext(CollaborationContext);
  if (context === undefined) {
    throw new Error('useCollaboration must be used within a CollaborationProvider');
  }
  return context;
};
