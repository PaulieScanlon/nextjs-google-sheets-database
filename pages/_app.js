import '../styles/globals.css';

const App = ({ Component, pageProps }) => {
  return (
    <main className="prose mx-auto max-w-7xl px-6 py-12">
      <Component {...pageProps} />
    </main>
  );
};

export default App;
