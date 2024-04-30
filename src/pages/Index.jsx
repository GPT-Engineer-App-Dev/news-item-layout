import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { Box, Flex, Text, Heading, VStack, Link, Input, Button } from '@chakra-ui/react';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const newsItems = [
  { id: 1, title: "Y Combinator Creates New AI Safety Initiative", author: "johndoe", comments: 15 },
  { id: 2, title: "OpenAI Releases GPT-4", author: "janedoe", comments: 30 },
  { id: 3, title: "New Research in Quantum Computing", author: "alice", comments: 9 }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
  }, []);

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const filteredNewsItems = newsItems.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));

  if (user) {
    return (
      <Box p={5}>
        <Heading mb={4}>Welcome, {user.email}</Heading>
        <Button onClick={() => supabase.auth.signOut()}>Logout</Button>
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
  } else {
    return (
      <Box p={5}>
        <Heading mb={4}>Please Login</Heading>
        <Button onClick={() => supabase.auth.signIn({ provider: 'google' })}>Login with Google</Button>
      </Box>
    );
  }
};

export default Index;