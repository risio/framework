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
	cd playground
	npm start

patch:
	./node_modules/.bin/lerna version patch --tag-version-prefix='' --sign-git-commit --sign-git-tag --yes
	./node_modules/.bin/lerna publish from-git --yes

doc:
	cd docs && ../node_modules/.bin/antora site.yml
	touch docs/build/site/.nojekyll
	open docs/build/site/index.html

doc-publish: doc
	./node_modules/.bin/gh-pages -d docs/build/site
