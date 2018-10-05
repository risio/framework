.DEFAULT_GOAL := run

clean:
	rm -rf node_modules
	rm -rf packages/*/node_modules
	rm -rf packages/*/dist

clean-run: clean install run
clean-install: clean install

install:
	npm install
	./node_modules/.bin/lerna exec npm install

build:
	./node_modules/.bin/lerna exec npm run build

build-watch:
	./node_modules/.bin/lerna exec npm run build-watch

run:
	cd playground && npm start

publish:
	./node_modules/.bin/lerna publish
