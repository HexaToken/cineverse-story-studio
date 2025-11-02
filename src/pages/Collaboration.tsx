import React, { useState } from 'react';
import { Users, Plus, MessageSquare, CheckCircle, Clock, Mail } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  CosmoSection,
  CosmoContainer,
  CosmoHeading,
  CosmoGrid,
  CosmoButton,
  CosmoCard,
  CosmoCardBody,
  CosmoCardTitle,
  CollaboratorsList,
  CosmoBadge,
  CosmoText,
} from '@/components/lib';
import { useCollaboration } from '@/context';

const Collaboration = () => {
  const { projects, comments, isLoading, addCollaborator, addComment } = useCollaboration();
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [commentText, setCommentText] = useState('');

  const activeCollaborators = selectedProject?.collaborators.filter(c => c.status === 'active') || [];
  const invitedCollaborators = selectedProject?.collaborators.filter(c => c.status === 'invited') || [];

  const handleAddComment = async () => {
    if (commentText.trim() && selectedProject) {
      await addComment(selectedProject.id, commentText);
      setCommentText('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0b1a] to-[#10182e]">
      <Header />

      {/* Hero Banner */}
      <CosmoSection className="border-b border-white/10">
        <CosmoContainer>
          <div className="space-y-6">
            <div>
              <CosmoHeading size="2xl" level="h1" gradient>
                Team Collaboration
              </CosmoHeading>
              <p className="text-white/60 text-lg mt-2">
                Work together with your team to create amazing universes
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-[#00eaff] mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Active Projects</span>
                </div>
                <p className="font-display text-3xl font-bold text-white">{projects.length}</p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-[#a24df6] mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Team Members</span>
                </div>
                <p className="font-display text-3xl font-bold text-white">
                  {selectedProject?.collaborators.length || 0}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-[#ff006e] mb-1">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">Comments</span>
                </div>
                <p className="font-display text-3xl font-bold text-white">{comments.length}</p>
              </div>
            </div>
          </div>
        </CosmoContainer>
      </CosmoSection>

      {/* Main Content */}
      <CosmoSection>
        <CosmoContainer>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Projects */}
            <div>
              <CosmoCard variant="subtle">
                <CosmoCardBody className="space-y-4">
                  <div className="flex items-center justify-between">
                    <CosmoCardTitle size="sm">Projects</CosmoCardTitle>
                    <CosmoButton cosmicVariant="ghost" size="sm">
                      <Plus className="w-4 h-4" />
                    </CosmoButton>
                  </div>

                  <div className="space-y-2">
                    {projects.map(project => (
                      <button
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          selectedProject?.id === project.id
                            ? 'bg-gradient-to-r from-[#00eaff]/20 to-[#a24df6]/20 border border-[#00eaff]/40'
                            : 'bg-white/5 border border-white/10 hover:border-[#00eaff]/20'
                        }`}
                      >
                        <p className="font-semibold text-white text-sm truncate">
                          {project.title}
                        </p>
                        <p className="text-xs text-white/50">
                          {project.collaborators.length} members
                        </p>
                      </button>
                    ))}
                  </div>
                </CosmoCardBody>
              </CosmoCard>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {selectedProject ? (
                <>
                  {/* Project Info */}
                  <CosmoCard variant="interactive">
                    <CosmoCardBody className="space-y-3">
                      <CosmoCardTitle>{selectedProject.title}</CosmoCardTitle>
                      <CosmoText variant="body">{selectedProject.description}</CosmoText>
                      <div className="flex items-center gap-2 pt-2">
                        <CosmoBadge variant="cyan">
                          Owner: {selectedProject.owner.username}
                        </CosmoBadge>
                      </div>
                    </CosmoCardBody>
                  </CosmoCard>

                  {/* Team Members */}
                  <CollaboratorsList
                    collaborators={selectedProject.collaborators}
                    editable={true}
                  />

                  {/* Comments Section */}
                  <CosmoCard variant="default">
                    <CosmoCardBody className="space-y-4">
                      <CosmoCardTitle size="sm">Team Comments</CosmoCardTitle>

                      {/* Comment Input */}
                      <div className="space-y-2">
                        <textarea
                          value={commentText}
                          onChange={e => setCommentText(e.target.value)}
                          placeholder="Share your thoughts with the team..."
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#00eaff]/40 focus:ring-1 focus:ring-[#00eaff]/20 resize-none"
                          rows={3}
                        />
                        <div className="flex justify-end">
                          <CosmoButton
                            cosmicVariant="primary"
                            size="sm"
                            onClick={handleAddComment}
                            disabled={!commentText.trim()}
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Post Comment
                          </CosmoButton>
                        </div>
                      </div>

                      {/* Comments List */}
                      <div className="space-y-3 mt-6 pt-6 border-t border-white/10">
                        {comments.length === 0 ? (
                          <p className="text-white/50 text-sm text-center py-4">
                            No comments yet. Be the first to share!
                          </p>
                        ) : (
                          comments.map(comment => (
                            <div key={comment.id} className="p-3 rounded-lg bg-white/5 border border-white/10">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <p className="font-semibold text-white text-sm">
                                    {comment.username}
                                  </p>
                                  <p className="text-xs text-white/50">
                                    {new Date(comment.timestamp).toLocaleDateString()}
                                  </p>
                                </div>
                                {comment.resolved && (
                                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                )}
                              </div>
                              <p className="text-white/80 text-sm">{comment.content}</p>
                            </div>
                          ))
                        )}
                      </div>
                    </CosmoCardBody>
                  </CosmoCard>
                </>
              ) : (
                <CosmoCard variant="subtle" className="text-center py-12">
                  <CosmoCardBody>
                    <Users className="w-12 h-12 text-white/30 mx-auto mb-4" />
                    <p className="text-white/60">No projects yet. Create one to get started!</p>
                  </CosmoCardBody>
                </CosmoCard>
              )}
            </div>
          </div>
        </CosmoContainer>
      </CosmoSection>

      <Footer />
    </div>
  );
};

export default Collaboration;
