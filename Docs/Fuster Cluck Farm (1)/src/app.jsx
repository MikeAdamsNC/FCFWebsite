function App() {
  const router = useHashRoute();
  const { path } = router;

  const Page =
    path === "shop" ? ShopPage :
    path === "animals" ? AnimalsPage :
    path === "about" ? AboutPage :
    path === "classes" ? ClassesPage :
    path === "farm-store" ? FarmStorePage :
    path === "contact" ? ContactPage :
    path === "gallery" ? GalleryPage :
    HomePage;

  return (
    <RouterCtx.Provider value={router}>
      <CartProvider>
        <TweakProvider>
          <Announce/>
          <Nav/>
          <main data-screen-label={path}>
            <Page/>
          </main>
          <Footer/>
        </TweakProvider>
      </CartProvider>
    </RouterCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
