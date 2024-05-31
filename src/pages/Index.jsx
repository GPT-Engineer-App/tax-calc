import React, { useState } from "react";
import { Container, VStack, Text, Input, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast } from "@chakra-ui/react";
import { FaUpload, FaTrash } from "react-icons/fa";

const Index = () => {
  const [files, setFiles] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalTaxes, setTotalTaxes] = useState(0);
  const toast = useToast();

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    setFiles([...files, ...uploadedFiles]);

    let revenue = 0;
    let taxes = 0;

    uploadedFiles.forEach((file) => {
      // Simulate reading file and calculating revenue and taxes
      // In a real application, you would parse the file content
      revenue += 100; // Example revenue
      taxes += 20; // Example tax
    });

    setTotalRevenue(totalRevenue + revenue);
    setTotalTaxes(totalTaxes + taxes);

    toast({
      title: "Files uploaded.",
      description: `${uploadedFiles.length} files have been uploaded.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleFileRemove = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);

    // Adjust revenue and taxes accordingly
    setTotalRevenue(totalRevenue - 100); // Example adjustment
    setTotalTaxes(totalTaxes - 20); // Example adjustment

    toast({
      title: "File removed.",
      description: `File has been removed.`,
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Invoice and Bill Upload</Text>
        <Input type="file" multiple onChange={handleFileUpload} />
        <Table variant="simple" width="100%">
          <Thead>
            <Tr>
              <Th>File Name</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {files.map((file, index) => (
              <Tr key={index}>
                <Td>{file.name}</Td>
                <Td>
                  <IconButton aria-label="Remove file" icon={<FaTrash />} onClick={() => handleFileRemove(index)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Text fontSize="lg">Total Revenue: {totalRevenue} RON</Text>
        <Text fontSize="lg">Total Taxes: {totalTaxes} RON</Text>
      </VStack>
    </Container>
  );
};

export default Index;
