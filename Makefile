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
	git reset
	git checkout master
	./node_modules/.bin/lerna version patch --tag-version-prefix='' --yes --skip-git
	sed -i.bak "s/.*version.*/version: $(shell cat lerna.json | jq .version -r | sed -e 's/\./\\\./g')/g" docs/antora.yml
	git add docs/antora.yml
	git commit -m "chore(docs): bump version"
	git tag -a "$(shell cat lerna.json | jq .version -r)" -m "$(shell cat lerna.json | jq .version -r)"
	git push
	./node_modules/.bin/lerna publish from-git --yes
	cd docs && ../node_modules/.bin/antora site.yml
	touch docs/build/site/.nojekyll
	open docs/build/site/index.html

doc:
	cd docs && ../node_modules/.bin/antora site.yml
	touch docs/build/site/.nojekyll
	open docs/build/site/index.html

doc-publish:
	./node_modules/.bin/gh-pages -d docs/build/site
