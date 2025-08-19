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
        {/* Your page content goes here */}
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Main Content</h1>
          <p>The rest of your page will be rendered here, below the header.</p>
        </div>
      </PageLayout>
    </ThemeProvider>
  );
}

export default App;
