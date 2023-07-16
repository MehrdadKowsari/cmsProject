import React, { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useRouter } from "next/router";
import ApplicationParams from "src/constants/applicationParams";
import localizationService from "src/services/shared/localizationService";

interface CKeditorProps {
  onChange: (data: string) => void;
  editorLoaded: boolean;
  name: string;
  value: string | null;
  locale: string
}

export default function CKeditor({
  onChange,
  editorLoaded,
  name,
  locale,
  value,
}: CKeditorProps) {
  const router = useRouter();
  const editorRef = useRef<{ CKEditor: typeof CKEditor; ClassicEditor: typeof ClassicEditor }>();
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
  }, []);
  return (
    <>
      
        <CKEditor
          editor={ClassicEditor}
          data={value}
          onChange={(event: any, editor: any) => {
            const data = editor.getData();
            onChange(data);
          }}
          config={{
           language: locale,           
          }}
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            // console.log("Editor is ready to use!", editor);
            editor.editing.view.change((writer) => {
            writer.setStyle(
                "height",
                "200px",
                editor.editing.view.document.getRoot()!
            );
            });
        }}
        />
      
    </>
  );
}
