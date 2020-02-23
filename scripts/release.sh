#!/usr/bin/env bash
# Colors
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NO_COLOR='\033[0m'

PREV_BRANCH=$(git symbolic-ref HEAD --short)
IS_DIRTY=$(git diff --ignore-submodules HEAD)
DONE_MESSAGE="${GREEN}Done!${NO_COLOR}"

VERSION_TYPE=""

NEW_VERSION=""
BRANCH_NAME=""
CURR_VERSION=""
MAJOR_VERSION=""
MINOR_VERSION=""
PATCH_VERSION=""

function stash_checkout() {
  # Stash changes if branch is dirty
  if [ -n "$IS_DIRTY" ]; then
    echo -n "Current branch is dirty. Stashing changes..."
    git stash --quiet
    echo -e $DONE_MESSAGE
  fi

  echo -n "Checking out master and pulling latest..."
  git checkout master --quiet
  git pull origin master --quiet
  echo -e $DONE_MESSAGE

  CURR_VERSION=$(npm run env | grep npm_package_version | cut -f 2 -d '=')
  MAJOR_VERSION=$(semver $CURR_VERSION -i major)
  MINOR_VERSION=$(semver $CURR_VERSION -i minor)
  PATCH_VERSION=$(semver $CURR_VERSION -i patch)
}

function publish() {
  git checkout -b "$BRANCH_NAME" --quiet

  echo "Bumping version to $NEW_VERSION"
  npm version $VERSION_TYPE

  echo -n "Publishing..."
  npm publish
  echo -e $DONE_MESSAGE

  echo -n "Pushing version bump and tags..."
  git push origin "$BRANCH_NAME" --quiet
  git push origin "$BRANCH_NAME" --tags --quiet
  echo -e $DONE_MESSAGE
}

function cleanup() {
  # Return to branch
  git checkout $PREV_BRANCH --quiet

  # Reapply stashed changes if branch was dirty
  if [ -n "$IS_DIRTY" ]; then
    git stash pop --quiet
  fi
}

function get_version() {
  case $1 in
    "major" | "1")
      VERSION_TYPE="major"
      NEW_VERSION=$MAJOR_VERSION
      ;;
    "minor" | "2")
      VERSION_TYPE="minor"
      NEW_VERSION=$MINOR_VERSION
      ;;
    "patch" | "3")
      VERSION_TYPE="patch"
      NEW_VERSION=$PATCH_VERSION
      ;;
    *)
      echo -e "${RED}If specifying a release type argument, please provide 'major', 'minor', or 'patch'${NO_COLOR}"
      exit
  esac
  BRANCH_NAME="release/$NEW_VERSION"
}

stash_checkout

echo "Current package version is $CURR_VERSION"
if [ -n "$1" ]; then
  get_version $1
else
  echo "Please select release type:"
  echo "   1) major ($MAJOR_VERSION)"
  echo "   2) minor ($MINOR_VERSION)"
  echo "   3) patch ($PATCH_VERSION)"
  read RESPONSE
  get_version $RESPONSE
fi
echo "Creating a $VERSION_TYPE ($NEW_VERSION) release"

publish
cleanup

echo -e "${GREEN}You're all done!${NO_COLOR}"
echo -e "${GREEN}Make a PR for the branch at https://github.com/hixme/redux-waiter/pull/new/$BRANCH_NAME${NO_COLOR}"
