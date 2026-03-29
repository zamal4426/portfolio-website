import { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const Resume = lazy(() => import("./components/Resume"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  const location = useLocation();
  const isResume = location.pathname === "/resume";

  return (
    <>
      <LoadingProvider>
        <Suspense fallback={null}>
          <MainContainer>
            <Suspense fallback={null}>
              <CharacterModel />
            </Suspense>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
      {isResume && (
        <Suspense fallback={null}>
          <Resume />
        </Suspense>
      )}
    </>
  );
};

export default App;
