import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { mapResumeDtoToEditorState } from "@/services/resume-parser/mapper";

const BouncingDotsLoader = () => (
    <div className="flex justify-center items-center space-x-2">
      <div className="w-4 h-4 bg-violet-700 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-4 h-4 bg-violet-700 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-4 h-4 bg-violet-700 rounded-full animate-bounce"></div>
    </div>
  );

const PDFUploader: React.FC = () => {
  const [isParsing, setIsParsing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      console.log('File uploaded:', file.name);
      setIsParsing(true);

      try {
        const response = await fetch('/api/resume/parse', {
          method: 'POST',
          headers: {
            'Content-Type': file.type,
          },
          body: file,
        });

        if (!response.ok) {
          throw new Error('Failed to parse CV');
        }

        const result = await response.json();
        mapResumeDtoToEditorState(result);
        alert('CV parsed successfully!');
      } catch (error) {
        console.error('Error parsing CV:', error);
        alert('An error occurred while parsing the CV.');
      } finally {
        setIsParsing(false);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer mb-4 transition-colors ${
        isDragActive ? 'border-violet-500 bg-violet-50' : 'border-gray-300'
      }`}
    >
      <input {...getInputProps()} />
      {
        isParsing ? (
          <div className="flex flex-col items-center justify-center">
            <BouncingDotsLoader />
            <p className="text-lg font-semibold mt-4">Parsing your resume...</p>
            <p className="text-sm text-gray-500">This might take a moment.</p>
          </div>
        ) : isDragActive ? (
          <p className="text-lg font-semibold text-violet-700">Drop the PDF here ...</p>
        ) : (
          <div>
            <p className="text-lg font-semibold">Drag & drop your resume here</p>
            <p className="text-sm text-gray-500">or click to select a PDF file</p>
          </div>
        )
      }
    </div>
  );
};

export default PDFUploader;
