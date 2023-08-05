import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

import { Layout } from "../../components/Layout/Layout";
import { useUser } from "../../hooks/useUser";
import { RoutesEnum } from "../../routes";

export const Upload = () => {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const { user } = useUser();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    console.log("user:", user);
    if (!user) {
      navigate(RoutesEnum.Home);
    }
  }, [user, navigate]);

  return (
    <Layout hideSideBar>
      {currentFile ? (
        <>{currentFile.name}</>
      ) : (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
      )}
    </Layout>
  );
};
