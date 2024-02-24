import {Routes, Route} from 'react-router-dom';
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import Home from "./pages/home/Home.tsx";
import Pokemon from './pages/Pokemon/Pokemon.tsx';
import Individual from './pages/Individual/Individual.tsx';

export default function App() {
  return (
    <MantineProvider theme={theme}> 
      <Routes>
        <Route index element={<Home/>} />
        <Route path='pokemon/' element={<Pokemon />} />
        <Route path='pokemon/:id' element={<Individual />} />
      
      </Routes>
    </MantineProvider>
  );
} 