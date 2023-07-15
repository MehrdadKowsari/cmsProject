import React, { useEffect, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
interface CKeditorProps {
  onChange: (data: string) => void;
  editorLoaded: boolean;
  name: string;
  value: string;
}

export default function RichTextEditor({
  onChange,
  editorLoaded,
  name,
  value,
}: CKeditorProps) {
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  return (
    <>
      <Editor
        editorStyle={{ height: '350px' }}
        textAlignment='right'
        editorState={editorState}
        onEditorStateChange={setEditorState}
        />

    </>
  );
}