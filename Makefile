run: backend browser

backend:
	node cors.js

browser:
	gnome-terminal --tab -e "bash -c npm run dev; exec bash"