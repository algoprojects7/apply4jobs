import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo
} from 'lucide-react';

interface JobDescriptionEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const buttonStyle = (isActive: boolean) => ({
    padding: '6px',
    background: isActive ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
    border: 'none',
    borderRadius: '4px',
    color: isActive ? '#0f172a' : '#64748b',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s'
  });

  return (
    <div style={{
      display: 'flex',
      gap: '4px',
      padding: '8px',
      borderBottom: '1px solid #d0d7de',
      background: '#f6f8fa',
      flexWrap: 'wrap'
    }}>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        style={buttonStyle(editor.isActive('bold'))}
        title="Bold"
      >
        <Bold size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        style={buttonStyle(editor.isActive('italic'))}
        title="Italic"
      >
        <Italic size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        style={buttonStyle(editor.isActive('underline'))}
        title="Underline"
      >
        <UnderlineIcon size={16} />
      </button>
      
      <div style={{ width: '1px', height: '24px', background: '#d0d7de', margin: '0 4px', alignSelf: 'center' }} />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        style={buttonStyle(editor.isActive('heading', { level: 1 }))}
        title="Heading 1"
      >
        <Heading1 size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        style={buttonStyle(editor.isActive('heading', { level: 2 }))}
        title="Heading 2"
      >
        <Heading2 size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        style={buttonStyle(editor.isActive('heading', { level: 3 }))}
        title="Heading 3"
      >
        <Heading3 size={16} />
      </button>

      <div style={{ width: '1px', height: '24px', background: '#d0d7de', margin: '0 4px', alignSelf: 'center' }} />

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        style={buttonStyle(editor.isActive('bulletList'))}
        title="Bullet List"
      >
        <List size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        style={buttonStyle(editor.isActive('orderedList'))}
        title="Numbered List"
      >
        <ListOrdered size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        style={buttonStyle(editor.isActive('blockquote'))}
        title="Blockquote"
      >
        <Quote size={16} />
      </button>

      <div style={{ width: '1px', height: '24px', background: '#d0d7de', margin: '0 4px', alignSelf: 'center' }} />

      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        style={buttonStyle(false)}
        title="Undo"
      >
        <Undo size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        style={buttonStyle(false)}
        title="Redo"
      >
        <Redo size={16} />
      </button>
    </div>
  );
};

export const JobDescriptionEditor: React.FC<JobDescriptionEditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base focus:outline-none max-w-none',
        style: 'min-height: 200px; padding: 16px; color: #000;'
      }
    }
  });

  React.useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div style={{
      border: '1px solid #d0d7de',
      borderRadius: '6px',
      background: '#ffffff',
      overflow: 'hidden'
    }}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      
      <style dangerouslySetInnerHTML={{__html: `
        .ProseMirror p { margin-top: 0.5em; margin-bottom: 0.5em; }
        .ProseMirror h1 { font-size: 1.8em; font-weight: bold; margin-top: 1em; margin-bottom: 0.5em; }
        .ProseMirror h2 { font-size: 1.5em; font-weight: bold; margin-top: 1em; margin-bottom: 0.5em; }
        .ProseMirror h3 { font-size: 1.2em; font-weight: bold; margin-top: 1em; margin-bottom: 0.5em; }
        .ProseMirror ul { list-style-type: disc; padding-left: 20px; margin-top: 0.5em; margin-bottom: 0.5em; }
        .ProseMirror ol { list-style-type: decimal; padding-left: 20px; margin-top: 0.5em; margin-bottom: 0.5em; }
        .ProseMirror blockquote { border-left: 3px solid #d0d7de; padding-left: 10px; margin-left: 0; color: #64748b; font-style: italic; }
      `}} />
    </div>
  );
};
