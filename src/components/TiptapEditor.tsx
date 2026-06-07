// src/components/TiptapEditor.tsx
"use client";

import { useEffect, type ReactNode } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Pilcrow,
} from "lucide-react";
import DOMPurify from "dompurify";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TiptapEditorProps {
  value: string;
  onChange: (html: string) => void;
}

export default function TiptapEditor({ value, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Image,
      Link.configure({ openOnClick: false }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      const clean = DOMPurify.sanitize(editor.getHTML());
      onChange(clean);
    },
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "blog-content min-h-[320px] max-w-none p-4 focus:outline-none",
      },
    },
  });

  // Keep the editor in sync with externally provided content (e.g. when the
  // blog data loads asynchronously in the edit form). Skip while the user is
  // typing so we never clobber their cursor.
  useEffect(() => {
    if (!editor || editor.isFocused) return;
    const next = value || "";
    if (next !== editor.getHTML()) {
      editor.commands.setContent(next, { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Image URL:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const setLink = () => {
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL:", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border/60 bg-background">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-border/60 bg-muted/30 p-1.5">
        <ToolbarButton
          label="Heading 1"
          active={editor.isActive("heading", { level: 1 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Heading 2"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Heading 3"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Paragraph"
          active={editor.isActive("paragraph")}
          onClick={() => editor.chain().focus().setParagraph().run()}
        >
          <Pilcrow className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          label="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          label="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Numbered list"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>

        <Divider />

        <ToolbarButton label="Link" active={editor.isActive("link")} onClick={setLink}>
          <Link2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Image" active={false} onClick={addImage}>
          <ImageIcon className="h-4 w-4" />
        </ToolbarButton>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}

function ToolbarButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <Button
      type="button"
      size="icon"
      variant={active ? "default" : "ghost"}
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={cn("h-8 w-8", !active && "text-muted-foreground hover:text-foreground")}
    >
      {children}
    </Button>
  );
}

function Divider() {
  return <span className="mx-0.5 h-5 w-px bg-border" aria-hidden />;
}

// Re-exported for type convenience if needed elsewhere.
export type { Editor };
