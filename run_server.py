import http.server
import socketserver

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler
httpd = socketserver.TCPServer(("0.0.0.0", PORT), Handler)

print(f"Serving at http://0.0.0.0:{PORT}")
httpd.serve_forever()