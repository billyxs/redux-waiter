#!/usr/bin/env bash
IS_DIRTY=$(git diff --ignore-submodules HEAD)

VERSION_TYPE=""
VERSION_TYPE_MESSAGE="If specifying a release type argument, please provide 'major', 'minor', or 'patch'"

NEW_VERSION=""
BRANCH_NAME="release/0.0.0"
CURR_VERSION=$(npm run env | grep npm_package_version | cut -f 2 -d '=')
MAJOR_VERSION=$(semver $CURR_VERSION -i major)
MINOR_VERSION=$(semver $CURR_VERSION -i minor)
PATCH_VERSION=$(semver $CURR_VERSION -i patch)

function stash_checkout_version() {
  # Stash changes if branch is dirty
  if [ -n "$IS_DIRTY" ]; then
    echo "Current branch is dirty. Stashing changes..."
    git stash --quiet
  fi

  # Cut release branch from master
  echo "Checking out master and pulling latest..."
  git checkout master --quiet
  git pull origin master --quiet

  git checkout -b "$BRANCH_NAME" --quiet
  echo "Bumping version to $NEW_VERSION"
  npm version $VERSION_TYPE
  echo "Pushing version bump and tags..."
  git push origin "$BRANCH_NAME" --quiet
  git push origin "$BRANCH_NAME" --tags --quiet

  # Return to branch
  git checkout --quiet - 

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
      echo $VERSION_TYPE_MESSAGE
      exit
  esac
  BRANCH_NAME="release/$NEW_VERSION"
}

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

stash_checkout_version

echo "Done!"
echo "Make a PR for the branch at https://github.com/hixme/redux-waiter/pull/new/$BRANCH_NAME"
