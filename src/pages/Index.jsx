import { useState } from 'react';
import { Box, Flex, Text, Heading, VStack, Link, Input } from '@chakra-ui/react';

const newsItems = [
  { id: 1, title: "Y Combinator Creates New AI Safety Initiative", author: "johndoe", comments: 15 },
  { id: 2, title: "OpenAI Releases GPT-4", author: "janedoe", comments: 30 },
  { id: 3, title: "New Research in Quantum Computing", author: "alice", comments: 9 }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredNewsItems = newsItems.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <Box p={5}>
      <Heading mb={4}>Hacker News Clone</Heading>
      <Input
        placeholder="Search news by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        mb={4}
      />
      <VStack spacing={4} align="stretch">
        {filteredNewsItems.map(item => (
          <Box key={item.id} p={4} shadow="md" borderWidth="1px">
            <Flex justifyContent="space-between">
              <Link href="#" color="teal.500" fontWeight="bold">{item.title}</Link>
              <Text fontSize="sm">Comments: {item.comments}</Text>
            </Flex>
            <Text mt={2}>by {item.author}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;