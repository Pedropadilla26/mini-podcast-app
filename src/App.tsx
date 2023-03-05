import './App.css';
import { styles } from './App.styles';
import { Header } from './components/header';
import { PodcastListScreen } from './screens/PodcastsListScreen';
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  BrowserRouter,
  Route
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PodcastListScreen/>,
  },
]);

function App() {
  return (
      <div style={styles.container}>
        <Header/>
        <div style={styles.contentContainer}>
          <RouterProvider router={router} />
        </div>
      </div>
  )
}

export default App;
