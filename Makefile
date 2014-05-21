PROJECT = "Node-Elevator"

install: ;
	@echo "Installing dependencies for ${PROJECT} via npm.."
	npm install

start: ;
	@echo "Starting ${PROJECT} via npm.."
	npm start

background: ;
	npm start &

clean: ;
	rm -Rf node_modules

.PHONY: install start clean