"use client";

import React, { FC } from "react";
import styles from "@/assets/styles/components/texteditor.module.scss"
import dynamic from "next/dynamic";
import { Loader } from "..";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false, loading: () => <Loader /> });

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

interface ITextEditor {
    placeholder?: string,
    value: string,
    onChange: () => void;
}

const TextEditor: FC<ITextEditor> = ({
    onChange,
    placeholder,
    value
}) => {
  return (
    <ReactQuill 
        className={styles['text-editor']}
        placeholder={placeholder}
        modules={modules}
        value={value}
        onChange={onChange}
        theme="snow"
    />
  );
};

export default TextEditor;
