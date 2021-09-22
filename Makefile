install-client:
	cd client && npm install

install-server:
	cd server && npm install

run-client:
	cd client && npm run dev

run-server:
	cd server && docker-compose up

stop-server-container:
	cd server && docker-compose down