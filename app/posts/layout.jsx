import "../globals.css";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="main-posts">
          <div className="post-topbar">
            <button className="add-btn" type="submit">
              Add Post
            </button>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}
