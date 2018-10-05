.DEFAULT_GOAL := run

clean:
	rm -r node_modules
	rm -r packages/*/node_modules
	rm -r packages/*/dist

clean-run: clean install run

install:
	npm install
	./node_modules/.bin/lerna exec npm install

build:
	./node_modules/.bin/lerna exec npm run build

build-watch:
	./node_modules/.bin/lerna exec npm run build-watch

run:
	cd playground && npm start

version:
	./node_modules/.bin/lerna version

