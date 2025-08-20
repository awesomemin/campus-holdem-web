import { Outlet } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { ThemeProvider } from "@/components/ThemeProvider";

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <PageLayout>
        <Outlet />
      </PageLayout>
    </ThemeProvider>
  );
}

export default App;
