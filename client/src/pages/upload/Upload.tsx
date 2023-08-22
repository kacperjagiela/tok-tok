import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

import { Layout } from "../../components/Layout/Layout";
import { useUser } from "../../hooks/useUser";
import { RoutesEnum } from "../../routes";
import { Card, CardBody, Container, Text } from "@chakra-ui/react";

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
        <Container>
          <Card>
            <CardBody {...getRootProps()} cursor="pointer">
              <input {...getInputProps()} />
              {isDragActive ? (
                <Text textAlign="center">Drop the files here ...</Text>
              ) : (
                <Text textAlign="center">
                  Select video to upload Or drag and drop a file
                </Text>
              )}
            </CardBody>
          </Card>
        </Container>
      )}
    </Layout>
  );
};
