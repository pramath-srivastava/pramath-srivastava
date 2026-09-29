import { lazy, Suspense } from "react";
import "./App.css";
import PreviewBoundary from "./components/Character/PreviewBoundary";
import { LoadingProvider } from "./context/LoadingProvider";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));

const App = () => {
  return (
    <>
      <LoadingProvider>
        <Suspense>
          <MainContainer>
            <Suspense>
              <PreviewBoundary>
                <CharacterModel />
              </PreviewBoundary>
            </Suspense>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;
