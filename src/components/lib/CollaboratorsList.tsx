import React from 'react';
import { X, CheckCircle2, Clock } from 'lucide-react';
import { CosmoCard, CosmoCardBody } from './CosmoCard';
import { CosmoBadge } from './CosmoBadge';
import { CosmoIconButton } from './CosmoIconButton';

interface Collaborator {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: 'view' | 'comment' | 'edit' | 'admin';
  status: 'active' | 'invited' | 'declined';
  joinedAt: string;
}

interface CollaboratorsListProps {
  collaborators: Collaborator[];
  onRemove?: (id: string) => void;
  onChangeRole?: (id: string, role: 'view' | 'comment' | 'edit' | 'admin') => void;
  editable?: boolean;
}

const roleColors = {
  view: 'cyan',
  comment: 'purple',
  edit: 'purple',
  admin: 'pink',
} as const;

const roleLabels = {
  view: 'Viewer',
  comment: 'Commenter',
  edit: 'Editor',
  admin: 'Admin',
} as const;

const CollaboratorsList = React.forwardRef<HTMLDivElement, CollaboratorsListProps>(
  (
    {
      collaborators,
      onRemove,
      onChangeRole,
      editable = false,
    },
    ref,
  ) => {
    return (
      <CosmoCard ref={ref} variant="default">
        <CosmoCardBody className="space-y-3">
          <h3 className="font-display text-lg font-bold text-white mb-4">Team Members</h3>

          {collaborators.length === 0 ? (
            <p className="text-white/50 text-sm py-4 text-center">No collaborators yet</p>
          ) : (
            <div className="space-y-3">
              {collaborators.map(collaborator => (
                <div
                  key={collaborator.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#00eaff]/20 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00eaff] to-[#a24df6] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">
                        {collaborator.username[0].toUpperCase()}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-white text-sm truncate">
                          {collaborator.username}
                        </p>
                        {collaborator.status === 'active' ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                        ) : collaborator.status === 'invited' ? (
                          <Clock className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                        ) : null}
                      </div>
                      <p className="text-xs text-white/50 truncate">{collaborator.email}</p>
                    </div>
                  </div>

                  {/* Role & Actions */}
                  <div className="flex items-center gap-2 ml-2">
                    <CosmoBadge
                      variant={roleColors[collaborator.role]}
                      size="sm"
                    >
                      {roleLabels[collaborator.role]}
                    </CosmoBadge>

                    {editable && (
                      <CosmoIconButton
                        variant="subtle"
                        size="sm"
                        onClick={() => onRemove?.(collaborator.id)}
                        title="Remove collaborator"
                      >
                        <X className="w-4 h-4" />
                      </CosmoIconButton>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CosmoCardBody>
      </CosmoCard>
    );
  },
);

CollaboratorsList.displayName = 'CollaboratorsList';

export { CollaboratorsList };
export type { CollaboratorsListProps, Collaborator };
