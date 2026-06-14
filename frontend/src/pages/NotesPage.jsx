import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import PageTransition from '../components/layout/PageTransition';
import GlassCard from '../components/ui/GlassCard';
import { 
  FileEdit, 
  Plus, 
  Trash2, 
  Save, 
  Tag, 
  FileText,
  Clock,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

const NotesPage = () => {
  const { refreshUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const data = await api.get('/notes');
        setNotes(data);
        if (data.length > 0) {
          selectNote(data[0]);
        }
      } catch (err) {
        console.error('Failed to load notes:', err);
        setError('Could not fetch notes from server.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const selectNote = (note) => {
    setSelectedNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditTags(note.tags ? note.tags.join(', ') : '');
    setIsEditing(false);
  };

  const handleCreateNew = () => {
    const newNoteTemplate = {
      _id: 'temp-' + Date.now(),
      title: 'Untitled Note',
      content: 'Start writing your study notes here...',
      tags: ['Study'],
      createdAt: new Date().toISOString()
    };
    setSelectedNote(newNoteTemplate);
    setEditTitle(newNoteTemplate.title);
    setEditContent(newNoteTemplate.content);
    setEditTags('Study');
    setIsEditing(true);
  };

  const handleSaveNote = async () => {
    if (!editTitle.trim()) {
      setError('Title cannot be empty');
      return;
    }

    const tagsArr = editTags
      ? editTags.split(',').map(t => t.trim()).filter(t => t !== '')
      : [];

    try {
      setError('');
      if (selectedNote._id.startsWith('temp-')) {
        // Create new note
        const created = await api.post('/notes', {
          title: editTitle,
          content: editContent,
          tags: tagsArr
        });
        setNotes([created, ...notes]);
        setSelectedNote(created);
        await refreshUser(); // refresh badges (e.g. Write First Note badge)
      } else {
        // Update existing note
        const updated = await api.put(`/notes/${selectedNote._id}`, {
          title: editTitle,
          content: editContent,
          tags: tagsArr
        });
        setNotes(notes.map(n => n._id === selectedNote._id ? updated : n));
        setSelectedNote(updated);
      }
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to save note:', err);
      setError('Error saving note.');
    }
  };

  const handleDeleteNote = async () => {
    if (!selectedNote || selectedNote._id.startsWith('temp-')) {
      setSelectedNote(notes.length > 0 ? notes[0] : null);
      setIsEditing(false);
      return;
    }

    try {
      setError('');
      await api.delete(`/notes/${selectedNote._id}`);
      const remaining = notes.filter(n => n._id !== selectedNote._id);
      setNotes(remaining);
      if (remaining.length > 0) {
        selectNote(remaining[0]);
      } else {
        setSelectedNote(null);
        setEditTitle('');
        setEditContent('');
        setEditTags('');
        setIsEditing(false);
      }
    } catch (err) {
      console.error('Failed to delete note:', err);
      setError('Error deleting note.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="w-10 h-10 border-4 border-brand-pink border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto pb-10 space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-extrabold flex items-center space-x-3">
              <FileEdit className="w-8 h-8 text-brand-pink" />
              <span>Personal Study Notes</span>
            </h2>
            <p className="text-sm text-dark-textMuted mt-1">
              Organize code snippets, theory summaries, and exam preparation in one Notion-like space.
            </p>
          </div>
          <button
            onClick={handleCreateNew}
            className="px-4 py-2.5 rounded-xl bg-brand-pink hover:bg-brand-pink/90 text-xs font-bold text-white flex items-center space-x-1.5 transition-all duration-150"
          >
            <Plus className="w-4.5 h-4.5" />
            <span>Create Note</span>
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center space-x-2 text-red-400 text-xs">
            <AlertTriangle className="w-4.5 h-4.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Master-Detail Note Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[500px]">
          
          {/* Left Column: Notes List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-dark-textMuted uppercase tracking-wider px-1">Notes Folder</h3>
            
            {notes.length === 0 && !selectedNote ? (
              <div className="text-center py-10 border border-dashed border-dark-border rounded-2xl p-6">
                <FileText className="w-10 h-10 text-dark-textMuted mx-auto opacity-30" />
                <p className="text-xs text-dark-textMuted mt-3">No notes created yet. Click "Create Note" above to write your first study card!</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                {notes.map((note) => {
                  const isSelected = selectedNote && selectedNote._id === note._id;
                  return (
                    <div
                      key={note._id}
                      onClick={() => selectNote(note)}
                      className={`
                        p-4 rounded-xl border text-left cursor-pointer transition-all duration-150
                        ${isSelected 
                          ? 'bg-dark-card border-brand-pink text-white shadow' 
                          : 'bg-dark-card/30 border-dark-border/60 text-dark-textMuted hover:border-dark-border hover:bg-dark-card/40'
                        }
                      `}
                    >
                      <h4 className={`font-bold text-xs truncate ${isSelected ? 'text-brand-pink' : 'text-white'}`}>
                        {note.title}
                      </h4>
                      <p className="text-[10px] text-dark-textMuted mt-1.5 line-clamp-1">
                        {note.content}
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {note.tags?.map((tag, tIdx) => (
                          <span key={tIdx} className="text-[9px] bg-dark-bg/85 border border-dark-border px-1.5 py-0.5 rounded text-dark-textMuted font-bold">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Note Editor / Viewer */}
          <div className="md:col-span-2">
            {selectedNote ? (
              <GlassCard hover={false} className="h-full flex flex-col justify-between space-y-6">
                
                {/* Mode: Editing */}
                {isEditing ? (
                  <div className="space-y-4 flex-1 flex flex-col">
                    {/* Title input */}
                    <div>
                      <label className="block text-[10px] font-extrabold text-dark-textMuted uppercase tracking-wide mb-1.5">Note Title</label>
                      <input 
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="E.g., CSS Box Model Summary"
                        className="w-full px-4 py-2.5 rounded-xl glass-input font-bold text-sm"
                      />
                    </div>

                    {/* Tags input */}
                    <div>
                      <label className="block text-[10px] font-extrabold text-dark-textMuted uppercase tracking-wide mb-1.5">Tags (Comma-separated)</label>
                      <div className="relative">
                        <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-textMuted" />
                        <input 
                          type="text"
                          value={editTags}
                          onChange={(e) => setEditTags(e.target.value)}
                          placeholder="WebDev, CSS, Basics"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs"
                        />
                      </div>
                    </div>

                    {/* Content text area */}
                    <div className="flex-1 flex flex-col">
                      <label className="block text-[10px] font-extrabold text-dark-textMuted uppercase tracking-wide mb-1.5">Content Summary</label>
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        placeholder="Write note notes, tips, lists, or code snippets..."
                        className="w-full flex-1 p-4 rounded-xl glass-input text-xs font-mono min-h-[200px] resize-none"
                      />
                    </div>
                  </div>
                ) : (
                  // Mode: Viewing
                  <div className="space-y-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-extrabold text-white">{selectedNote.title}</h3>
                        <p className="text-[9px] text-dark-textMuted flex items-center mt-1">
                          <Clock className="w-3.5 h-3.5 mr-1" />
                          <span>Last updated: {new Date(selectedNote.updatedAt || selectedNote.createdAt).toLocaleString()}</span>
                        </p>
                      </div>
                    </div>

                    {/* Tags */}
                    {selectedNote.tags && selectedNote.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {selectedNote.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="text-[10px] bg-brand-pink/10 border border-brand-pink/20 text-brand-pink px-2 py-0.5 rounded-full font-bold">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Note Content display */}
                    <div className="pt-4 border-t border-dark-border/40">
                      <p className="text-xs text-dark-text leading-relaxed whitespace-pre-wrap font-sans">
                        {selectedNote.content}
                      </p>
                    </div>
                  </div>
                )}

                {/* Editor Actions Footer */}
                <div className="pt-4 border-t border-dark-border/40 flex justify-between items-center">
                  <button
                    onClick={handleDeleteNote}
                    className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 text-xs font-bold flex items-center space-x-1.5 transition-all duration-150"
                  >
                    <Trash2 className="w-4 h-4 shrink-0" />
                    <span>Delete</span>
                  </button>

                  <div className="flex space-x-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => {
                            if (selectedNote._id.startsWith('temp-')) {
                              setSelectedNote(notes.length > 0 ? notes[0] : null);
                            }
                            setIsEditing(false);
                            setError('');
                          }}
                          className="px-4 py-2.5 rounded-xl bg-dark-card border border-dark-border hover:bg-dark-card/85 text-xs font-bold text-white transition-all duration-150"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveNote}
                          className="px-4 py-2.5 rounded-xl bg-brand-pink hover:bg-brand-pink/90 text-xs font-bold text-white flex items-center space-x-1.5 transition-all duration-150 shadow"
                        >
                          <Save className="w-4 h-4 shrink-0" />
                          <span>Save Note</span>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-5 py-2.5 rounded-xl bg-brand-pink hover:bg-brand-pink/90 text-xs font-bold text-white flex items-center space-x-1.5 transition-all duration-150 shadow"
                      >
                        <FileEdit className="w-4 h-4 shrink-0" />
                        <span>Edit Note</span>
                      </button>
                    )}
                  </div>
                </div>

              </GlassCard>
            ) : (
              <div className="h-full border border-dashed border-dark-border rounded-2xl flex flex-col justify-center items-center p-8 text-center text-dark-textMuted bg-dark-card/10">
                <Sparkles className="w-12 h-12 text-dark-textMuted opacity-30 animate-pulse" />
                <h4 className="font-bold text-sm text-white mt-4">Select or Create a Note</h4>
                <p className="text-xs text-dark-textMuted mt-1 max-w-sm">Use the left menu or click 'Create Note' to begin summarizing topics.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </PageTransition>
  );
};

export default NotesPage;
