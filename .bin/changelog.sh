#!/bin/sh

./node_modules/.bin/lerna-changelog --tag-from=v0.0.23 > CHANGELOG.md

CHANGED=$(git diff --name-only | grep CHANGELOG.md | tr -d '[:space:]')

echo $CHANGED

if [[ -z "$CHANGED" ]]; then
    echo "Nothing changed"
else
    echo "Something changed"
fi

# git reset
# git add CHANGELOG.md
# git commit -m 'docs(changelog): update to latest version'
