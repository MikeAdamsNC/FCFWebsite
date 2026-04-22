function GalleryPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <div className="crumb"><a href="#/home">Home</a> <Icon name="chev_r" size={12}/> <span>Gallery</span></div>
          <h1>Life <em>on the farm.</em></h1>
          <p className="lede">
            A little window into the everyday. Most of these come from our phones in our back pockets.
          </p>
        </div>
      </section>
      <section className="section" style={{paddingTop: 48}}>
        <div className="wrap">
          <div className="gallery">
            {GALLERY.map((g, i) => (
              <div key={i} className={"g " + g.cls}>
                <Ph src={g.imgUrl}/>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { GalleryPage });
