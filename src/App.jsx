import { useState } from 'react'
import './App.css'
import { QueryClient,QueryClientProvider } from 'react-query';
import Jokes from './pages/Jokes';

const queryClient = new QueryClient()
function App() {
  const [count, setCount] = useState(0)

  // const { data: categories } = useQuery('categories', getCategories);
  // console.log(categories)

  return (
    <QueryClientProvider client={queryClient}>
      <Jokes />
    </QueryClientProvider>
  )
}

export default App
