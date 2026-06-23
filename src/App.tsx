import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { LoadingPage } from "./pages/LoadingPage";
import { QuestionPage } from "./pages/QuestionPage";
import { ResultPage } from "./pages/ResultPage";
import { TypesPage } from "./pages/TypesPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="q/:questionNumber" element={<QuestionPage />} />
        <Route path="loading" element={<LoadingPage />} />
        <Route path="result/:typeCode" element={<ResultPage />} />
        <Route path="types" element={<TypesPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
