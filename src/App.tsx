import React, { useState, useMemo } from 'react';
import { TeachTokVideo, SubjectFilter, TeacherComment } from './types';
import { INITIAL_VIDEOS } from './data/mockVideos';
import { Navbar } from './components/Navbar';
import { VideoFeed } from './components/VideoFeed';
import { InteractiveResourceModal } from './components/InteractiveResourceModal';
import { CommentsModal } from './components/CommentsModal';
import { AIPedagogyModal } from './components/AIPedagogyModal';
import { CreateVideoModal } from './components/CreateVideoModal';
import { LessonBinderModal } from './components/LessonBinderModal';
import { RemixModal } from './components/RemixModal';
import { AboutModal } from './components/AboutModal';
import { useAuth } from './auth/AuthContext';

export const App: React.FC = () => {
  const { user, logout, can } = useAuth();
  const [videos, setVideos] = useState<TeachTokVideo[]>(INITIAL_VIDEOS);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<SubjectFilter>('all');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [isMuted, setIsMuted] = useState(false);

  // Saved / Bookmarks
  const [savedVideoIds, setSavedVideoIds] = useState<Set<string>>(new Set(['vid-zombie-passive']));
  const [savedNotes, setSavedNotes] = useState<Array<{ id: string; title: string; content: string; date: string }>>([
    {
      id: 'note-welcome',
      title: 'Teaching Tip: Zombie Rule Quick Anchor',
      content: 'Remind 8th graders that passive voice is intentional in lab reports ("The solution was heated to 100°C") to keep scientific objectivity.',
      date: 'Today',
    },
  ]);

  // Modals state
  const [activeResourceVideo, setActiveResourceVideo] = useState<TeachTokVideo | null>(null);
  const [activeCommentsVideo, setActiveCommentsVideo] = useState<TeachTokVideo | null>(null);
  const [activeAIVideo, setActiveAIVideo] = useState<TeachTokVideo | null>(null);
  const [activeRemixVideo, setActiveRemixVideo] = useState<TeachTokVideo | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isBinderOpen, setIsBinderOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Filtered videos
  const filteredVideos = useMemo(() => {
    return videos.filter((v) => {
      // Subject filter
      if (selectedSubject !== 'all' && v.subject !== selectedSubject) return false;

      // Grade filter
      if (selectedGrade !== 'all' && v.gradeBand !== selectedGrade) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = v.title.toLowerCase().includes(q);
        const matchConcept = v.concept.toLowerCase().includes(q);
        const matchSubject = v.subject.toLowerCase().includes(q);
        const matchTeacher = v.teacher.name.toLowerCase().includes(q);
        const matchStandard = v.standardCode.toLowerCase().includes(q);
        const matchPedagogy = v.pedagogyTag.toLowerCase().includes(q);
        if (!matchTitle && !matchConcept && !matchSubject && !matchTeacher && !matchStandard && !matchPedagogy) {
          return false;
        }
      }

      return true;
    });
  }, [videos, selectedSubject, selectedGrade, searchQuery]);

  // Ensure current index is within bounds of filtered list
  const safeIndex = useMemo(() => {
    if (currentIndex >= filteredVideos.length) return Math.max(0, filteredVideos.length - 1);
    return currentIndex;
  }, [currentIndex, filteredVideos.length]);

  // Video interaction handlers
  const handleToggleLike = (videoId: string) => {
    setVideos((prev) =>
      prev.map((v) => {
        if (v.id === videoId) {
          const isLiked = !v.isLiked;
          return {
            ...v,
            isLiked,
            likes: isLiked ? v.likes + 1 : v.likes - 1,
          };
        }
        return v;
      })
    );
  };

  const handleToggleBookmark = (videoId: string) => {
    setSavedVideoIds((prev) => {
      const next = new Set(prev);
      if (next.has(videoId)) {
        next.delete(videoId);
      } else {
        next.add(videoId);
      }
      return next;
    });

    setVideos((prev) =>
      prev.map((v) => {
        if (v.id === videoId) {
          const isBookmarked = !v.isBookmarked;
          return {
            ...v,
            isBookmarked,
            bookmarks: isBookmarked ? v.bookmarks + 1 : v.bookmarks - 1,
          };
        }
        return v;
      })
    );
  };

  const handleAddComment = (comment: TeacherComment) => {
    if (!activeCommentsVideo || !can('comment:create')) return;
    setVideos((prev) =>
      prev.map((v) => {
        if (v.id === activeCommentsVideo.id) {
          return {
            ...v,
            comments: [comment, ...v.comments],
          };
        }
        return v;
      })
    );
    // Update local active modal reference
    setActiveCommentsVideo((prev) =>
      prev ? { ...prev, comments: [comment, ...prev.comments] } : null
    );
  };

  const handlePublishNewVideo = (newVideo: TeachTokVideo) => {
    if (!can('video:create')) return;
    setVideos((prev) => [newVideo, ...prev]);
    setCurrentIndex(0);
  };

  const handleSaveToBinder = (title: string, content: string) => {
    const newNote = {
      id: `note-${Date.now()}`,
      title,
      content,
      date: 'Just now',
    };
    setSavedNotes((prev) => [newNote, ...prev]);
  };

  const savedVideosList = useMemo(() => {
    return videos.filter((v) => savedVideoIds.has(v.id));
  }, [videos, savedVideoIds]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedSubject={selectedSubject}
        onSelectSubject={(sub) => { setSelectedSubject(sub); setCurrentIndex(0); }}
        selectedGrade={selectedGrade}
        onSelectGrade={(gr) => { setSelectedGrade(gr); setCurrentIndex(0); }}
        savedCount={savedVideoIds.size + savedNotes.length}
        onOpenBinder={() => setIsBinderOpen(true)}
        onOpenCreate={() => { if (can('video:create')) setIsCreateOpen(true); }}
        userName={user?.displayName}
        userRole={user?.role}
        canCreate={can('video:create')}
        onLogout={logout}
        onOpenAI={() => {
          const current = filteredVideos[safeIndex] || videos[0];
          setActiveAIVideo(current);
        }}
        onOpenAbout={() => setIsAboutOpen(true)}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
      />

      {/* Main App Content: TikTok Video Feed */}
      <main className="flex-1 pt-28 pb-4 px-2 sm:px-4 flex items-center justify-center">
        <VideoFeed
          videos={filteredVideos}
          currentIndex={safeIndex}
          onNavigate={setCurrentIndex}
          onToggleLike={handleToggleLike}
          onToggleBookmark={handleToggleBookmark}
          onOpenResources={(v) => setActiveResourceVideo(v)}
          onOpenComments={(v) => setActiveCommentsVideo(v)}
          onOpenAI={(v) => setActiveAIVideo(v)}
          onOpenRemix={(v) => setActiveRemixVideo(v)}
        />
      </main>

      {/* Modals */}
      {activeResourceVideo && (
        <InteractiveResourceModal
          video={activeResourceVideo}
          isOpen={!!activeResourceVideo}
          onClose={() => setActiveResourceVideo(null)}
          onOpenAIHelper={() => {
            setActiveAIVideo(activeResourceVideo);
            setActiveResourceVideo(null);
          }}
        />
      )}

      {activeCommentsVideo && (
        <CommentsModal
          video={activeCommentsVideo}
          isOpen={!!activeCommentsVideo}
          onClose={() => setActiveCommentsVideo(null)}
          onAddComment={handleAddComment}
          canComment={can('comment:create')}
        />
      )}

      {activeAIVideo && (
        <AIPedagogyModal
          video={activeAIVideo}
          isOpen={!!activeAIVideo}
          onClose={() => setActiveAIVideo(null)}
          onSaveToBinder={handleSaveToBinder}
        />
      )}

      {activeRemixVideo && (
        <RemixModal
          video={activeRemixVideo}
          isOpen={!!activeRemixVideo}
          onClose={() => setActiveRemixVideo(null)}
          onRecordRemix={() => { if (can('video:create')) setIsCreateOpen(true); }}
        />
      )}

      {isCreateOpen && can('video:create') && (
        <CreateVideoModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onPublish={handlePublishNewVideo}
        />
      )}

      {isBinderOpen && (
        <LessonBinderModal
          isOpen={isBinderOpen}
          onClose={() => setIsBinderOpen(false)}
          savedVideos={savedVideosList}
          savedNotes={savedNotes}
          onRemoveBookmark={(id) => handleToggleBookmark(id)}
          onRemoveNote={(id) => setSavedNotes((prev) => prev.filter((n) => n.id !== id))}
          onSelectVideo={(video) => {
            const idx = filteredVideos.findIndex((v) => v.id === video.id);
            if (idx !== -1) setCurrentIndex(idx);
          }}
        />
      )}

      {isAboutOpen && (
        <AboutModal
          isOpen={isAboutOpen}
          onClose={() => setIsAboutOpen(false)}
        />
      )}
    </div>
  );
};
