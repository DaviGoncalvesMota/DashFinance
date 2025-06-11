const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <a href="/" style={{ textDecoration: 'none', color: '#1976d2' }}>Go to Home</a>
    </div>
  );
}

export default NotFound;
// This is the NotFound page that displays a 404 error message when a user tries to access a non-existent route.