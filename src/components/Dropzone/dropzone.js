import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

import "./dropzone.css";
function MyDropzone({uploadedFiles,setUploadedFiles}) {


  const onDrop = (acceptedFiles) => {
    setUploadedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    console.log("drop");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDeleteFile = (event, fileToDelete) => {
    event.stopPropagation(); // 이벤트 전파 중지
    setUploadedFiles((prevFiles) => prevFiles.filter((file) => file !== fileToDelete));
  };


  const fileList = uploadedFiles.map((file) => (
    <li key={file.path}>
      <img src={URL.createObjectURL(file)} alt={file.name} width={200} />
      {file.name} - {file.size} bytes{" "}
      <button onClick={(event) => handleDeleteFile(event, file)}>Delete</button>
    </li>
  ));

  return (
    <div className="zone"  {...getRootProps()}>
      <input {...getInputProps()} />
      <p>{isDragActive ? "팀 이미지를 드래그 또는 클릭해서 넣으세요!" : "팀 이미지를 더 드래그 또는 클릭해서 넣으세요!"}</p>
      <ul>{fileList}</ul>
    </div>
  );
}

export default MyDropzone;